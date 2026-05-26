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
from app.models.import_row import ImportRow
from app.services.storage import LocalStorageService


def configure_storage(client: TestClient, tmp_path: Path) -> None:
    storage_service = LocalStorageService(configuration=Settings(upload_base_dir=tmp_path / "uploads"))
    client.app.dependency_overrides[get_storage_service] = lambda: storage_service


def create_mapped_job(
    client: TestClient,
    tmp_path: Path,
    *,
    target_entity: str = "request_item",
    content: bytes = b"Artikel,Menge,Preis,Waehrung,Termin\nBearing 6204,10,12.50,EUR,2026-06-01\n",
    field_mapping: dict[str, str] | None = None,
) -> dict[str, object]:
    configure_storage(client, tmp_path)
    company = client.post("/api/companies", json={"name": f"Validation Buyer {uuid4()}"}).json()
    upload_response = client.post(
        "/api/import-jobs/upload",
        data={"company_id": company["id"], "source_type": "csv", "target_entity": target_entity},
        files={"file": ("validation.csv", content, "text/csv")},
    )
    assert upload_response.status_code == 201
    import_job = upload_response.json()
    assert client.post(f"/api/import-jobs/{import_job['id']}/parse").status_code == 200
    if field_mapping is None:
        field_mapping = {
            "article_name": "Artikel",
            "requested_quantity": "Menge",
            "target_price": "Preis",
            "currency": "Waehrung",
            "required_delivery_date": "Termin",
        }
    map_response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": field_mapping},
    )
    assert map_response.status_code == 200
    return map_response.json()


def database_session(client: TestClient) -> Generator[Session, None, None]:
    dependency = client.app.dependency_overrides[get_db]
    return dependency()


def set_job_attributes(client: TestClient, import_job_id: object, **attributes: object) -> None:
    db_generator = database_session(client)
    db = next(db_generator)
    try:
        import_job = db.get(ImportJob, UUID(str(import_job_id)))
        assert import_job is not None
        for field, value in attributes.items():
            setattr(import_job, field, value)
        db.commit()
    finally:
        db_generator.close()


def set_row_mapped_data(client: TestClient, import_job_id: object, row_number: int, data: dict[str, object]) -> None:
    db_generator = database_session(client)
    db = next(db_generator)
    try:
        row = (
            db.query(ImportRow)
            .filter(ImportRow.import_job_id == UUID(str(import_job_id)), ImportRow.row_number == row_number)
            .one()
        )
        row.mapped_data_json = data
        db.commit()
    finally:
        db_generator.close()


def read_rows(client: TestClient, import_job_id: object) -> list[dict[str, object]]:
    response = client.get("/api/import-rows", params={"import_job_id": import_job_id})
    assert response.status_code == 200
    return sorted(response.json(), key=lambda row: row["row_number"])


def test_validate_request_item_rows_updates_job_and_preserves_mapping_values(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_mapped_job(client, tmp_path)
    rows_before = read_rows(client, import_job["id"])

    response = client.post(f"/api/import-jobs/{import_job['id']}/validate")

    assert response.status_code == 200
    validated_job = response.json()
    assert validated_job["status"] == "validated"
    assert validated_job["processed_rows"] == 1
    assert validated_job["valid_rows"] == 1
    assert validated_job["error_rows"] == 0
    assert validated_job["validation_summary_json"] == {
        "total_rows": 1,
        "processed_rows": 1,
        "valid_rows": 1,
        "error_rows": 0,
        "target_entity": "request_item",
        "ruleset": "c9_minimal",
        "errors_by_field": {},
    }
    rows_after = read_rows(client, import_job["id"])
    assert rows_after[0]["validation_status"] == "valid"
    assert rows_after[0]["error_message"] is None
    assert rows_after[0]["raw_data_json"] == rows_before[0]["raw_data_json"]
    assert rows_after[0]["mapped_data_json"] == rows_before[0]["mapped_data_json"]
    assert client.get("/api/request-items").json() == []
    assert client.get("/api/procurement-history-items").json() == []


def test_validate_procurement_history_item_rows_marks_valid_without_targets(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_mapped_job(
        client,
        tmp_path,
        target_entity="procurement_history_item",
        content=b"Artikel,Menge,Preis,Waehrung,Kaufdatum\nBearing 6204,10,12.50,EUR,2026-05-26\n",
        field_mapping={
            "item_name": "Artikel",
            "quantity": "Menge",
            "unit_price": "Preis",
            "currency": "Waehrung",
            "purchased_at": "Kaufdatum",
        },
    )

    response = client.post(f"/api/import-jobs/{import_job['id']}/validate")

    assert response.status_code == 200
    assert response.json()["status"] == "validated"
    assert read_rows(client, import_job["id"])[0]["validation_status"] == "valid"
    assert client.get("/api/procurement-history-items").json() == []


def test_validate_row_errors_are_reviewable_and_not_job_failures(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_mapped_job(
        client,
        tmp_path,
        content=b"Artikel,Menge,Preis,Waehrung,Termin\nBearing,10,12.50,EUR,2026-06-01\n,0,-1,EURO,not-a-date\n",
    )
    rows_before = read_rows(client, import_job["id"])

    response = client.post(f"/api/import-jobs/{import_job['id']}/validate")

    assert response.status_code == 200
    validated_job = response.json()
    assert validated_job["status"] == "validated"
    assert validated_job["processed_rows"] == 2
    assert validated_job["valid_rows"] == 1
    assert validated_job["error_rows"] == 1
    assert validated_job["error_summary"] is None
    assert validated_job["validation_summary_json"]["errors_by_field"] == {
        "title_or_article_name": 1,
        "requested_quantity": 1,
        "target_price": 1,
        "currency": 1,
        "required_delivery_date": 1,
    }
    rows_after = read_rows(client, import_job["id"])
    assert [row["validation_status"] for row in rows_after] == ["valid", "invalid"]
    assert "article_name is required" in rows_after[1]["error_message"]
    assert "requested_quantity must be greater than 0" in rows_after[1]["error_message"]
    assert [row["raw_data_json"] for row in rows_after] == [row["raw_data_json"] for row in rows_before]
    assert [row["mapped_data_json"] for row in rows_after] == [row["mapped_data_json"] for row in rows_before]


def test_validate_missing_mapped_data_is_an_invalid_row(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_mapped_job(client, tmp_path)
    set_row_mapped_data(client, import_job["id"], 2, {})

    response = client.post(f"/api/import-jobs/{import_job['id']}/validate")

    assert response.status_code == 200
    assert response.json()["status"] == "validated"
    assert response.json()["error_rows"] == 1
    row = read_rows(client, import_job["id"])[0]
    assert row["validation_status"] == "invalid"
    assert row["error_message"] == "Mapped data is required."


def test_validate_unknown_mapped_field_is_an_invalid_row(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_mapped_job(client, tmp_path)
    set_row_mapped_data(client, import_job["id"], 2, {"article_name": "Bearing", "unexpected": "value"})

    response = client.post(f"/api/import-jobs/{import_job['id']}/validate")

    assert response.status_code == 200
    assert response.json()["validation_summary_json"]["errors_by_field"] == {"unexpected": 1}
    row = read_rows(client, import_job["id"])[0]
    assert row["validation_status"] == "invalid"
    assert row["error_message"] == "Unsupported mapped fields: unexpected."


@pytest.mark.parametrize(
    "job_status",
    ["pending", "parsed", "validating", "validated", "processing", "completed", "completed_with_errors", "failed"],
)
def test_validate_rejects_jobs_outside_mapped_status(
    client: TestClient,
    tmp_path: Path,
    job_status: str,
) -> None:
    import_job = create_mapped_job(client, tmp_path)
    set_job_attributes(client, import_job["id"], status=job_status)

    response = client.post(f"/api/import-jobs/{import_job['id']}/validate")

    assert response.status_code == 409
    assert response.json()["detail"] == "Import job can only be validated from mapped status."


def test_validate_job_without_rows_fails_cleanly(client: TestClient, tmp_path: Path) -> None:
    configure_storage(client, tmp_path)
    company = client.post("/api/companies", json={"name": "No Rows Buyer"}).json()
    upload = client.post(
        "/api/import-jobs/upload",
        data={"company_id": company["id"], "source_type": "csv", "target_entity": "request_item"},
        files={"file": ("no-rows.csv", b"Artikel\nBearing\n", "text/csv")},
    ).json()
    set_job_attributes(client, upload["id"], status="mapped")

    response = client.post(f"/api/import-jobs/{upload['id']}/validate")

    assert response.status_code == 400
    failed_job = client.get(f"/api/import-jobs/{upload['id']}").json()
    assert failed_job["status"] == "failed"
    assert failed_job["error_summary"] == "Import job has no mapped rows to validate."


def test_validate_rejects_unsupported_target_entity_before_processing(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_mapped_job(client, tmp_path)
    set_job_attributes(client, import_job["id"], target_entity="supplier_profile")

    response = client.post(f"/api/import-jobs/{import_job['id']}/validate")

    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported target entity."
    assert client.get(f"/api/import-jobs/{import_job['id']}").json()["status"] == "mapped"


def test_validate_rejects_unknown_import_job(client: TestClient) -> None:
    response = client.post(f"/api/import-jobs/{uuid4()}/validate")

    assert response.status_code == 404
