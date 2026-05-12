from typing import Any
from uuid import UUID

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class ZopaItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "zopa_items"

    strategy_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("strategies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    dimension: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)
    buyer_target_value: Mapped[str | None] = mapped_column(String(255))
    buyer_walk_away_value: Mapped[str | None] = mapped_column(String(255))
    supplier_expected_target_value: Mapped[str | None] = mapped_column(String(255))
    supplier_estimated_walk_away_value: Mapped[str | None] = mapped_column(String(255))
    possible_agreement_range: Mapped[str | None] = mapped_column(String(255))
    currency: Mapped[str | None] = mapped_column(String(3))
    unit: Mapped[str | None] = mapped_column(String(50))
    priority: Mapped[str | None] = mapped_column(String(50))
    confidence_level: Mapped[str | None] = mapped_column(String(50))
    information_kind: Mapped[str | None] = mapped_column(String(50))
    source_reference: Mapped[str | None] = mapped_column(Text)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    strategy = relationship("Strategy", back_populates="zopa_items")
