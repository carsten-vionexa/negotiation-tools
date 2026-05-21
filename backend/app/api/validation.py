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


def ensure_reference_exists(db: Session, model: type[ModelT], object_id: UUID, label: str) -> ModelT:
    entity = db.get(model, object_id)
    if entity is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{label} does not exist",
        )
    return entity


def ensure_optional_reference_exists(
    db: Session,
    model: type[ModelT],
    object_id: UUID | None,
    label: str,
) -> ModelT | None:
    if object_id is None:
        return None
    return ensure_reference_exists(db, model, object_id, label)


def ensure_same_company(entity: object, company_id: UUID, label: str) -> None:
    if getattr(entity, "company_id", None) != company_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{label} does not belong to company",
        )


def ensure_optional_same_company(entity: object | None, company_id: UUID, label: str) -> None:
    if entity is None:
        return
    ensure_same_company(entity, company_id, label)


def ensure_non_null_updates(updates: dict[str, object], non_nullable_fields: set[str]) -> None:
    for field_name in non_nullable_fields:
        if field_name in updates and updates[field_name] is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{field_name} cannot be null",
            )


def apply_partial_update(entity: object, updates: dict[str, object], non_nullable_fields: set[str]) -> None:
    ensure_non_null_updates(updates, non_nullable_fields)

    for field_name, value in updates.items():
        setattr(entity, field_name, value)
