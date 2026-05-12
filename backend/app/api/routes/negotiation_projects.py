from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.negotiation_project import NegotiationProject
from app.schemas.negotiation_project import NegotiationProjectCreate, NegotiationProjectRead

router = APIRouter()


@router.get("", response_model=list[NegotiationProjectRead])
def list_negotiation_projects(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
) -> list[NegotiationProject]:
    return list(db.scalars(select(NegotiationProject).offset(skip).limit(limit)).all())


@router.get("/{negotiation_project_id}", response_model=NegotiationProjectRead)
def get_negotiation_project(negotiation_project_id: UUID, db: Session = Depends(get_db)) -> NegotiationProject:
    negotiation_project = db.get(NegotiationProject, negotiation_project_id)
    if negotiation_project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Negotiation project not found")
    return negotiation_project


@router.post("", response_model=NegotiationProjectRead, status_code=status.HTTP_201_CREATED)
def create_negotiation_project(
    payload: NegotiationProjectCreate,
    db: Session = Depends(get_db),
) -> NegotiationProject:
    negotiation_project = NegotiationProject(**payload.model_dump())
    db.add(negotiation_project)
    db.commit()
    db.refresh(negotiation_project)
    return negotiation_project
