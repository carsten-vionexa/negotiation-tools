"""sharpen core domain models

Revision ID: 8a7e4f2c1b9d
Revises: 20cfcd9a8300
Create Date: 2026-05-12 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "8a7e4f2c1b9d"
down_revision: Union[str, Sequence[str], None] = "20cfcd9a8300"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("procurement_history_items", sa.Column("supplier_country", sa.String(length=100), nullable=True))
    op.add_column("procurement_history_items", sa.Column("lead_time_weeks", sa.Numeric(precision=6, scale=2), nullable=True))
    op.add_column("procurement_history_items", sa.Column("quality_rating", sa.String(length=100), nullable=True))
    op.add_column("procurement_history_items", sa.Column("price_assessment", sa.String(length=100), nullable=True))
    op.add_column("procurement_history_items", sa.Column("improvement_potential", sa.Text(), nullable=True))

    op.add_column("request_items", sa.Column("article_name", sa.String(length=255), nullable=True))
    op.add_column("request_items", sa.Column("article_description", sa.Text(), nullable=True))
    op.add_column("request_items", sa.Column("rough_price_expectation", sa.Numeric(precision=14, scale=4), nullable=True))
    op.add_column("request_items", sa.Column("target_delivery_time", sa.String(length=150), nullable=True))
    op.add_column("request_items", sa.Column("target_region", sa.String(length=150), nullable=True))
    op.add_column(
        "request_items",
        sa.Column("status", sa.String(length=50), server_default="open", nullable=False),
    )
    op.add_column("request_items", sa.Column("comment", sa.Text(), nullable=True))
    op.alter_column("request_items", "status", server_default=None)

    op.add_column("knowledge_documents", sa.Column("project_id", sa.UUID(), nullable=True))
    op.add_column("knowledge_documents", sa.Column("source_name", sa.String(length=255), nullable=True))
    op.add_column("knowledge_documents", sa.Column("source_author", sa.String(length=255), nullable=True))
    op.add_column("knowledge_documents", sa.Column("source_date", sa.Date(), nullable=True))
    op.add_column(
        "knowledge_documents",
        sa.Column("reliability_level", sa.String(length=50), server_default="unknown", nullable=False),
    )
    op.add_column(
        "knowledge_documents",
        sa.Column("confidentiality_level", sa.String(length=50), server_default="internal", nullable=False),
    )
    op.add_column("knowledge_documents", sa.Column("description", sa.Text(), nullable=True))
    op.create_index(op.f("ix_knowledge_documents_project_id"), "knowledge_documents", ["project_id"], unique=False)
    op.create_foreign_key(
        op.f("fk_knowledge_documents_project_id_negotiation_projects"),
        "knowledge_documents",
        "negotiation_projects",
        ["project_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.alter_column("knowledge_documents", "reliability_level", server_default=None)
    op.alter_column("knowledge_documents", "confidentiality_level", server_default=None)

    op.add_column("supplier_profiles", sa.Column("region", sa.String(length=150), nullable=True))
    op.add_column("supplier_profiles", sa.Column("industry", sa.String(length=150), nullable=True))
    op.add_column("supplier_profiles", sa.Column("supplier_type", sa.String(length=100), nullable=True))
    op.add_column("supplier_profiles", sa.Column("power_level", sa.String(length=100), nullable=True))
    op.add_column("supplier_profiles", sa.Column("risk_level", sa.String(length=100), nullable=True))
    op.add_column("supplier_profiles", sa.Column("cultural_context", sa.Text(), nullable=True))
    op.add_column(
        "supplier_profiles",
        sa.Column(
            "interests_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
    )
    op.add_column(
        "supplier_profiles",
        sa.Column(
            "likely_tactics_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
    )
    op.add_column(
        "supplier_profiles",
        sa.Column(
            "constraints_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
    )
    op.add_column(
        "supplier_profiles",
        sa.Column("is_ai_generated", sa.Boolean(), server_default=sa.text("false"), nullable=False),
    )
    op.add_column(
        "supplier_profiles",
        sa.Column("confidence_level", sa.String(length=50), server_default="unknown", nullable=False),
    )
    op.alter_column("supplier_profiles", "interests_json", server_default=None)
    op.alter_column("supplier_profiles", "likely_tactics_json", server_default=None)
    op.alter_column("supplier_profiles", "constraints_json", server_default=None)
    op.alter_column("supplier_profiles", "is_ai_generated", server_default=None)
    op.alter_column("supplier_profiles", "confidence_level", server_default=None)

    op.add_column("negotiation_projects", sa.Column("project_type", sa.String(length=100), nullable=True))
    op.add_column("negotiation_projects", sa.Column("category", sa.String(length=150), nullable=True))
    op.add_column("negotiation_projects", sa.Column("article_or_service", sa.String(length=255), nullable=True))
    op.add_column("negotiation_projects", sa.Column("quantity", sa.Numeric(precision=14, scale=3), nullable=True))
    op.add_column("negotiation_projects", sa.Column("target_region", sa.String(length=150), nullable=True))
    op.add_column("negotiation_projects", sa.Column("desired_delivery_time", sa.String(length=150), nullable=True))
    op.add_column(
        "negotiation_projects",
        sa.Column("internal_price_expectation", sa.Numeric(precision=14, scale=4), nullable=True),
    )
    op.add_column("negotiation_projects", sa.Column("currency", sa.String(length=3), nullable=True))
    op.add_column("negotiation_projects", sa.Column("current_supplier", sa.String(length=255), nullable=True))
    op.add_column("negotiation_projects", sa.Column("priority", sa.String(length=50), nullable=True))
    op.add_column("negotiation_projects", sa.Column("business_pressure", sa.Text(), nullable=True))
    op.add_column("negotiation_projects", sa.Column("technical_dependency_level", sa.String(length=100), nullable=True))
    op.add_column("negotiation_projects", sa.Column("supplier_power_level", sa.String(length=100), nullable=True))
    op.add_column("negotiation_projects", sa.Column("risk_level", sa.String(length=100), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("negotiation_projects", "risk_level")
    op.drop_column("negotiation_projects", "supplier_power_level")
    op.drop_column("negotiation_projects", "technical_dependency_level")
    op.drop_column("negotiation_projects", "business_pressure")
    op.drop_column("negotiation_projects", "priority")
    op.drop_column("negotiation_projects", "current_supplier")
    op.drop_column("negotiation_projects", "currency")
    op.drop_column("negotiation_projects", "internal_price_expectation")
    op.drop_column("negotiation_projects", "desired_delivery_time")
    op.drop_column("negotiation_projects", "target_region")
    op.drop_column("negotiation_projects", "quantity")
    op.drop_column("negotiation_projects", "article_or_service")
    op.drop_column("negotiation_projects", "category")
    op.drop_column("negotiation_projects", "project_type")

    op.drop_column("supplier_profiles", "confidence_level")
    op.drop_column("supplier_profiles", "is_ai_generated")
    op.drop_column("supplier_profiles", "constraints_json")
    op.drop_column("supplier_profiles", "likely_tactics_json")
    op.drop_column("supplier_profiles", "interests_json")
    op.drop_column("supplier_profiles", "cultural_context")
    op.drop_column("supplier_profiles", "risk_level")
    op.drop_column("supplier_profiles", "power_level")
    op.drop_column("supplier_profiles", "supplier_type")
    op.drop_column("supplier_profiles", "industry")
    op.drop_column("supplier_profiles", "region")

    op.drop_constraint(
        op.f("fk_knowledge_documents_project_id_negotiation_projects"),
        "knowledge_documents",
        type_="foreignkey",
    )
    op.drop_index(op.f("ix_knowledge_documents_project_id"), table_name="knowledge_documents")
    op.drop_column("knowledge_documents", "description")
    op.drop_column("knowledge_documents", "confidentiality_level")
    op.drop_column("knowledge_documents", "reliability_level")
    op.drop_column("knowledge_documents", "source_date")
    op.drop_column("knowledge_documents", "source_author")
    op.drop_column("knowledge_documents", "source_name")
    op.drop_column("knowledge_documents", "project_id")

    op.drop_column("request_items", "comment")
    op.drop_column("request_items", "status")
    op.drop_column("request_items", "target_region")
    op.drop_column("request_items", "target_delivery_time")
    op.drop_column("request_items", "rough_price_expectation")
    op.drop_column("request_items", "article_description")
    op.drop_column("request_items", "article_name")

    op.drop_column("procurement_history_items", "improvement_potential")
    op.drop_column("procurement_history_items", "price_assessment")
    op.drop_column("procurement_history_items", "quality_rating")
    op.drop_column("procurement_history_items", "lead_time_weeks")
    op.drop_column("procurement_history_items", "supplier_country")
