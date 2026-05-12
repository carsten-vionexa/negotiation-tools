"""add simulation and evaluation data model

Revision ID: f6a7b8c9d0e1
Revises: 9c1d2e3f4a5b
Create Date: 2026-05-12 16:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "f6a7b8c9d0e1"
down_revision: Union[str, Sequence[str], None] = "9c1d2e3f4a5b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "simulation_scenarios",
        sa.Column("company_id", sa.UUID(), nullable=False),
        sa.Column("negotiation_project_id", sa.UUID(), nullable=False),
        sa.Column("strategy_id", sa.UUID(), nullable=True),
        sa.Column("supplier_profile_id", sa.UUID(), nullable=True),
        sa.Column("user_profile_id", sa.UUID(), nullable=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=50), server_default="draft", nullable=False),
        sa.Column("scenario_type", sa.String(length=100), nullable=True),
        sa.Column("ai_role", sa.String(length=100), nullable=True),
        sa.Column("counterparty_name", sa.String(length=255), nullable=True),
        sa.Column("counterparty_role", sa.String(length=150), nullable=True),
        sa.Column("country_or_region", sa.String(length=150), nullable=True),
        sa.Column("cultural_context", sa.Text(), nullable=True),
        sa.Column("difficulty_level", sa.String(length=50), nullable=True),
        sa.Column("communication_style", sa.String(length=100), nullable=True),
        sa.Column("negotiation_phase", sa.String(length=100), nullable=True),
        sa.Column("training_goal", sa.Text(), nullable=True),
        sa.Column("scenario_brief", sa.Text(), nullable=True),
        sa.Column("success_criteria", sa.Text(), nullable=True),
        sa.Column("time_limit_minutes", sa.Integer(), nullable=True),
        sa.Column("language", sa.String(length=20), nullable=True),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
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
            name=op.f("fk_simulation_scenarios_company_id_companies"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["negotiation_project_id"],
            ["negotiation_projects.id"],
            name=op.f("fk_simulation_scenarios_negotiation_project_id_negotiation_projects"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["strategy_id"],
            ["strategies.id"],
            name=op.f("fk_simulation_scenarios_strategy_id_strategies"),
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["supplier_profile_id"],
            ["supplier_profiles.id"],
            name=op.f("fk_simulation_scenarios_supplier_profile_id_supplier_profiles"),
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["user_profile_id"],
            ["user_profiles.id"],
            name=op.f("fk_simulation_scenarios_user_profile_id_user_profiles"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_simulation_scenarios")),
    )
    op.create_index(op.f("ix_simulation_scenarios_company_id"), "simulation_scenarios", ["company_id"], unique=False)
    op.create_index(
        op.f("ix_simulation_scenarios_negotiation_project_id"),
        "simulation_scenarios",
        ["negotiation_project_id"],
        unique=False,
    )
    op.create_index(op.f("ix_simulation_scenarios_status"), "simulation_scenarios", ["status"], unique=False)
    op.create_index(
        op.f("ix_simulation_scenarios_strategy_id"),
        "simulation_scenarios",
        ["strategy_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_simulation_scenarios_supplier_profile_id"),
        "simulation_scenarios",
        ["supplier_profile_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_simulation_scenarios_user_profile_id"),
        "simulation_scenarios",
        ["user_profile_id"],
        unique=False,
    )

    op.create_table(
        "simulation_messages",
        sa.Column("simulation_scenario_id", sa.UUID(), nullable=False),
        sa.Column("user_profile_id", sa.UUID(), nullable=True),
        sa.Column("sequence_number", sa.Integer(), nullable=False),
        sa.Column("sender_type", sa.String(length=50), nullable=False),
        sa.Column("sender_name", sa.String(length=255), nullable=True),
        sa.Column("role_in_simulation", sa.String(length=100), nullable=True),
        sa.Column("message_text", sa.Text(), nullable=False),
        sa.Column("message_type", sa.String(length=50), nullable=True),
        sa.Column("phase", sa.String(length=100), nullable=True),
        sa.Column(
            "detected_tactics_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column(
            "analysis_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
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
            ["simulation_scenario_id"],
            ["simulation_scenarios.id"],
            name=op.f("fk_simulation_messages_simulation_scenario_id_simulation_scenarios"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["user_profile_id"],
            ["user_profiles.id"],
            name=op.f("fk_simulation_messages_user_profile_id_user_profiles"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_simulation_messages")),
    )
    op.create_index(
        op.f("ix_simulation_messages_simulation_scenario_id"),
        "simulation_messages",
        ["simulation_scenario_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_simulation_messages_user_profile_id"),
        "simulation_messages",
        ["user_profile_id"],
        unique=False,
    )

    op.create_table(
        "simulation_results",
        sa.Column("simulation_scenario_id", sa.UUID(), nullable=False),
        sa.Column("user_profile_id", sa.UUID(), nullable=True),
        sa.Column("status", sa.String(length=50), server_default="draft", nullable=False),
        sa.Column("summary", sa.Text(), nullable=True),
        sa.Column("outcome", sa.String(length=100), nullable=True),
        sa.Column("objective_achievement", sa.String(length=100), nullable=True),
        sa.Column("agreed_terms", sa.Text(), nullable=True),
        sa.Column("missed_opportunities", sa.Text(), nullable=True),
        sa.Column("key_learning_points", sa.Text(), nullable=True),
        sa.Column("recommended_next_steps", sa.Text(), nullable=True),
        sa.Column("score_overall", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_preparation", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_strategy", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_questioning", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_argumentation", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_concession_management", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_pressure_handling", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_relationship_management", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_cultural_awareness", sa.Numeric(5, 2), nullable=True),
        sa.Column("score_closing", sa.Numeric(5, 2), nullable=True),
        sa.Column(
            "feedback_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
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
            ["simulation_scenario_id"],
            ["simulation_scenarios.id"],
            name=op.f("fk_simulation_results_simulation_scenario_id_simulation_scenarios"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["user_profile_id"],
            ["user_profiles.id"],
            name=op.f("fk_simulation_results_user_profile_id_user_profiles"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_simulation_results")),
    )
    op.create_index(
        op.f("ix_simulation_results_simulation_scenario_id"),
        "simulation_results",
        ["simulation_scenario_id"],
        unique=False,
    )
    op.create_index(op.f("ix_simulation_results_status"), "simulation_results", ["status"], unique=False)
    op.create_index(
        op.f("ix_simulation_results_user_profile_id"),
        "simulation_results",
        ["user_profile_id"],
        unique=False,
    )

    op.create_table(
        "trainer_comments",
        sa.Column("simulation_scenario_id", sa.UUID(), nullable=False),
        sa.Column("simulation_result_id", sa.UUID(), nullable=True),
        sa.Column("simulation_message_id", sa.UUID(), nullable=True),
        sa.Column("trainer_user_profile_id", sa.UUID(), nullable=True),
        sa.Column("comment_type", sa.String(length=100), nullable=True),
        sa.Column("comment_text", sa.Text(), nullable=False),
        sa.Column("related_competency", sa.String(length=100), nullable=True),
        sa.Column("severity", sa.String(length=50), nullable=True),
        sa.Column("is_visible_to_trainee", sa.Boolean(), server_default=sa.text("true"), nullable=False),
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
            ["simulation_message_id"],
            ["simulation_messages.id"],
            name=op.f("fk_trainer_comments_simulation_message_id_simulation_messages"),
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["simulation_result_id"],
            ["simulation_results.id"],
            name=op.f("fk_trainer_comments_simulation_result_id_simulation_results"),
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["simulation_scenario_id"],
            ["simulation_scenarios.id"],
            name=op.f("fk_trainer_comments_simulation_scenario_id_simulation_scenarios"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["trainer_user_profile_id"],
            ["user_profiles.id"],
            name=op.f("fk_trainer_comments_trainer_user_profile_id_user_profiles"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_trainer_comments")),
    )
    op.create_index(
        op.f("ix_trainer_comments_simulation_message_id"),
        "trainer_comments",
        ["simulation_message_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_trainer_comments_simulation_result_id"),
        "trainer_comments",
        ["simulation_result_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_trainer_comments_simulation_scenario_id"),
        "trainer_comments",
        ["simulation_scenario_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_trainer_comments_trainer_user_profile_id"),
        "trainer_comments",
        ["trainer_user_profile_id"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f("ix_trainer_comments_trainer_user_profile_id"), table_name="trainer_comments")
    op.drop_index(op.f("ix_trainer_comments_simulation_scenario_id"), table_name="trainer_comments")
    op.drop_index(op.f("ix_trainer_comments_simulation_result_id"), table_name="trainer_comments")
    op.drop_index(op.f("ix_trainer_comments_simulation_message_id"), table_name="trainer_comments")
    op.drop_table("trainer_comments")

    op.drop_index(op.f("ix_simulation_results_user_profile_id"), table_name="simulation_results")
    op.drop_index(op.f("ix_simulation_results_status"), table_name="simulation_results")
    op.drop_index(op.f("ix_simulation_results_simulation_scenario_id"), table_name="simulation_results")
    op.drop_table("simulation_results")

    op.drop_index(op.f("ix_simulation_messages_user_profile_id"), table_name="simulation_messages")
    op.drop_index(op.f("ix_simulation_messages_simulation_scenario_id"), table_name="simulation_messages")
    op.drop_table("simulation_messages")

    op.drop_index(op.f("ix_simulation_scenarios_user_profile_id"), table_name="simulation_scenarios")
    op.drop_index(op.f("ix_simulation_scenarios_supplier_profile_id"), table_name="simulation_scenarios")
    op.drop_index(op.f("ix_simulation_scenarios_strategy_id"), table_name="simulation_scenarios")
    op.drop_index(op.f("ix_simulation_scenarios_status"), table_name="simulation_scenarios")
    op.drop_index(op.f("ix_simulation_scenarios_negotiation_project_id"), table_name="simulation_scenarios")
    op.drop_index(op.f("ix_simulation_scenarios_company_id"), table_name="simulation_scenarios")
    op.drop_table("simulation_scenarios")
