from typing import Any
from uuid import UUID

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class NegotiationProject(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "negotiation_projects"

    company_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    owner_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("user_profiles.id", ondelete="SET NULL"),
        index=True,
    )
    request_item_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("request_items.id", ondelete="SET NULL"),
        index=True,
    )
    supplier_profile_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("supplier_profiles.id", ondelete="SET NULL"),
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="draft", nullable=False, index=True)
    negotiation_type: Mapped[str | None] = mapped_column(String(100))
    objective: Mapped[str | None] = mapped_column(Text)
    context: Mapped[str | None] = mapped_column(Text)
    strategy_data: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    simulation_data: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    company = relationship("Company", back_populates="negotiation_projects")
    owner = relationship("UserProfile", back_populates="negotiation_projects")
    request_item = relationship("RequestItem", back_populates="negotiation_projects")
    supplier = relationship("SupplierProfile", back_populates="negotiation_projects")
