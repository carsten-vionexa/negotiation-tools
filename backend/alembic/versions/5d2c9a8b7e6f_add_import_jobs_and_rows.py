"""add import jobs and rows

Revision ID: 5d2c9a8b7e6f
Revises: 3b6a9f4c2d1e
Create Date: 2026-05-12 13:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "5d2c9a8b7e6f"
down_revision: Union[str, Sequence[str], None] = "3b6a9f4c2d1e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "import_jobs",
        sa.Column("company_id", sa.UUID(), nullable=False),
        sa.Column("project_id", sa.UUID(), nullable=True),
        sa.Column("knowledge_document_id", sa.UUID(), nullable=True),
        sa.Column("filename", sa.String(length=255), nullable=False),
        sa.Column("source_type", sa.String(length=50), nullable=False),
        sa.Column("target_entity", sa.String(length=100), nullable=False),
        sa.Column("status", sa.String(length=50), server_default="pending", nullable=False),
        sa.Column("total_rows", sa.Integer(), server_default=sa.text("0"), nullable=False),
        sa.Column("processed_rows", sa.Integer(), server_default=sa.text("0"), nullable=False),
        sa.Column("valid_rows", sa.Integer(), server_default=sa.text("0"), nullable=False),
        sa.Column("error_rows", sa.Integer(), server_default=sa.text("0"), nullable=False),
        sa.Column(
            "mapping_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column(
            "validation_summary_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column("error_summary", sa.Text(), nullable=True),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"],
            ["companies.id"],
            name=op.f("fk_import_jobs_company_id_companies"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["knowledge_document_id"],
            ["knowledge_documents.id"],
            name=op.f("fk_import_jobs_knowledge_document_id_knowledge_documents"),
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["project_id"],
            ["negotiation_projects.id"],
            name=op.f("fk_import_jobs_project_id_negotiation_projects"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_import_jobs")),
    )
    op.create_index(op.f("ix_import_jobs_company_id"), "import_jobs", ["company_id"], unique=False)
    op.create_index(
        op.f("ix_import_jobs_knowledge_document_id"),
        "import_jobs",
        ["knowledge_document_id"],
        unique=False,
    )
    op.create_index(op.f("ix_import_jobs_project_id"), "import_jobs", ["project_id"], unique=False)
    op.create_index(op.f("ix_import_jobs_source_type"), "import_jobs", ["source_type"], unique=False)
    op.create_index(op.f("ix_import_jobs_status"), "import_jobs", ["status"], unique=False)
    op.create_index(op.f("ix_import_jobs_target_entity"), "import_jobs", ["target_entity"], unique=False)

    op.create_table(
        "import_rows",
        sa.Column("import_job_id", sa.UUID(), nullable=False),
        sa.Column("company_id", sa.UUID(), nullable=False),
        sa.Column("project_id", sa.UUID(), nullable=True),
        sa.Column("row_number", sa.Integer(), nullable=False),
        sa.Column("sheet_name", sa.String(length=255), nullable=True),
        sa.Column(
            "raw_data_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column(
            "mapped_data_json",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column("validation_status", sa.String(length=50), server_default="pending", nullable=False),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("warning_message", sa.Text(), nullable=True),
        sa.Column("target_entity", sa.String(length=100), nullable=True),
        sa.Column("target_record_id", sa.UUID(), nullable=True),
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
            name=op.f("fk_import_rows_company_id_companies"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["import_job_id"],
            ["import_jobs.id"],
            name=op.f("fk_import_rows_import_job_id_import_jobs"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["project_id"],
            ["negotiation_projects.id"],
            name=op.f("fk_import_rows_project_id_negotiation_projects"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_import_rows")),
    )
    op.create_index(op.f("ix_import_rows_company_id"), "import_rows", ["company_id"], unique=False)
    op.create_index(op.f("ix_import_rows_import_job_id"), "import_rows", ["import_job_id"], unique=False)
    op.create_index(
        "ix_import_rows_import_job_id_row_number",
        "import_rows",
        ["import_job_id", "row_number"],
        unique=False,
    )
    op.create_index(op.f("ix_import_rows_project_id"), "import_rows", ["project_id"], unique=False)
    op.create_index(op.f("ix_import_rows_target_entity"), "import_rows", ["target_entity"], unique=False)
    op.create_index(op.f("ix_import_rows_target_record_id"), "import_rows", ["target_record_id"], unique=False)
    op.create_index(
        op.f("ix_import_rows_validation_status"),
        "import_rows",
        ["validation_status"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f("ix_import_rows_validation_status"), table_name="import_rows")
    op.drop_index(op.f("ix_import_rows_target_record_id"), table_name="import_rows")
    op.drop_index(op.f("ix_import_rows_target_entity"), table_name="import_rows")
    op.drop_index(op.f("ix_import_rows_project_id"), table_name="import_rows")
    op.drop_index("ix_import_rows_import_job_id_row_number", table_name="import_rows")
    op.drop_index(op.f("ix_import_rows_import_job_id"), table_name="import_rows")
    op.drop_index(op.f("ix_import_rows_company_id"), table_name="import_rows")
    op.drop_table("import_rows")

    op.drop_index(op.f("ix_import_jobs_target_entity"), table_name="import_jobs")
    op.drop_index(op.f("ix_import_jobs_status"), table_name="import_jobs")
    op.drop_index(op.f("ix_import_jobs_source_type"), table_name="import_jobs")
    op.drop_index(op.f("ix_import_jobs_project_id"), table_name="import_jobs")
    op.drop_index(op.f("ix_import_jobs_knowledge_document_id"), table_name="import_jobs")
    op.drop_index(op.f("ix_import_jobs_company_id"), table_name="import_jobs")
    op.drop_table("import_jobs")
