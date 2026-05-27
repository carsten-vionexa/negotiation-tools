import mimetypes
from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import ensure_exists, ensure_optional_exists, ensure_optional_same_company, get_or_404
from app.models.company import Company
from app.models.import_job import ImportJob
from app.models.import_row import ImportRow
from app.models.knowledge_document import KnowledgeDocument
from app.models.negotiation_project import NegotiationProject
from app.models.procurement_history_item import ProcurementHistoryItem
from app.models.request_item import RequestItem
from app.schemas.import_job import ImportJobMapRequest, ImportJobRead
from app.services.csv_import_parser import CsvImportParserError, ParsedCsvRow, parse_csv_file
from app.services.import_row_mapper import (
    ImportRowMappingError,
    map_import_rows,
    validate_mapping_configuration,
)
from app.services.import_target_creator import (
    ImportTargetCreationError,
    build_procurement_history_item,
    build_request_item,
)
from app.services.import_row_validator import ImportRowValidationError, validate_import_rows
from app.services.storage import (
    InvalidStoragePathError,
    LocalStorageService,
    StorageError,
    UnsupportedFileExtensionError,
    UploadSizeExceededError,
    UploadType,
)
from app.services.xlsx_import_parser import ParsedXlsxRow, XlsxImportParserError, parse_xlsx_file

router = APIRouter()

SOURCE_TYPE_EXTENSIONS = {"csv": ".csv", "excel": ".xlsx"}
TARGET_ENTITIES = {"procurement_history_item", "request_item"}


class ImportJobParserError(ValueError):
    """An ImportJob cannot be dispatched safely to a technical parser."""


def get_storage_service() -> LocalStorageService:
    return LocalStorageService()


@router.get("", response_model=list[ImportJobRead])
def list_import_jobs(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    negotiation_project_id: UUID | None = None,
    status: str | None = None,
    source_type: str | None = None,
    target_entity: str | None = None,
    db: Session = Depends(get_db),
) -> list[ImportJob]:
    query = select(ImportJob)
    if company_id:
        query = query.where(ImportJob.company_id == company_id)
    if negotiation_project_id:
        query = query.where(ImportJob.project_id == negotiation_project_id)
    if status:
        query = query.where(ImportJob.status == status)
    if source_type:
        query = query.where(ImportJob.source_type == source_type)
    if target_entity:
        query = query.where(ImportJob.target_entity == target_entity)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.post("/upload", response_model=ImportJobRead, status_code=status.HTTP_201_CREATED)
def upload_import_job(
    file: UploadFile = File(...),
    company_id: UUID = Form(...),
    project_id: UUID | None = Form(None),
    knowledge_document_id: UUID | None = Form(None),
    source_type: str = Form(...),
    target_entity: str = Form(...),
    db: Session = Depends(get_db),
    storage_service: LocalStorageService = Depends(get_storage_service),
) -> ImportJob:
    ensure_exists(db, Company, company_id, "Company")
    project = ensure_optional_exists(db, NegotiationProject, project_id, "Negotiation project")
    ensure_optional_same_company(project, company_id, "Negotiation project")
    knowledge_document = ensure_optional_exists(db, KnowledgeDocument, knowledge_document_id, "Knowledge document")
    ensure_optional_same_company(knowledge_document, company_id, "Knowledge document")

    if source_type not in SOURCE_TYPE_EXTENSIONS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported source type.")
    if target_entity not in TARGET_ENTITIES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported target entity.")

    original_filename = file.filename or ""
    try:
        extension = storage_service.validate_extension(UploadType.IMPORT, original_filename)
        if extension != SOURCE_TYPE_EXTENSIONS[source_type]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Source type does not match the uploaded file extension.",
            )
        stored_upload = storage_service.store(UploadType.IMPORT, original_filename, file.file)
    except UploadSizeExceededError as exc:
        raise HTTPException(status_code=status.HTTP_413_CONTENT_TOO_LARGE, detail=str(exc)) from exc
    except (InvalidStoragePathError, UnsupportedFileExtensionError, StorageError) as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    except OSError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to store uploaded file.",
        ) from exc

    import_job = ImportJob(
        company_id=company_id,
        project_id=project_id,
        knowledge_document_id=knowledge_document_id,
        filename=original_filename,
        original_filename=original_filename,
        storage_key=stored_upload.storage_key,
        mime_type=file.content_type or mimetypes.guess_type(original_filename)[0],
        file_size_bytes=stored_upload.file_size_bytes,
        checksum=stored_upload.checksum,
        source_type=source_type,
        target_entity=target_entity,
        status="pending",
        total_rows=0,
        processed_rows=0,
        valid_rows=0,
        error_rows=0,
        mapping_json={},
        validation_summary_json={},
        error_summary=None,
        started_at=None,
        completed_at=None,
    )
    try:
        db.add(import_job)
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        try:
            storage_service.delete(stored_upload.storage_key)
        except OSError:
            pass
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to persist import job.",
        ) from exc
    return import_job


@router.post("/{import_job_id}/parse", response_model=ImportJobRead)
def parse_import_job(
    import_job_id: UUID,
    db: Session = Depends(get_db),
    storage_service: LocalStorageService = Depends(get_storage_service),
) -> ImportJob:
    import_job = db.scalar(select(ImportJob).where(ImportJob.id == import_job_id).with_for_update())
    if import_job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Import job not found.")
    if import_job.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Import job can only be parsed from pending status.",
        )

    import_job.status = "parsing"
    import_job.started_at = datetime.now(timezone.utc)
    import_job.error_summary = None
    try:
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to start import parsing.",
        ) from exc

    try:
        parsed_rows = _read_rows_for_job(db, import_job, storage_service)
    except (ImportJobParserError, CsvImportParserError, XlsxImportParserError, InvalidStoragePathError) as exc:
        _fail_import_job(db, import_job, str(exc))
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    rows = [_build_import_row(import_job, parsed_row) for parsed_row in parsed_rows]
    import_job.status = "parsed"
    import_job.total_rows = len(rows)
    import_job.processed_rows = len(rows)
    import_job.valid_rows = 0
    import_job.error_rows = 0
    import_job.error_summary = None
    import_job.validation_summary_json = {}
    import_job.completed_at = None
    try:
        db.add_all(rows)
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        _fail_import_job(db, import_job, "Unable to persist parsed import rows.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to persist parsed import rows.",
        ) from exc
    return import_job


def _read_rows_for_job(
    db: Session,
    import_job: ImportJob,
    storage_service: LocalStorageService,
) -> list[ParsedCsvRow] | list[ParsedXlsxRow]:
    if not import_job.storage_key:
        raise ImportJobParserError("Import job has no stored source file.")
    if db.scalar(select(ImportRow.id).where(ImportRow.import_job_id == import_job.id).limit(1)) is not None:
        raise ImportJobParserError("Import job already contains raw rows.")

    path = storage_service.local_path_for_key(import_job.storage_key)
    if import_job.source_type == "csv":
        return parse_csv_file(path)
    if import_job.source_type == "excel":
        return parse_xlsx_file(path)
    raise ImportJobParserError("Only CSV and XLSX import jobs can be parsed.")


def _build_import_row(import_job: ImportJob, parsed_row: ParsedCsvRow | ParsedXlsxRow) -> ImportRow:
    return ImportRow(
        import_job_id=import_job.id,
        company_id=import_job.company_id,
        project_id=import_job.project_id,
        row_number=parsed_row.row_number,
        sheet_name=parsed_row.sheet_name if isinstance(parsed_row, ParsedXlsxRow) else None,
        raw_data_json=parsed_row.raw_data_json,
        mapped_data_json={},
        validation_status="pending",
        error_message=None,
        warning_message=None,
        target_entity=None,
        target_record_id=None,
        metadata_json={},
    )


def _fail_import_job(db: Session, import_job: ImportJob, error_summary: str) -> None:
    import_job.status = "failed"
    import_job.error_summary = error_summary
    import_job.completed_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(import_job)


@router.post("/{import_job_id}/map", response_model=ImportJobRead)
def map_import_job(
    import_job_id: UUID,
    payload: ImportJobMapRequest,
    db: Session = Depends(get_db),
) -> ImportJob:
    import_job = db.scalar(select(ImportJob).where(ImportJob.id == import_job_id).with_for_update())
    if import_job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Import job not found.")
    if import_job.status != "parsed":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Import job can only be mapped from parsed status.",
        )

    try:
        validate_mapping_configuration(import_job.target_entity, payload.field_mapping)
    except ImportRowMappingError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    import_job.status = "mapping"
    import_job.error_summary = None
    try:
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to start import mapping.",
        ) from exc

    rows = list(
        db.scalars(
            select(ImportRow)
            .where(ImportRow.import_job_id == import_job.id)
            .order_by(ImportRow.row_number)
            .with_for_update()
        ).all()
    )
    try:
        mapped_rows = map_import_rows(rows, payload.field_mapping)
    except ImportRowMappingError as exc:
        _fail_import_job(db, import_job, str(exc))
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    import_job.mapping_json = payload.model_dump()
    import_job.status = "mapped"
    import_job.error_summary = None
    import_job.completed_at = None
    for row, mapped_data_json in zip(rows, mapped_rows, strict=True):
        row.mapped_data_json = mapped_data_json

    try:
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        _fail_import_job(db, import_job, "Unable to persist mapped import rows.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to persist mapped import rows.",
        ) from exc
    return import_job


@router.post("/{import_job_id}/validate", response_model=ImportJobRead)
def validate_import_job(
    import_job_id: UUID,
    db: Session = Depends(get_db),
) -> ImportJob:
    import_job = db.scalar(select(ImportJob).where(ImportJob.id == import_job_id).with_for_update())
    if import_job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Import job not found.")
    if import_job.status != "mapped":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Import job can only be validated from mapped status.",
        )
    if import_job.target_entity not in TARGET_ENTITIES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported target entity.")

    import_job.status = "validating"
    import_job.error_summary = None
    try:
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to start import validation.",
        ) from exc

    rows = list(
        db.scalars(
            select(ImportRow)
            .where(ImportRow.import_job_id == import_job.id)
            .order_by(ImportRow.row_number)
            .with_for_update()
        ).all()
    )
    try:
        validation_results = validate_import_rows(import_job.target_entity, rows)
    except ImportRowValidationError as exc:
        _fail_import_job(db, import_job, str(exc))
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    errors_by_field: dict[str, int] = {}
    valid_rows = 0
    for row, result in zip(rows, validation_results, strict=True):
        row.validation_status = result.validation_status
        row.error_message = result.error_message
        row.warning_message = result.warning_message
        if result.validation_status == "valid":
            valid_rows += 1
        for field in result.error_fields:
            errors_by_field[field] = errors_by_field.get(field, 0) + 1

    import_job.status = "validated"
    import_job.processed_rows = len(rows)
    import_job.valid_rows = valid_rows
    import_job.error_rows = len(rows) - valid_rows
    import_job.error_summary = None
    import_job.validation_summary_json = {
        "total_rows": len(rows),
        "processed_rows": len(rows),
        "valid_rows": valid_rows,
        "error_rows": len(rows) - valid_rows,
        "target_entity": import_job.target_entity,
        "ruleset": "c9_minimal",
        "errors_by_field": errors_by_field,
    }
    try:
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        _fail_import_job(db, import_job, "Unable to persist validated import rows.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to persist validated import rows.",
        ) from exc
    return import_job


@router.post("/{import_job_id}/create-targets", response_model=ImportJobRead)
def create_import_job_targets(
    import_job_id: UUID,
    db: Session = Depends(get_db),
) -> ImportJob:
    import_job = db.scalar(select(ImportJob).where(ImportJob.id == import_job_id).with_for_update())
    if import_job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Import job not found.")
    if import_job.status != "validated":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Import job targets can only be created from validated status.",
        )
    if import_job.target_entity not in TARGET_ENTITIES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported target entity.",
        )

    import_job.status = "processing"
    import_job.error_summary = None
    try:
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to start target creation.",
        ) from exc

    rows = list(
        db.scalars(
            select(ImportRow)
            .where(ImportRow.import_job_id == import_job.id)
            .order_by(ImportRow.row_number)
            .with_for_update()
        ).all()
    )
    created_targets: list[tuple[ImportRow, ProcurementHistoryItem | RequestItem]] = []
    for row in rows:
        if row.validation_status != "valid" or row.target_record_id is not None:
            continue
        try:
            if import_job.target_entity == "procurement_history_item":
                target = build_procurement_history_item(import_job.company_id, row.mapped_data_json)
            else:
                target = build_request_item(import_job.company_id, row.mapped_data_json)
        except ImportTargetCreationError as exc:
            row.validation_status = "error"
            row.error_message = str(exc)
            continue
        db.add(target)
        created_targets.append((row, target))

    try:
        db.flush()
        for row, target in created_targets:
            row.target_entity = import_job.target_entity
            row.target_record_id = target.id
            row.validation_status = "imported"
            row.error_message = None
        import_job.processed_rows = len(rows)
        import_job.valid_rows = sum(row.validation_status == "imported" for row in rows)
        import_job.error_rows = sum(row.validation_status in {"invalid", "error"} for row in rows)
        import_job.status = "completed_with_errors" if import_job.error_rows else "completed"
        import_job.error_summary = None
        import_job.completed_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(import_job)
    except SQLAlchemyError as exc:
        db.rollback()
        _fail_import_job(db, import_job, "Unable to persist import targets.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to persist import targets.",
        ) from exc
    return import_job


@router.get("/{import_job_id}", response_model=ImportJobRead)
def get_import_job(import_job_id: UUID, db: Session = Depends(get_db)) -> ImportJob:
    return get_or_404(db, ImportJob, import_job_id, "Import job")
