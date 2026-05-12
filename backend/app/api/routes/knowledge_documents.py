from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.knowledge_document import KnowledgeDocument
from app.schemas.knowledge_document import KnowledgeDocumentCreate, KnowledgeDocumentRead

router = APIRouter()


@router.get("", response_model=list[KnowledgeDocumentRead])
def list_knowledge_documents(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
) -> list[KnowledgeDocument]:
    return list(db.scalars(select(KnowledgeDocument).offset(skip).limit(limit)).all())


@router.get("/{knowledge_document_id}", response_model=KnowledgeDocumentRead)
def get_knowledge_document(knowledge_document_id: UUID, db: Session = Depends(get_db)) -> KnowledgeDocument:
    knowledge_document = db.get(KnowledgeDocument, knowledge_document_id)
    if knowledge_document is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Knowledge document not found")
    return knowledge_document


@router.post("", response_model=KnowledgeDocumentRead, status_code=status.HTTP_201_CREATED)
def create_knowledge_document(
    payload: KnowledgeDocumentCreate,
    db: Session = Depends(get_db),
) -> KnowledgeDocument:
    knowledge_document = KnowledgeDocument(**payload.model_dump())
    db.add(knowledge_document)
    db.commit()
    db.refresh(knowledge_document)
    return knowledge_document
