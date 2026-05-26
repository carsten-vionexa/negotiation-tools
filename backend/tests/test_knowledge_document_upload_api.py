import hashlib
from pathlib import Path
from uuid import uuid4

from fastapi.testclient import TestClient

from app.api.routes.knowledge_documents import get_storage_service
from app.core.config import Settings
from app.services.storage import LocalStorageService, UploadType


def create_company(client: TestClient, name: str = "Rheinwerk Robotics") -> dict[str, object]:
    response = client.post("/api/companies", json={"name": name})
    assert response.status_code == 201
    return response.json()


def create_project(client: TestClient, company_id: str, title: str = "Robot arm sourcing") -> dict[str, object]:
    response = client.post("/api/negotiation-projects", json={"company_id": company_id, "title": title})
    assert response.status_code == 201
    return response.json()


def configure_storage(client: TestClient, tmp_path: Path, max_upload_size_mb: int = 25) -> LocalStorageService:
    configuration = Settings(upload_base_dir=tmp_path / "uploads", max_upload_size_mb=max_upload_size_mb)
    storage_service = LocalStorageService(configuration=configuration)
    client.app.dependency_overrides[get_storage_service] = lambda: storage_service
    return storage_service


def test_upload_pdf_creates_knowledge_document_with_metadata_and_no_derived_records(
    client: TestClient,
    tmp_path: Path,
) -> None:
    storage_service = configure_storage(client, tmp_path)
    company = create_company(client)
    project = create_project(client, str(company["id"]))
    content = b"%PDF-1.7 uploaded knowledge source\n"

    response = client.post(
        "/api/knowledge-documents/upload",
        data={
            "company_id": company["id"],
            "project_id": project["id"],
            "title": "Supplier report",
            "document_type": "market_report",
            "source_name": "Industry Data",
            "source_author": "Analyst Team",
            "source_date": "2026-05-25",
            "reliability_level": "verified",
            "confidentiality_level": "confidential",
            "description": "Reference for preparation.",
        },
        files={"file": ("Supplier Report.PDF", content, "application/pdf")},
    )

    assert response.status_code == 201
    document = response.json()
    assert document["company_id"] == company["id"]
    assert document["project_id"] == project["id"]
    assert document["filename"] == "Supplier Report.PDF"
    assert document["original_filename"] == "Supplier Report.PDF"
    assert document["title"] == "Supplier report"
    assert document["document_type"] == "market_report"
    assert document["mime_type"] == "application/pdf"
    assert document["file_size_bytes"] == len(content)
    assert document["checksum"] == hashlib.sha256(content).hexdigest()
    assert document["uploaded_at"] is not None
    assert document["storage_key"].startswith("knowledge/")
    assert document["storage_key"].endswith(".pdf")
    assert document["storage_path"] == document["storage_key"]
    assert not Path(document["storage_key"]).is_absolute()
    assert not Path(document["storage_path"]).is_absolute()
    assert document["parsing_status"] == "pending"
    assert document["content_text"] is None
    assert document["chunk_count"] == 0
    assert document["source_name"] == "Industry Data"
    assert document["source_author"] == "Analyst Team"
    assert document["source_date"] == "2026-05-25"
    assert document["reliability_level"] == "verified"
    assert document["confidentiality_level"] == "confidential"
    assert storage_service.local_path_for_key(document["storage_key"]).read_bytes() == content

    chunks = client.get("/api/document-chunks", params={"knowledge_document_id": document["id"]})
    claims = client.get("/api/knowledge-claims", params={"knowledge_document_id": document["id"]})
    assert chunks.status_code == 200
    assert claims.status_code == 200
    assert chunks.json() == []
    assert claims.json() == []


def test_upload_text_document_uses_pending_defaults(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)

    response = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": company["id"]},
        files={"file": ("brief.txt", b"internal note", "text/plain")},
    )

    assert response.status_code == 201
    document = response.json()
    assert document["storage_key"].endswith(".txt")
    assert document["reliability_level"] == "unknown"
    assert document["confidentiality_level"] == "internal"
    assert document["parsing_status"] == "pending"
    assert document["content_text"] is None
    assert document["chunk_count"] == 0


def test_upload_rejects_missing_file(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)

    response = client.post("/api/knowledge-documents/upload", data={"company_id": company["id"]})

    assert response.status_code == 422


def test_upload_rejects_invalid_filename_and_extension(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)

    invalid_name = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": company["id"]},
        files={"file": ("../report.pdf", b"unsafe", "application/pdf")},
    )
    empty_name = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": company["id"]},
        files={"file": ("", b"unsafe", "application/pdf")},
    )
    invalid_extension = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": company["id"]},
        files={"file": ("source.csv", b"unsafe", "text/csv")},
    )

    assert invalid_name.status_code == 400
    assert empty_name.status_code == 422
    assert invalid_extension.status_code == 400


def test_upload_rejects_unknown_company_and_project(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)

    unknown_company = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": str(uuid4())},
        files={"file": ("source.pdf", b"content", "application/pdf")},
    )
    unknown_project = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": company["id"], "project_id": str(uuid4())},
        files={"file": ("source.pdf", b"content", "application/pdf")},
    )

    assert unknown_company.status_code == 404
    assert unknown_project.status_code == 404


def test_upload_rejects_project_from_other_company(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    other_company = create_company(client, "Other Buyer")
    other_project = create_project(client, str(other_company["id"]))

    response = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": company["id"], "project_id": other_project["id"]},
        files={"file": ("source.md", b"# Note", "text/markdown")},
    )

    assert response.status_code == 400


def test_upload_rejects_file_over_configured_limit_without_leaving_file(
    client: TestClient,
    tmp_path: Path,
) -> None:
    storage_service = configure_storage(client, tmp_path, max_upload_size_mb=1)
    company = create_company(client)

    response = client.post(
        "/api/knowledge-documents/upload",
        data={"company_id": company["id"]},
        files={"file": ("large.txt", b"x" * (1024 * 1024 + 1), "text/plain")},
    )

    assert response.status_code == 413
    assert list(storage_service.target_directories[UploadType.KNOWLEDGE].glob("*")) == []
    assert list(storage_service.tmp_directory.glob("*")) == []
