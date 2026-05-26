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


def create_parsed_job(
    client: TestClient,
    tmp_path: Path,
    *,
    target_entity: str = "request_item",
    content: bytes = b"Artikel,Menge,Preis,Lieferzeit\nBearing 6204,10,12.50,4 weeks\nSeal,2,3.10,2 weeks\n",
) -> dict[str, object]:
    configure_storage(client, tmp_path)
    company_response = client.post("/api/companies", json={"name": f"Buyer {uuid4()}"})
    assert company_response.status_code == 201
    company = company_response.json()
    upload_response = client.post(
        "/api/import-jobs/upload",
        data={
            "company_id": company["id"],
            "source_type": "csv",
            "target_entity": target_entity,
        },
        files={"file": ("mapping.csv", content, "text/csv")},
    )
    assert upload_response.status_code == 201
    import_job = upload_response.json()
    parse_response = client.post(f"/api/import-jobs/{import_job['id']}/parse")
    assert parse_response.status_code == 200
    return parse_response.json()


def read_rows(client: TestClient, import_job_id: object) -> list[dict[str, object]]:
    response = client.get("/api/import-rows", params={"import_job_id": import_job_id})
    assert response.status_code == 200
    return sorted(response.json(), key=lambda row: row["row_number"])


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


def set_row_raw_data(
    client: TestClient,
    import_job_id: object,
    row_number: int,
    raw_data_json: dict[str, str],
) -> None:
    db_generator = database_session(client)
    db = next(db_generator)
    try:
        row = (
            db.query(ImportRow)
            .filter(ImportRow.import_job_id == UUID(str(import_job_id)), ImportRow.row_number == row_number)
            .one()
        )
        row.raw_data_json = raw_data_json
        db.commit()
    finally:
        db_generator.close()


def test_map_request_item_rows_preserves_raw_values_without_creating_targets(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_parsed_job(client, tmp_path)
    field_mapping = {
        "article_name": "Artikel",
        "requested_quantity": "Menge",
        "target_price": "Preis",
        "target_delivery_time": "Lieferzeit",
    }

    response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": field_mapping},
    )

    assert response.status_code == 200
    mapped_job = response.json()
    assert mapped_job["status"] == "mapped"
    assert mapped_job["mapping_json"] == {"field_mapping": field_mapping}
    assert mapped_job["error_summary"] is None
    rows = read_rows(client, import_job["id"])
    assert [row["mapped_data_json"] for row in rows] == [
        {
            "article_name": "Bearing 6204",
            "requested_quantity": "10",
            "target_price": "12.50",
            "target_delivery_time": "4 weeks",
        },
        {
            "article_name": "Seal",
            "requested_quantity": "2",
            "target_price": "3.10",
            "target_delivery_time": "2 weeks",
        },
    ]
    assert all(row["validation_status"] == "pending" for row in rows)
    assert all(row["error_message"] is None and row["warning_message"] is None for row in rows)
    assert client.get("/api/request-items").json() == []
    assert client.get("/api/procurement-history-items").json() == []


def test_map_procurement_history_rows_uses_existing_model_field_names(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_parsed_job(
        client,
        tmp_path,
        target_entity="procurement_history_item",
        content=b"Artikel,Menge,Einzelpreis,Lieferant,Kaufdatum\nBearing 6204,10,12.50,SKF,2026-05-26\n",
    )
    field_mapping = {
        "item_name": "Artikel",
        "quantity": "Menge",
        "unit_price": "Einzelpreis",
        "supplier_name": "Lieferant",
        "purchased_at": "Kaufdatum",
    }

    response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": field_mapping},
    )

    assert response.status_code == 200
    assert response.json()["mapping_json"] == {"field_mapping": field_mapping}
    row = read_rows(client, import_job["id"])[0]
    assert row["mapped_data_json"] == {
        "item_name": "Bearing 6204",
        "quantity": "10",
        "unit_price": "12.50",
        "supplier_name": "SKF",
        "purchased_at": "2026-05-26",
    }
    assert row["validation_status"] == "pending"
    assert client.get("/api/procurement-history-items").json() == []


@pytest.mark.parametrize(
    "job_status",
    [
        "pending",
        "mapped",
        "validating",
        "validated",
        "processing",
        "completed",
        "completed_with_errors",
        "failed",
    ],
)
def test_map_rejects_jobs_outside_parsed_status(
    client: TestClient,
    tmp_path: Path,
    job_status: str,
) -> None:
    import_job = create_parsed_job(client, tmp_path)
    set_job_attributes(client, import_job["id"], status=job_status)

    response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": {"article_name": "Artikel"}},
    )

    assert response.status_code == 409
    assert response.json()["detail"] == "Import job can only be mapped from parsed status."
    assert read_rows(client, import_job["id"])[0]["mapped_data_json"] == {}


def test_map_rejects_unknown_import_job(client: TestClient) -> None:
    response = client.post(
        f"/api/import-jobs/{uuid4()}/map",
        json={"field_mapping": {"article_name": "Artikel"}},
    )

    assert response.status_code == 404


def test_map_rejects_unsupported_target_entity_without_starting_processing(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_parsed_job(client, tmp_path)
    set_job_attributes(client, import_job["id"], target_entity="supplier_profile")

    response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": {"article_name": "Artikel"}},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported target entity."
    assert client.get(f"/api/import-jobs/{import_job['id']}").json()["status"] == "parsed"


def test_map_rejects_unknown_target_field_without_starting_processing(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_parsed_job(client, tmp_path)

    response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": {"quantity": "Menge"}},
    )

    assert response.status_code == 400
    assert "quantity" in response.json()["detail"]
    assert client.get(f"/api/import-jobs/{import_job['id']}").json()["status"] == "parsed"


@pytest.mark.parametrize("payload", [{}, {"field_mapping": {}}, {"field_mapping": {"article_name": ""}}])
def test_map_rejects_invalid_or_empty_request_without_starting_processing(
    client: TestClient,
    tmp_path: Path,
    payload: dict[str, object],
) -> None:
    import_job = create_parsed_job(client, tmp_path)

    response = client.post(f"/api/import-jobs/{import_job['id']}/map", json=payload)

    assert response.status_code == 422
    assert client.get(f"/api/import-jobs/{import_job['id']}").json()["status"] == "parsed"


def test_map_missing_source_column_fails_job_without_partial_mapping(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_parsed_job(client, tmp_path)

    response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": {"article_name": "Unbekannte Spalte"}},
    )

    assert response.status_code == 400
    failed_job = client.get(f"/api/import-jobs/{import_job['id']}").json()
    assert failed_job["status"] == "failed"
    assert "missing source columns" in failed_job["error_summary"]
    assert failed_job["mapping_json"] == {}
    assert all(row["mapped_data_json"] == {} for row in read_rows(client, import_job["id"]))


def test_map_job_without_raw_rows_fails_after_processing_begins(
    client: TestClient,
    tmp_path: Path,
) -> None:
    configure_storage(client, tmp_path)
    company = client.post("/api/companies", json={"name": "Empty Raw Buyer"}).json()
    upload = client.post(
        "/api/import-jobs/upload",
        data={"company_id": company["id"], "source_type": "csv", "target_entity": "request_item"},
        files={"file": ("empty-raw.csv", b"Artikel\nBearing\n", "text/csv")},
    ).json()
    set_job_attributes(client, upload["id"], status="parsed")

    response = client.post(
        f"/api/import-jobs/{upload['id']}/map",
        json={"field_mapping": {"article_name": "Artikel"}},
    )

    assert response.status_code == 400
    failed_job = client.get(f"/api/import-jobs/{upload['id']}").json()
    assert failed_job["status"] == "failed"
    assert failed_job["error_summary"] == "Import job has no raw rows to map."


def test_map_inconsistent_raw_columns_fails_without_partial_mapping(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_parsed_job(client, tmp_path)
    set_row_raw_data(client, import_job["id"], 3, {"Artikel": "Seal", "Preis": "3.10"})

    response = client.post(
        f"/api/import-jobs/{import_job['id']}/map",
        json={"field_mapping": {"article_name": "Artikel"}},
    )

    assert response.status_code == 400
    failed_job = client.get(f"/api/import-jobs/{import_job['id']}").json()
    assert failed_job["status"] == "failed"
    assert failed_job["error_summary"] == "Import rows contain inconsistent source columns."
    assert failed_job["mapping_json"] == {}
    assert all(row["mapped_data_json"] == {} for row in read_rows(client, import_job["id"]))
