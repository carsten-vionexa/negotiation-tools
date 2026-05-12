from datetime import date
from decimal import Decimal
from typing import Any
from uuid import UUID

from sqlalchemy import Date, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class RequestItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "request_items"

    company_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    article_name: Mapped[str | None] = mapped_column(String(255))
    article_description: Mapped[str | None] = mapped_column(Text)
    category: Mapped[str | None] = mapped_column(String(150), index=True)
    specification: Mapped[str | None] = mapped_column(Text)
    requested_quantity: Mapped[Decimal | None] = mapped_column(Numeric(14, 3))
    unit: Mapped[str | None] = mapped_column(String(50))
    target_price: Mapped[Decimal | None] = mapped_column(Numeric(14, 4))
    rough_price_expectation: Mapped[Decimal | None] = mapped_column(Numeric(14, 4))
    currency: Mapped[str | None] = mapped_column(String(3))
    required_delivery_date: Mapped[date | None] = mapped_column(Date)
    target_delivery_time: Mapped[str | None] = mapped_column(String(150))
    target_region: Mapped[str | None] = mapped_column(String(150))
    priority: Mapped[str | None] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(String(50), default="open", nullable=False)
    comment: Mapped[str | None] = mapped_column(Text)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    company = relationship("Company", back_populates="request_items")
    negotiation_projects = relationship("NegotiationProject", back_populates="request_item")
