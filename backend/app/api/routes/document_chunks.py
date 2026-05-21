from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import get_or_404
from app.models.document_chunk import DocumentChunk
from app.schemas.document_chunk import DocumentChunkRead

router = APIRouter()


@router.get("", response_model=list[DocumentChunkRead])
def list_document_chunks(
    skip: int = 0,
    limit: int = 100,
    knowledge_document_id: UUID | None = None,
    company_id: UUID | None = None,
    negotiation_project_id: UUID | None = None,
    db: Session = Depends(get_db),
) -> list[DocumentChunk]:
    query = select(DocumentChunk)
    if knowledge_document_id:
        query = query.where(DocumentChunk.knowledge_document_id == knowledge_document_id)
    if company_id:
        query = query.where(DocumentChunk.company_id == company_id)
    if negotiation_project_id:
        query = query.where(DocumentChunk.project_id == negotiation_project_id)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{document_chunk_id}", response_model=DocumentChunkRead)
def get_document_chunk(document_chunk_id: UUID, db: Session = Depends(get_db)) -> DocumentChunk:
    return get_or_404(db, DocumentChunk, document_chunk_id, "Document chunk")
