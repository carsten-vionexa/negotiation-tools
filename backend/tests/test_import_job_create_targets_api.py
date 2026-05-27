from collections.abc import Generator
from pathlib import Path
from uuid import UUID, uuid4

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


def create_validated_job(
    client: TestClient,
    tmp_path: Path,
    *,
    target_entity: str = "procurement_history_item",
    field_mapping: dict[str, str] | None = None,
    content: bytes = (
        b"Artikel,Menge,Preis,Waehrung,Lieferant,Kaufdatum\n"
        b"Bearing 6204,10,12.50,EUR,SKF,2026-05-26\n"
    ),
) -> dict[str, object]:
    configure_storage(client, tmp_path)
    company = client.post("/api/companies", json={"name": f"Target Buyer {uuid4()}"}).json()
    upload = client.post(
        "/api/import-jobs/upload",
        data={"company_id": company["id"], "source_type": "csv", "target_entity": target_entity},
        files={"file": ("target-creation.csv", content, "text/csv")},
    )
    assert upload.status_code == 201
    import_job = upload.json()
    assert client.post(f"/api/import-jobs/{import_job['id']}/parse").status_code == 200
    if field_mapping is None and target_entity == "procurement_history_item":
        field_mapping = {
            "item_name": "Artikel",
            "quantity": "Menge",
            "unit_price": "Preis",
            "currency": "Waehrung",
            "supplier_name": "Lieferant",
            "purchased_at": "Kaufdatum",
        }
    elif field_mapping is None:
        field_mapping = {"article_name": "Artikel", "requested_quantity": "Menge", "target_price": "Preis"}
    assert field_mapping is not None
    mapped = client.post(f"/api/import-jobs/{import_job['id']}/map", json={"field_mapping": field_mapping})
    assert mapped.status_code == 200
    validated = client.post(f"/api/import-jobs/{import_job['id']}/validate")
    assert validated.status_code == 200
    return validated.json()


def database_session(client: TestClient) -> Generator[Session, None, None]:
    dependency = client.app.dependency_overrides[get_db]
    return dependency()


def set_job_status(client: TestClient, import_job_id: object, status: str) -> None:
    db_generator = database_session(client)
    db = next(db_generator)
    try:
        import_job = db.get(ImportJob, UUID(str(import_job_id)))
        assert import_job is not None
        import_job.status = status
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


def read_targets(client: TestClient) -> list[dict[str, object]]:
    response = client.get("/api/procurement-history-items")
    assert response.status_code == 200
    return response.json()


def read_request_items(client: TestClient) -> list[dict[str, object]]:
    response = client.get("/api/request-items")
    assert response.status_code == 200
    return response.json()


def test_create_targets_imports_valid_procurement_rows_from_mapped_data(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(client, tmp_path)
    rows_before = read_rows(client, import_job["id"])

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    completed_job = response.json()
    assert completed_job["status"] == "completed"
    assert completed_job["valid_rows"] == 1
    assert completed_job["error_rows"] == 0
    assert completed_job["completed_at"] is not None
    targets = read_targets(client)
    assert len(targets) == 1
    assert targets[0]["company_id"] == import_job["company_id"]
    assert targets[0]["supplier_name"] == "SKF"
    assert targets[0]["item_name"] == "Bearing 6204"
    assert targets[0]["quantity"] == "10.000"
    assert targets[0]["unit_price"] == "12.5000"
    assert targets[0]["currency"] == "EUR"
    assert targets[0]["purchased_at"] == "2026-05-26"
    assert targets[0]["metadata_json"] == {}
    rows_after = read_rows(client, import_job["id"])
    assert rows_after[0]["validation_status"] == "imported"
    assert rows_after[0]["target_entity"] == "procurement_history_item"
    assert rows_after[0]["target_record_id"] == targets[0]["id"]
    assert rows_after[0]["raw_data_json"] == rows_before[0]["raw_data_json"]
    assert rows_after[0]["mapped_data_json"] == rows_before[0]["mapped_data_json"]
    assert client.get("/api/request-items").json() == []


def test_create_targets_rejects_jobs_outside_validated_status(client: TestClient, tmp_path: Path) -> None:
    import_job = create_validated_job(client, tmp_path)
    set_job_status(client, import_job["id"], "mapped")

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 409
    assert response.json()["detail"] == "Import job targets can only be created from validated status."
    assert read_targets(client) == []


def test_create_targets_imports_valid_request_item_with_title(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(
        client,
        tmp_path,
        target_entity="request_item",
        field_mapping={
            "title": "Titel",
            "article_name": "Artikel",
            "article_description": "Beschreibung",
            "category": "Kategorie",
            "specification": "Spezifikation",
            "requested_quantity": "Menge",
            "unit": "Einheit",
            "target_price": "Zielpreis",
            "rough_price_expectation": "Preisrahmen",
            "currency": "Waehrung",
            "required_delivery_date": "Lieferdatum",
            "target_delivery_time": "Lieferzeit",
            "target_region": "Region",
            "priority": "Prioritaet",
            "comment": "Kommentar",
        },
        content=(
            b"Titel,Artikel,Beschreibung,Kategorie,Spezifikation,Menge,Einheit,Zielpreis,"
            b"Preisrahmen,Waehrung,Lieferdatum,Lieferzeit,Region,Prioritaet,Kommentar\n"
            b"Kugellager Anfrage,Bearing 6204,Gedichtet,Lager,6204-2RS,10,Stk,12.50,"
            b"15.00,EUR,2026-06-01,2 Wochen,DE,high,Eilig\n"
        ),
    )
    rows_before = read_rows(client, import_job["id"])

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    assert response.json()["status"] == "completed"
    targets = read_request_items(client)
    assert len(targets) == 1
    assert targets[0]["title"] == "Kugellager Anfrage"
    assert targets[0]["article_name"] == "Bearing 6204"
    assert targets[0]["article_description"] == "Gedichtet"
    assert targets[0]["category"] == "Lager"
    assert targets[0]["specification"] == "6204-2RS"
    assert targets[0]["requested_quantity"] == "10.000"
    assert targets[0]["unit"] == "Stk"
    assert targets[0]["target_price"] == "12.5000"
    assert targets[0]["rough_price_expectation"] == "15.0000"
    assert targets[0]["currency"] == "EUR"
    assert targets[0]["required_delivery_date"] == "2026-06-01"
    assert targets[0]["target_delivery_time"] == "2 Wochen"
    assert targets[0]["target_region"] == "DE"
    assert targets[0]["priority"] == "high"
    assert targets[0]["status"] == "open"
    assert targets[0]["comment"] == "Eilig"
    rows_after = read_rows(client, import_job["id"])
    assert rows_after[0]["validation_status"] == "imported"
    assert rows_after[0]["target_entity"] == "request_item"
    assert rows_after[0]["target_record_id"] == targets[0]["id"]
    assert rows_after[0]["raw_data_json"] == rows_before[0]["raw_data_json"]
    assert rows_after[0]["mapped_data_json"] == rows_before[0]["mapped_data_json"]
    assert read_targets(client) == []


def test_create_targets_derives_request_item_title_from_article_name(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(client, tmp_path, target_entity="request_item")

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    assert response.json()["status"] == "completed"
    targets = read_request_items(client)
    assert len(targets) == 1
    assert targets[0]["title"] == "Bearing 6204"
    assert targets[0]["article_name"] == "Bearing 6204"


def test_create_targets_skips_invalid_rows_and_completes_with_errors(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(
        client,
        tmp_path,
        content=(
            b"Artikel,Menge,Preis,Waehrung,Lieferant,Kaufdatum\n"
            b"Bearing 6204,10,12.50,EUR,SKF,2026-05-26\n"
            b",4,3.50,EUR,SKF,2026-05-27\n"
        ),
    )

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    assert response.json()["status"] == "completed_with_errors"
    assert response.json()["valid_rows"] == 1
    assert response.json()["error_rows"] == 1
    rows = read_rows(client, import_job["id"])
    assert [row["validation_status"] for row in rows] == ["imported", "invalid"]
    assert rows[1]["target_record_id"] is None
    assert len(read_targets(client)) == 1


def test_create_targets_marks_row_conversion_error_without_importing_it(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(client, tmp_path)
    set_row_mapped_data(
        client,
        import_job["id"],
        2,
        {"item_name": "Bearing 6204", "quantity": "not-a-number"},
    )

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    assert response.json()["status"] == "completed_with_errors"
    row = read_rows(client, import_job["id"])[0]
    assert row["validation_status"] == "error"
    assert row["target_record_id"] is None
    assert row["error_message"] == "quantity must be a number for target creation."
    assert read_targets(client) == []


def test_create_request_item_targets_skips_invalid_rows(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(
        client,
        tmp_path,
        target_entity="request_item",
        content=b"Artikel,Menge,Preis\nBearing 6204,10,12.50\n,4,3.50\n",
    )

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    assert response.json()["status"] == "completed_with_errors"
    rows = read_rows(client, import_job["id"])
    assert [row["validation_status"] for row in rows] == ["imported", "invalid"]
    assert rows[1]["target_record_id"] is None
    assert len(read_request_items(client)) == 1


def test_create_request_item_targets_marks_row_conversion_error(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(client, tmp_path, target_entity="request_item")
    set_row_mapped_data(
        client,
        import_job["id"],
        2,
        {"article_name": "Bearing 6204", "target_price": "not-a-number"},
    )

    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    assert response.json()["status"] == "completed_with_errors"
    row = read_rows(client, import_job["id"])[0]
    assert row["validation_status"] == "error"
    assert row["target_record_id"] is None
    assert row["error_message"] == "target_price must be a number for target creation."
    assert read_request_items(client) == []


def test_create_targets_is_idempotent_for_already_imported_rows_and_repeat_call(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(client, tmp_path)
    first_response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")
    assert first_response.status_code == 200
    first_target_id = read_targets(client)[0]["id"]

    repeated_response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")
    assert repeated_response.status_code == 409
    assert [target["id"] for target in read_targets(client)] == [first_target_id]

    set_job_status(client, import_job["id"], "validated")
    resumed_response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")
    assert resumed_response.status_code == 200
    assert resumed_response.json()["status"] == "completed"
    assert [target["id"] for target in read_targets(client)] == [first_target_id]


def test_create_request_item_targets_does_not_duplicate_already_imported_rows(
    client: TestClient,
    tmp_path: Path,
) -> None:
    import_job = create_validated_job(client, tmp_path, target_entity="request_item")
    assert client.post(f"/api/import-jobs/{import_job['id']}/create-targets").status_code == 200
    first_target_id = read_request_items(client)[0]["id"]

    set_job_status(client, import_job["id"], "validated")
    response = client.post(f"/api/import-jobs/{import_job['id']}/create-targets")

    assert response.status_code == 200
    assert response.json()["status"] == "completed"
    assert [target["id"] for target in read_request_items(client)] == [first_target_id]
