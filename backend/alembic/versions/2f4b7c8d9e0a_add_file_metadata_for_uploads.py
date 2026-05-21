"""add file metadata for uploads

Revision ID: 2f4b7c8d9e0a
Revises: f6a7b8c9d0e1
Create Date: 2026-05-21 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "2f4b7c8d9e0a"
down_revision: Union[str, Sequence[str], None] = "f6a7b8c9d0e1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("knowledge_documents", sa.Column("original_filename", sa.String(length=255), nullable=True))
    op.add_column("knowledge_documents", sa.Column("storage_key", sa.String(length=500), nullable=True))
    op.add_column("knowledge_documents", sa.Column("file_size_bytes", sa.BigInteger(), nullable=True))
    op.add_column("knowledge_documents", sa.Column("checksum", sa.String(length=128), nullable=True))
    op.add_column("knowledge_documents", sa.Column("uploaded_at", sa.DateTime(timezone=True), nullable=True))

    op.add_column("import_jobs", sa.Column("original_filename", sa.String(length=255), nullable=True))
    op.add_column("import_jobs", sa.Column("storage_key", sa.String(length=500), nullable=True))
    op.add_column("import_jobs", sa.Column("mime_type", sa.String(length=150), nullable=True))
    op.add_column("import_jobs", sa.Column("file_size_bytes", sa.BigInteger(), nullable=True))
    op.add_column("import_jobs", sa.Column("checksum", sa.String(length=128), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("import_jobs", "checksum")
    op.drop_column("import_jobs", "file_size_bytes")
    op.drop_column("import_jobs", "mime_type")
    op.drop_column("import_jobs", "storage_key")
    op.drop_column("import_jobs", "original_filename")

    op.drop_column("knowledge_documents", "uploaded_at")
    op.drop_column("knowledge_documents", "checksum")
    op.drop_column("knowledge_documents", "file_size_bytes")
    op.drop_column("knowledge_documents", "storage_key")
    op.drop_column("knowledge_documents", "original_filename")
