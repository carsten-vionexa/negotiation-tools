from typing import TypeVar
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

ModelT = TypeVar("ModelT")


def get_or_404(db: Session, model: type[ModelT], object_id: UUID, label: str) -> ModelT:
    entity = db.get(model, object_id)
    if entity is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{label} not found",
        )
    return entity


def ensure_exists(db: Session, model: type[ModelT], object_id: UUID, label: str) -> ModelT:
    return get_or_404(db, model, object_id, label)


def ensure_optional_exists(
    db: Session,
    model: type[ModelT],
    object_id: UUID | None,
    label: str,
) -> ModelT | None:
    if object_id is None:
        return None
    return get_or_404(db, model, object_id, label)


def ensure_same_company(entity: object, company_id: UUID, label: str) -> None:
    if getattr(entity, "company_id", None) != company_id:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"{label} does not belong to company",
        )


def ensure_optional_same_company(entity: object | None, company_id: UUID, label: str) -> None:
    if entity is None:
        return
    ensure_same_company(entity, company_id, label)
