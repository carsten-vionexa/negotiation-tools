from collections.abc import Generator
from pathlib import Path
from uuid import UUID, uuid4

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.routes.import_jobs import get_storage_service
from app.core.config import Settings
from app.models.import_job import ImportJob
from app.services.storage import LocalStorageService


def configure_storage(client: TestClient, tmp_path: Path) -> LocalStorageService:
    storage_service = LocalStorageService(configuration=Settings(upload_base_dir=tmp_path / "uploads"))
    client.app.dependency_overrides[get_storage_service] = lambda: storage_service
    return storage_service


def create_company(client: TestClient) -> dict[str, object]:
    response = client.post("/api/companies", json={"name": "Rheinwerk Robotics"})
    assert response.status_code == 201
    return response.json()


def upload_import_job(
    client: TestClient,
    company_id: object,
    content: bytes,
    *,
    source_type: str = "csv",
) -> dict[str, object]:
    filename = "requests.csv" if source_type == "csv" else "requests.xlsx"
    response = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company_id,
            "source_type": source_type,
            "target_entity": "request_item",
        },
        files={"file": (filename, content, "text/csv")},
    )
    assert response.status_code == 201
    return response.json()


def read_rows(client: TestClient, import_job_id: object) -> list[dict[str, object]]:
    response = client.get("/api/import-rows", params={"import_job_id": import_job_id})
    assert response.status_code == 200
    return sorted(response.json(), key=lambda row: row["row_number"])


def mutate_storage_key(client: TestClient, import_job_id: object, storage_key: str | None) -> None:
    dependency = client.app.dependency_overrides[get_db]
    db_generator: Generator[Session, None, None] = dependency()
    db = next(db_generator)
    try:
        import_job = db.get(ImportJob, UUID(str(import_job_id)))
        assert import_job is not None
        import_job.storage_key = storage_key
        db.commit()
    finally:
        db_generator.close()


def test_parse_csv_creates_raw_rows_and_updates_job_counters(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    import_job = upload_import_job(
        client,
        company["id"],
        b"Artikel,Menge,Preis\nBearing 6204,10,12.50\n,,\nSeal,,3.10\nWasher,5\n",
    )

    response = client.post(f"/api/import-jobs/{import_job['id']}/parse")

    assert response.status_code == 200
    parsed_job = response.json()
    assert parsed_job["status"] == "parsed"
    assert parsed_job["total_rows"] == 3
    assert parsed_job["processed_rows"] == 3
    assert parsed_job["valid_rows"] == 0
    assert parsed_job["error_rows"] == 0
    assert parsed_job["error_summary"] is None
    assert parsed_job["validation_summary_json"] == {}
    assert parsed_job["started_at"] is not None
    assert parsed_job["completed_at"] is None

    rows = read_rows(client, import_job["id"])
    assert [row["row_number"] for row in rows] == [2, 4, 5]
    assert [row["raw_data_json"] for row in rows] == [
        {"Artikel": "Bearing 6204", "Menge": "10", "Preis": "12.50"},
        {"Artikel": "Seal", "Menge": "", "Preis": "3.10"},
        {"Artikel": "Washer", "Menge": "5", "Preis": ""},
    ]
    for row in rows:
        assert row["sheet_name"] is None
        assert row["validation_status"] == "pending"
        assert row["mapped_data_json"] == {}
        assert row["metadata_json"] == {}
        assert row["target_entity"] is None
        assert row["target_record_id"] is None


def test_parse_rejects_non_pending_job_without_appending_rows(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    import_job = upload_import_job(client, company["id"], b"Artikel\nBearing\n")
    first_parse = client.post(f"/api/import-jobs/{import_job['id']}/parse")
    assert first_parse.status_code == 200

    response = client.post(f"/api/import-jobs/{import_job['id']}/parse")

    assert response.status_code == 409
    assert response.json()["detail"] == "Import job can only be parsed from pending status."
    assert len(read_rows(client, import_job["id"])) == 1


def test_parse_rejects_unknown_import_job(client: TestClient) -> None:
    response = client.post(f"/api/import-jobs/{uuid4()}/parse")

    assert response.status_code == 404


def test_parse_fails_excel_job_without_creating_rows(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    import_job = upload_import_job(client, company["id"], b"workbook", source_type="excel")

    response = client.post(f"/api/import-jobs/{import_job['id']}/parse")

    assert response.status_code == 400
    failed_job = client.get(f"/api/import-jobs/{import_job['id']}").json()
    assert failed_job["status"] == "failed"
    assert "Only CSV" in failed_job["error_summary"]
    assert read_rows(client, import_job["id"]) == []


@pytest.mark.parametrize(
    ("content", "expected_error"),
    [
        (b"", "CSV file is empty."),
        (b"\nBearing,10\n", "CSV header is missing."),
        (b"Artikel,,Menge\nBearing,unused,10\n", "empty column name"),
        (b"Artikel,Artikel\nBearing,10\n", "duplicate column names"),
        (b"Artikel,Menge\nBearing,10\nSeal,2,extra\n", "more values than the header"),
    ],
)
def test_parse_structure_errors_fail_job_without_partial_rows(
    client: TestClient,
    tmp_path: Path,
    content: bytes,
    expected_error: str,
) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    import_job = upload_import_job(client, company["id"], content)

    response = client.post(f"/api/import-jobs/{import_job['id']}/parse")

    assert response.status_code == 400
    failed_job = client.get(f"/api/import-jobs/{import_job['id']}").json()
    assert failed_job["status"] == "failed"
    assert expected_error in failed_job["error_summary"]
    assert failed_job["started_at"] is not None
    assert failed_job["completed_at"] is not None
    assert read_rows(client, import_job["id"]) == []


@pytest.mark.parametrize("storage_key", [None, "../outside.csv", "imports/missing.csv"])
def test_parse_invalid_or_missing_storage_key_fails_job(
    client: TestClient,
    tmp_path: Path,
    storage_key: str | None,
) -> None:
    configure_storage(client, tmp_path)
    company = create_company(client)
    import_job = upload_import_job(client, company["id"], b"Artikel\nBearing\n")
    mutate_storage_key(client, import_job["id"], storage_key)

    response = client.post(f"/api/import-jobs/{import_job['id']}/parse")

    assert response.status_code == 400
    failed_job = client.get(f"/api/import-jobs/{import_job['id']}").json()
    assert failed_job["status"] == "failed"
    assert failed_job["error_summary"]
    assert read_rows(client, import_job["id"]) == []
