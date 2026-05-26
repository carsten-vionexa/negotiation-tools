import mimetypes
from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import ensure_exists, ensure_optional_exists, ensure_optional_same_company, get_or_404
from app.models.company import Company
from app.models.import_job import ImportJob
from app.models.knowledge_document import KnowledgeDocument
from app.models.negotiation_project import NegotiationProject
from app.schemas.import_job import ImportJobRead
from app.services.storage import (
    InvalidStoragePathError,
    LocalStorageService,
    StorageError,
    UnsupportedFileExtensionError,
    UploadSizeExceededError,
    UploadType,
)

router = APIRouter()

SOURCE_TYPE_EXTENSIONS = {"csv": ".csv", "excel": ".xlsx"}
TARGET_ENTITIES = {"procurement_history_item", "request_item"}


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


@router.get("/{import_job_id}", response_model=ImportJobRead)
def get_import_job(import_job_id: UUID, db: Session = Depends(get_db)) -> ImportJob:
    return get_or_404(db, ImportJob, import_job_id, "Import job")
