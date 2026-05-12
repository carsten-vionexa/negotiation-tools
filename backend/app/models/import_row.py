from typing import Any
from uuid import UUID

from sqlalchemy import ForeignKey, Index, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class ImportRow(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "import_rows"
    __table_args__ = (
        Index("ix_import_rows_import_job_id_row_number", "import_job_id", "row_number"),
    )

    import_job_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("import_jobs.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    company_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    project_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("negotiation_projects.id", ondelete="SET NULL"),
        index=True,
    )
    row_number: Mapped[int] = mapped_column(Integer, nullable=False)
    sheet_name: Mapped[str | None] = mapped_column(String(255))
    raw_data_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    mapped_data_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    validation_status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False, index=True)
    error_message: Mapped[str | None] = mapped_column(Text)
    warning_message: Mapped[str | None] = mapped_column(Text)
    target_entity: Mapped[str | None] = mapped_column(String(100), index=True)
    target_record_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), index=True)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    import_job = relationship("ImportJob", back_populates="rows")
    company = relationship("Company", back_populates="import_rows")
    project = relationship("NegotiationProject", back_populates="import_rows")
