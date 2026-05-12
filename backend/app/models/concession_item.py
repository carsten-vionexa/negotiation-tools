from decimal import Decimal
from typing import Any
from uuid import UUID

from sqlalchemy import Boolean, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class ConcessionItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "concession_items"

    strategy_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("strategies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    concession_type: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)
    value_to_us: Mapped[str | None] = mapped_column(String(255))
    value_to_counterparty: Mapped[str | None] = mapped_column(String(255))
    estimated_cost: Mapped[Decimal | None] = mapped_column(Numeric(14, 4))
    currency: Mapped[str | None] = mapped_column(String(3))
    give_condition: Mapped[str | None] = mapped_column(Text)
    required_counterpart: Mapped[str | None] = mapped_column(Text)
    sequence_order: Mapped[int | None] = mapped_column(Integer)
    is_final_offer_item: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    risk_level: Mapped[str | None] = mapped_column(String(50))
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    strategy = relationship("Strategy", back_populates="concession_items")
