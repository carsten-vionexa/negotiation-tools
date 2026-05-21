from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import get_or_404
from app.models.import_row import ImportRow
from app.schemas.import_row import ImportRowRead

router = APIRouter()


@router.get("", response_model=list[ImportRowRead])
def list_import_rows(
    skip: int = 0,
    limit: int = 100,
    import_job_id: UUID | None = None,
    company_id: UUID | None = None,
    negotiation_project_id: UUID | None = None,
    status: str | None = None,
    target_entity: str | None = None,
    row_number: int | None = None,
    db: Session = Depends(get_db),
) -> list[ImportRow]:
    query = select(ImportRow)
    if import_job_id:
        query = query.where(ImportRow.import_job_id == import_job_id)
    if company_id:
        query = query.where(ImportRow.company_id == company_id)
    if negotiation_project_id:
        query = query.where(ImportRow.project_id == negotiation_project_id)
    if status:
        query = query.where(ImportRow.validation_status == status)
    if target_entity:
        query = query.where(ImportRow.target_entity == target_entity)
    if row_number is not None:
        query = query.where(ImportRow.row_number == row_number)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{import_row_id}", response_model=ImportRowRead)
def get_import_row(import_row_id: UUID, db: Session = Depends(get_db)) -> ImportRow:
    return get_or_404(db, ImportRow, import_row_id, "Import row")
