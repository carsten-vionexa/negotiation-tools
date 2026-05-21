from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import get_or_404
from app.models.knowledge_claim import KnowledgeClaim
from app.schemas.knowledge_claim import KnowledgeClaimRead

router = APIRouter()


@router.get("", response_model=list[KnowledgeClaimRead])
def list_knowledge_claims(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    negotiation_project_id: UUID | None = None,
    supplier_profile_id: UUID | None = None,
    knowledge_document_id: UUID | None = None,
    document_chunk_id: UUID | None = None,
    claim_type: str | None = None,
    information_kind: str | None = None,
    confidence_level: str | None = None,
    is_ai_generated: bool | None = None,
    db: Session = Depends(get_db),
) -> list[KnowledgeClaim]:
    query = select(KnowledgeClaim)
    if company_id:
        query = query.where(KnowledgeClaim.company_id == company_id)
    if negotiation_project_id:
        query = query.where(KnowledgeClaim.project_id == negotiation_project_id)
    if supplier_profile_id:
        query = query.where(KnowledgeClaim.supplier_profile_id == supplier_profile_id)
    if knowledge_document_id:
        query = query.where(KnowledgeClaim.knowledge_document_id == knowledge_document_id)
    if document_chunk_id:
        query = query.where(KnowledgeClaim.document_chunk_id == document_chunk_id)
    if claim_type:
        query = query.where(KnowledgeClaim.claim_type == claim_type)
    if information_kind:
        query = query.where(KnowledgeClaim.information_kind == information_kind)
    if confidence_level:
        query = query.where(KnowledgeClaim.confidence_level == confidence_level)
    if is_ai_generated is not None:
        query = query.where(KnowledgeClaim.is_ai_generated == is_ai_generated)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{knowledge_claim_id}", response_model=KnowledgeClaimRead)
def get_knowledge_claim(knowledge_claim_id: UUID, db: Session = Depends(get_db)) -> KnowledgeClaim:
    return get_or_404(db, KnowledgeClaim, knowledge_claim_id, "Knowledge claim")
