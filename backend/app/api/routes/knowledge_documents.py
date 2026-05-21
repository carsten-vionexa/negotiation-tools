from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
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

router = APIRouter()


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
