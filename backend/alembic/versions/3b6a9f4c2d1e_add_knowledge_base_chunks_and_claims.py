"""add knowledge base chunks and claims

Revision ID: 3b6a9f4c2d1e
Revises: 8a7e4f2c1b9d
Create Date: 2026-05-12 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import pgvector.sqlalchemy
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "3b6a9f4c2d1e"
down_revision: Union[str, Sequence[str], None] = "8a7e4f2c1b9d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "document_chunks",
        sa.Column("knowledge_document_id", sa.UUID(), nullable=False),
        sa.Column("company_id", sa.UUID(), nullable=False),
        sa.Column("project_id", sa.UUID(), nullable=True),
        sa.Column("chunk_index", sa.Integer(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("content_hash", sa.String(length=128), nullable=True),
        sa.Column("page_number", sa.Integer(), nullable=True),
        sa.Column("sheet_name", sa.String(length=255), nullable=True),
        sa.Column("row_number", sa.Integer(), nullable=True),
        sa.Column("section_title", sa.String(length=255), nullable=True),
        sa.Column("source_reference", sa.String(length=255), nullable=True),
        sa.Column("language", sa.String(length=20), nullable=True),
        sa.Column("metadata_json", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("embedding", pgvector.sqlalchemy.vector.VECTOR(dim=1536), nullable=True),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"],
            ["companies.id"],
            name=op.f("fk_document_chunks_company_id_companies"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["knowledge_document_id"],
            ["knowledge_documents.id"],
            name=op.f("fk_document_chunks_knowledge_document_id_knowledge_documents"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["project_id"],
            ["negotiation_projects.id"],
            name=op.f("fk_document_chunks_project_id_negotiation_projects"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_document_chunks")),
    )
    op.create_index(op.f("ix_document_chunks_company_id"), "document_chunks", ["company_id"], unique=False)
    op.create_index(op.f("ix_document_chunks_content_hash"), "document_chunks", ["content_hash"], unique=False)
    op.create_index(
        op.f("ix_document_chunks_knowledge_document_id"),
        "document_chunks",
        ["knowledge_document_id"],
        unique=False,
    )
    op.create_index(op.f("ix_document_chunks_project_id"), "document_chunks", ["project_id"], unique=False)

    op.create_table(
        "knowledge_claims",
        sa.Column("company_id", sa.UUID(), nullable=False),
        sa.Column("project_id", sa.UUID(), nullable=True),
        sa.Column("supplier_profile_id", sa.UUID(), nullable=True),
        sa.Column("knowledge_document_id", sa.UUID(), nullable=False),
        sa.Column("document_chunk_id", sa.UUID(), nullable=True),
        sa.Column("claim_type", sa.String(length=100), nullable=False),
        sa.Column("claim_category", sa.String(length=100), nullable=True),
        sa.Column("claim_text", sa.Text(), nullable=False),
        sa.Column("evidence_text", sa.Text(), nullable=True),
        sa.Column("source_reference", sa.String(length=255), nullable=True),
        sa.Column("confidence_level", sa.String(length=50), nullable=False),
        sa.Column("information_kind", sa.String(length=50), nullable=False),
        sa.Column("is_ai_generated", sa.Boolean(), nullable=False),
        sa.Column("metadata_json", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"],
            ["companies.id"],
            name=op.f("fk_knowledge_claims_company_id_companies"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["document_chunk_id"],
            ["document_chunks.id"],
            name=op.f("fk_knowledge_claims_document_chunk_id_document_chunks"),
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["knowledge_document_id"],
            ["knowledge_documents.id"],
            name=op.f("fk_knowledge_claims_knowledge_document_id_knowledge_documents"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["project_id"],
            ["negotiation_projects.id"],
            name=op.f("fk_knowledge_claims_project_id_negotiation_projects"),
            ondelete="SET NULL",
        ),
        sa.ForeignKeyConstraint(
            ["supplier_profile_id"],
            ["supplier_profiles.id"],
            name=op.f("fk_knowledge_claims_supplier_profile_id_supplier_profiles"),
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_knowledge_claims")),
    )
    op.create_index(op.f("ix_knowledge_claims_claim_type"), "knowledge_claims", ["claim_type"], unique=False)
    op.create_index(op.f("ix_knowledge_claims_company_id"), "knowledge_claims", ["company_id"], unique=False)
    op.create_index(
        op.f("ix_knowledge_claims_document_chunk_id"),
        "knowledge_claims",
        ["document_chunk_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_knowledge_claims_knowledge_document_id"),
        "knowledge_claims",
        ["knowledge_document_id"],
        unique=False,
    )
    op.create_index(op.f("ix_knowledge_claims_project_id"), "knowledge_claims", ["project_id"], unique=False)
    op.create_index(
        op.f("ix_knowledge_claims_supplier_profile_id"),
        "knowledge_claims",
        ["supplier_profile_id"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f("ix_knowledge_claims_supplier_profile_id"), table_name="knowledge_claims")
    op.drop_index(op.f("ix_knowledge_claims_project_id"), table_name="knowledge_claims")
    op.drop_index(op.f("ix_knowledge_claims_knowledge_document_id"), table_name="knowledge_claims")
    op.drop_index(op.f("ix_knowledge_claims_document_chunk_id"), table_name="knowledge_claims")
    op.drop_index(op.f("ix_knowledge_claims_company_id"), table_name="knowledge_claims")
    op.drop_index(op.f("ix_knowledge_claims_claim_type"), table_name="knowledge_claims")
    op.drop_table("knowledge_claims")

    op.drop_index(op.f("ix_document_chunks_project_id"), table_name="document_chunks")
    op.drop_index(op.f("ix_document_chunks_knowledge_document_id"), table_name="document_chunks")
    op.drop_index(op.f("ix_document_chunks_content_hash"), table_name="document_chunks")
    op.drop_index(op.f("ix_document_chunks_company_id"), table_name="document_chunks")
    op.drop_table("document_chunks")
