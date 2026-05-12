from typing import Any
from uuid import UUID

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class ArgumentationLine(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "argumentation_lines"

    strategy_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("strategies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    argument_type: Mapped[str | None] = mapped_column(String(100))
    claim: Mapped[str | None] = mapped_column(Text)
    evidence: Mapped[str | None] = mapped_column(Text)
    source_reference: Mapped[str | None] = mapped_column(Text)
    expected_counterargument: Mapped[str | None] = mapped_column(Text)
    response_strategy: Mapped[str | None] = mapped_column(Text)
    priority: Mapped[str | None] = mapped_column(String(50))
    confidence_level: Mapped[str | None] = mapped_column(String(50))
    information_kind: Mapped[str | None] = mapped_column(String(50))
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    strategy = relationship("Strategy", back_populates="argumentation_lines")
