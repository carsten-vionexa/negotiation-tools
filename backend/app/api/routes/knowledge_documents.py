from datetime import date, datetime, timezone
import mimetypes
from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import (
    ensure_exists,
    ensure_optional_exists,
    ensure_optional_same_company,
    get_or_404,
)
from app.models.company import Company
from app.models.knowledge_document import KnowledgeDocument
from app.models.negotiation_project import NegotiationProject
from app.schemas.knowledge_document import KnowledgeDocumentCreate, KnowledgeDocumentRead
from app.services.storage import (
    InvalidStoragePathError,
    LocalStorageService,
    StorageError,
    UnsupportedFileExtensionError,
    UploadSizeExceededError,
    UploadType,
)

router = APIRouter()


def get_storage_service() -> LocalStorageService:
    return LocalStorageService()


@router.get("", response_model=list[KnowledgeDocumentRead])
def list_knowledge_documents(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    negotiation_project_id: UUID | None = None,
    document_type: str | None = None,
    status: str | None = None,
    source_type: str | None = None,
    db: Session = Depends(get_db),
) -> list[KnowledgeDocument]:
    query = select(KnowledgeDocument)
    if company_id:
        query = query.where(KnowledgeDocument.company_id == company_id)
    if negotiation_project_id:
        query = query.where(KnowledgeDocument.project_id == negotiation_project_id)
    if document_type:
        query = query.where(KnowledgeDocument.document_type == document_type)
    if status:
        query = query.where(KnowledgeDocument.parsing_status == status)
    if source_type:
        query = query.where(KnowledgeDocument.source == source_type)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.post("/upload", response_model=KnowledgeDocumentRead, status_code=status.HTTP_201_CREATED)
def upload_knowledge_document(
    file: UploadFile = File(...),
    company_id: UUID = Form(...),
    project_id: UUID | None = Form(None),
    title: str | None = Form(None),
    document_type: str | None = Form(None),
    source_name: str | None = Form(None),
    source_author: str | None = Form(None),
    source_date: date | None = Form(None),
    reliability_level: str = Form("unknown"),
    confidentiality_level: str = Form("internal"),
    description: str | None = Form(None),
    db: Session = Depends(get_db),
    storage_service: LocalStorageService = Depends(get_storage_service),
) -> KnowledgeDocument:
    ensure_exists(db, Company, company_id, "Company")
    project = ensure_optional_exists(db, NegotiationProject, project_id, "Negotiation project")
    ensure_optional_same_company(project, company_id, "Negotiation project")

    original_filename = file.filename or ""
    try:
        stored_upload = storage_service.store(UploadType.KNOWLEDGE, original_filename, file.file)
    except UploadSizeExceededError as exc:
        raise HTTPException(status_code=status.HTTP_413_CONTENT_TOO_LARGE, detail=str(exc)) from exc
    except (InvalidStoragePathError, UnsupportedFileExtensionError, StorageError) as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    except OSError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to store uploaded file.",
        ) from exc

    knowledge_document = KnowledgeDocument(
        company_id=company_id,
        project_id=project_id,
        filename=original_filename,
        original_filename=original_filename,
        title=title,
        document_type=document_type,
        mime_type=file.content_type or mimetypes.guess_type(original_filename)[0],
        storage_key=stored_upload.storage_key,
        storage_path=stored_upload.storage_key,
        file_size_bytes=stored_upload.file_size_bytes,
        checksum=stored_upload.checksum,
        uploaded_at=datetime.now(timezone.utc),
        source_name=source_name,
        source_author=source_author,
        source_date=source_date,
        reliability_level=reliability_level,
        confidentiality_level=confidentiality_level,
        description=description,
        parsing_status="pending",
        content_text=None,
        chunk_count=0,
    )
    try:
        db.add(knowledge_document)
        db.commit()
        db.refresh(knowledge_document)
    except SQLAlchemyError as exc:
        db.rollback()
        try:
            storage_service.delete(stored_upload.storage_key)
        except OSError:
            pass
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to persist knowledge document.",
        ) from exc
    return knowledge_document


@router.get("/{knowledge_document_id}", response_model=KnowledgeDocumentRead)
def get_knowledge_document(knowledge_document_id: UUID, db: Session = Depends(get_db)) -> KnowledgeDocument:
    return get_or_404(db, KnowledgeDocument, knowledge_document_id, "Knowledge document")


@router.post("", response_model=KnowledgeDocumentRead, status_code=status.HTTP_201_CREATED)
def create_knowledge_document(
    payload: KnowledgeDocumentCreate,
    db: Session = Depends(get_db),
) -> KnowledgeDocument:
    ensure_exists(db, Company, payload.company_id, "Company")
    project = ensure_optional_exists(db, NegotiationProject, payload.project_id, "Negotiation project")
    ensure_optional_same_company(project, payload.company_id, "Negotiation project")

    knowledge_document = KnowledgeDocument(**payload.model_dump())
    db.add(knowledge_document)
    db.commit()
    db.refresh(knowledge_document)
    return knowledge_document
