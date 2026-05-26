import hashlib
from pathlib import Path
from uuid import uuid4

from fastapi.testclient import TestClient

from app.api.routes.import_jobs import get_storage_service
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


def create_knowledge_document(client: TestClient, company_id: str) -> dict[str, object]:
    response = client.post(
        "/api/knowledge-documents",
        json={
            "company_id": company_id,
            "filename": "source.txt",
            "storage_path": "knowledge/source.txt",
        },
    )
    assert response.status_code == 201
    return response.json()


def configure_storage(client: TestClient, tmp_path: Path, max_upload_size_mb: int = 25) -> LocalStorageService:
    configuration = Settings(upload_base_dir=tmp_path / "uploads", max_upload_size_mb=max_upload_size_mb)
    storage_service = LocalStorageService(configuration=configuration)
    client.app.dependency_overrides[get_storage_service] = lambda: storage_service
    return storage_service


def test_upload_csv_creates_pending_import_job_with_metadata_and_no_rows(
    client: TestClient,
    tmp_path: Path,
) -> None:
    storage_service = configure_storage(client, tmp_path)
    company = create_company(client)
    project = create_project(client, str(company["id"]))
    document = create_knowledge_document(client, str(company["id"]))
    content = b"article_name,quantity\nBearing,10\n"

    response = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "project_id": project["id"],
            "knowledge_document_id": document["id"],
            "source_type": "csv",
            "target_entity": "procurement_history_item",
        },
        files={"file": ("Procurement.CSV", content, "text/csv")},
    )

    assert response.status_code == 201
    import_job = response.json()
    assert import_job["company_id"] == company["id"]
    assert import_job["project_id"] == project["id"]
    assert import_job["knowledge_document_id"] == document["id"]
    assert import_job["filename"] == "Procurement.CSV"
    assert import_job["original_filename"] == "Procurement.CSV"
    assert import_job["mime_type"] == "text/csv"
    assert import_job["file_size_bytes"] == len(content)
    assert import_job["checksum"] == hashlib.sha256(content).hexdigest()
    assert import_job["storage_key"].startswith("imports/")
    assert import_job["storage_key"].endswith(".csv")
    assert not Path(import_job["storage_key"]).is_absolute()
    assert import_job["source_type"] == "csv"
    assert import_job["target_entity"] == "procurement_history_item"
    assert import_job["status"] == "pending"
    assert import_job["total_rows"] == 0
    assert import_job["processed_rows"] == 0
    assert import_job["valid_rows"] == 0
    assert import_job["error_rows"] == 0
    assert import_job["mapping_json"] == {}
    assert import_job["validation_summary_json"] == {}
    assert import_job["error_summary"] is None
    assert import_job["started_at"] is None
    assert import_job["completed_at"] is None
    assert storage_service.local_path_for_key(import_job["storage_key"]).read_bytes() == content

    rows = client.get("/api/import-rows", params={"import_job_id": import_job["id"]})
    assert rows.status_code == 200
    assert rows.json() == []


def test_upload_xlsx_creates_import_job_in_import_storage(client: TestClient, tmp_path: Path) -> None:
    storage_service = configure_storage(client, tmp_path)
    company = create_company(client)
    content = b"PK\x03\x04xlsx fixture content"

    response = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "excel",
            "target_entity": "request_item",
        },
        files={
            "file": (
                "Request_Items.XLSX",
                content,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            )
        },
    )

    assert response.status_code == 201
    import_job = response.json()
    assert import_job["storage_key"].startswith("imports/")
    assert import_job["storage_key"].endswith(".xlsx")
    assert import_job["source_type"] == "excel"
    assert import_job["target_entity"] == "request_item"
    assert import_job["status"] == "pending"
    assert storage_service.local_path_for_key(import_job["storage_key"]).read_bytes() == content


def test_upload_rejects_missing_file(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)

    response = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "csv",
            "target_entity": "request_item",
        },
    )

    assert response.status_code == 422


def test_upload_rejects_invalid_filename_and_extension(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    metadata = {
        "company_id": company["id"],
        "source_type": "csv",
        "target_entity": "request_item",
    }

    invalid_name = client.post(
        "/api/import-jobs/upload",
        data=metadata,
        files={"file": ("../history.csv", b"unsafe", "text/csv")},
    )
    empty_name = client.post(
        "/api/import-jobs/upload",
        data=metadata,
        files={"file": ("", b"unsafe", "text/csv")},
    )
    invalid_extension = client.post(
        "/api/import-jobs/upload",
        data=metadata,
        files={"file": ("history.xls", b"unsafe", "application/vnd.ms-excel")},
    )

    assert invalid_name.status_code == 400
    assert empty_name.status_code == 422
    assert invalid_extension.status_code == 400


def test_upload_rejects_source_type_extension_mismatch(client: TestClient, tmp_path: Path) -> None:
    storage_service = configure_storage(client, tmp_path)
    company = create_company(client)

    csv_with_xlsx = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "csv",
            "target_entity": "request_item",
        },
        files={"file": ("requests.xlsx", b"content", "application/octet-stream")},
    )
    excel_with_csv = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "excel",
            "target_entity": "request_item",
        },
        files={"file": ("requests.csv", b"content", "text/csv")},
    )

    assert csv_with_xlsx.status_code == 400
    assert excel_with_csv.status_code == 400
    assert list(storage_service.target_directories[UploadType.IMPORT].glob("*")) == []


def test_upload_rejects_unsupported_source_type_and_target_entity(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)

    source_type = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "json",
            "target_entity": "request_item",
        },
        files={"file": ("requests.csv", b"content", "text/csv")},
    )
    target_entity = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "csv",
            "target_entity": "supplier_profile",
        },
        files={"file": ("requests.csv", b"content", "text/csv")},
    )

    assert source_type.status_code == 400
    assert target_entity.status_code == 400


def test_upload_rejects_unknown_company_and_project(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    metadata = {"source_type": "csv", "target_entity": "request_item"}

    unknown_company = client.post(
        "/api/import-jobs/upload",
        data={"company_id": str(uuid4()), **metadata},
        files={"file": ("requests.csv", b"content", "text/csv")},
    )
    unknown_project = client.post(
        "/api/import-jobs/upload",
        data={"company_id": company["id"], "project_id": str(uuid4()), **metadata},
        files={"file": ("requests.csv", b"content", "text/csv")},
    )

    assert unknown_company.status_code == 404
    assert unknown_project.status_code == 404


def test_upload_rejects_project_from_other_company(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    other_company = create_company(client, "Other Buyer")
    other_project = create_project(client, str(other_company["id"]))

    response = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "project_id": other_project["id"],
            "source_type": "csv",
            "target_entity": "request_item",
        },
        files={"file": ("requests.csv", b"content", "text/csv")},
    )

    assert response.status_code == 400


def test_upload_rejects_unknown_or_foreign_knowledge_document(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    other_company = create_company(client, "Other Buyer")
    foreign_document = create_knowledge_document(client, str(other_company["id"]))
    metadata = {
        "company_id": company["id"],
        "source_type": "csv",
        "target_entity": "request_item",
    }

    unknown_document = client.post(
        "/api/import-jobs/upload",
        data={"knowledge_document_id": str(uuid4()), **metadata},
        files={"file": ("requests.csv", b"content", "text/csv")},
    )
    foreign_document_response = client.post(
        "/api/import-jobs/upload",
        data={"knowledge_document_id": foreign_document["id"], **metadata},
        files={"file": ("requests.csv", b"content", "text/csv")},
    )

    assert unknown_document.status_code == 404
    assert foreign_document_response.status_code == 400


def test_upload_rejects_file_over_configured_limit_without_leaving_file(
    client: TestClient,
    tmp_path: Path,
) -> None:
    storage_service = configure_storage(client, tmp_path, max_upload_size_mb=1)
    company = create_company(client)

    response = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "csv",
            "target_entity": "request_item",
        },
        files={"file": ("requests.csv", b"x" * (1024 * 1024 + 1), "text/csv")},
    )

    assert response.status_code == 413
    assert list(storage_service.target_directories[UploadType.IMPORT].glob("*")) == []
    assert list(storage_service.tmp_directory.glob("*")) == []
