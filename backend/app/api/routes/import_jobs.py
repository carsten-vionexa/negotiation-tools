from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import get_or_404
from app.models.import_job import ImportJob
from app.schemas.import_job import ImportJobRead

router = APIRouter()


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


@router.get("/{import_job_id}", response_model=ImportJobRead)
def get_import_job(import_job_id: UUID, db: Session = Depends(get_db)) -> ImportJob:
    return get_or_404(db, ImportJob, import_job_id, "Import job")
