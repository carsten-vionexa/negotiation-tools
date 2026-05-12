"""add strategy data model

Revision ID: 9c1d2e3f4a5b
Revises: 5d2c9a8b7e6f
Create Date: 2026-05-12 14:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "9c1d2e3f4a5b"
down_revision: Union[str, Sequence[str], None] = "5d2c9a8b7e6f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "strategies",
        sa.Column("company_id", sa.UUID(), nullable=False),
        sa.Column("negotiation_project_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=50), server_default="draft", nullable=False),
        sa.Column("version", sa.Integer(), server_default=sa.text("1"), nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("overall_objective", sa.Text(), nullable=True),
        sa.Column("target_outcome", sa.Text(), nullable=True),
        sa.Column("minimum_acceptable_outcome", sa.Text(), nullable=True),
        sa.Column("walk_away_point", sa.Text(), nullable=True),
        sa.Column("zopa_summary", sa.Text(), nullable=True),
        sa.Column("batna_summary", sa.Text(), nullable=True),
        sa.Column("concession_strategy", sa.Text(), nullable=True),
        sa.Column("argumentation_summary", sa.Text(), nullable=True),
        sa.Column("risk_assessment", sa.Text(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "metadata_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"],
            ["companies.id"],
            name=op.f("fk_strategies_company_id_companies"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["negotiation_project_id"],
            ["negotiation_projects.id"],
            name=op.f("fk_strategies_negotiation_project_id_negotiation_projects"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_strategies")),
    )
    op.create_index(op.f("ix_strategies_company_id"), "strategies", ["company_id"], unique=False)
    op.create_index(
        op.f("ix_strategies_negotiation_project_id"),
        "strategies",
        ["negotiation_project_id"],
        unique=False,
    )
    op.create_index(op.f("ix_strategies_status"), "strategies", ["status"], unique=False)

    op.create_table(
        "zopa_items",
        sa.Column("strategy_id", sa.UUID(), nullable=False),
        sa.Column("dimension", sa.String(length=100), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("buyer_target_value", sa.String(length=255), nullable=True),
        sa.Column("buyer_walk_away_value", sa.String(length=255), nullable=True),
        sa.Column("supplier_expected_target_value", sa.String(length=255), nullable=True),
        sa.Column("supplier_estimated_walk_away_value", sa.String(length=255), nullable=True),
        sa.Column("possible_agreement_range", sa.String(length=255), nullable=True),
        sa.Column("currency", sa.String(length=3), nullable=True),
        sa.Column("unit", sa.String(length=50), nullable=True),
        sa.Column("priority", sa.String(length=50), nullable=True),
        sa.Column("confidence_level", sa.String(length=50), nullable=True),
        sa.Column("information_kind", sa.String(length=50), nullable=True),
        sa.Column("source_reference", sa.Text(), nullable=True),
        sa.Column(
            "metadata_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["strategy_id"],
            ["strategies.id"],
            name=op.f("fk_zopa_items_strategy_id_strategies"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_zopa_items")),
    )
    op.create_index(op.f("ix_zopa_items_strategy_id"), "zopa_items", ["strategy_id"], unique=False)

    op.create_table(
        "batna_options",
        sa.Column("strategy_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("batna_type", sa.String(length=100), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("feasibility_level", sa.String(length=50), nullable=True),
        sa.Column("estimated_cost", sa.Numeric(14, 4), nullable=True),
        sa.Column("currency", sa.String(length=3), nullable=True),
        sa.Column("estimated_lead_time", sa.String(length=100), nullable=True),
        sa.Column("risk_level", sa.String(length=50), nullable=True),
        sa.Column("impact_assessment", sa.Text(), nullable=True),
        sa.Column("required_actions", sa.Text(), nullable=True),
        sa.Column("is_preferred", sa.Boolean(), server_default=sa.text("false"), nullable=False),
        sa.Column("ranking", sa.Integer(), nullable=True),
        sa.Column("confidence_level", sa.String(length=50), nullable=True),
        sa.Column(
            "metadata_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["strategy_id"],
            ["strategies.id"],
            name=op.f("fk_batna_options_strategy_id_strategies"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_batna_options")),
    )
    op.create_index(op.f("ix_batna_options_strategy_id"), "batna_options", ["strategy_id"], unique=False)

    op.create_table(
        "concession_items",
        sa.Column("strategy_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("concession_type", sa.String(length=100), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("value_to_us", sa.String(length=255), nullable=True),
        sa.Column("value_to_counterparty", sa.String(length=255), nullable=True),
        sa.Column("estimated_cost", sa.Numeric(14, 4), nullable=True),
        sa.Column("currency", sa.String(length=3), nullable=True),
        sa.Column("give_condition", sa.Text(), nullable=True),
        sa.Column("required_counterpart", sa.Text(), nullable=True),
        sa.Column("sequence_order", sa.Integer(), nullable=True),
        sa.Column("is_final_offer_item", sa.Boolean(), server_default=sa.text("false"), nullable=False),
        sa.Column("risk_level", sa.String(length=50), nullable=True),
        sa.Column(
            "metadata_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["strategy_id"],
            ["strategies.id"],
            name=op.f("fk_concession_items_strategy_id_strategies"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_concession_items")),
    )
    op.create_index(op.f("ix_concession_items_strategy_id"), "concession_items", ["strategy_id"], unique=False)

    op.create_table(
        "argumentation_lines",
        sa.Column("strategy_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("argument_type", sa.String(length=100), nullable=True),
        sa.Column("claim", sa.Text(), nullable=True),
        sa.Column("evidence", sa.Text(), nullable=True),
        sa.Column("source_reference", sa.Text(), nullable=True),
        sa.Column("expected_counterargument", sa.Text(), nullable=True),
        sa.Column("response_strategy", sa.Text(), nullable=True),
        sa.Column("priority", sa.String(length=50), nullable=True),
        sa.Column("confidence_level", sa.String(length=50), nullable=True),
        sa.Column("information_kind", sa.String(length=50), nullable=True),
        sa.Column(
            "metadata_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["strategy_id"],
            ["strategies.id"],
            name=op.f("fk_argumentation_lines_strategy_id_strategies"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_argumentation_lines")),
    )
    op.create_index(
        op.f("ix_argumentation_lines_strategy_id"),
        "argumentation_lines",
        ["strategy_id"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f("ix_argumentation_lines_strategy_id"), table_name="argumentation_lines")
    op.drop_table("argumentation_lines")

    op.drop_index(op.f("ix_concession_items_strategy_id"), table_name="concession_items")
    op.drop_table("concession_items")

    op.drop_index(op.f("ix_batna_options_strategy_id"), table_name="batna_options")
    op.drop_table("batna_options")

    op.drop_index(op.f("ix_zopa_items_strategy_id"), table_name="zopa_items")
    op.drop_table("zopa_items")

    op.drop_index(op.f("ix_strategies_status"), table_name="strategies")
    op.drop_index(op.f("ix_strategies_negotiation_project_id"), table_name="strategies")
    op.drop_index(op.f("ix_strategies_company_id"), table_name="strategies")
    op.drop_table("strategies")
