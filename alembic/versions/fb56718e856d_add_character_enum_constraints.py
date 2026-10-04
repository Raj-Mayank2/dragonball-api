"""add character enum constraints

Revision ID: fb56718e856d
Revises: 5d02bb1255ea
Create Date: 2026-10-03 22:05:05.637455

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fb56718e856d'
down_revision: Union[str, Sequence[str], None] = '5d02bb1255ea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_check_constraint(
        "ck_characters_gender",
        "characters",
        "gender IN ('MALE', 'FEMALE', 'UNKNOWN')",
    )

    op.create_check_constraint(
        "ck_characters_status",
        "characters",
        "status IN ('ALIVE', 'DEAD', 'UNKNOWN')",
    )

    op.create_check_constraint(
        "ck_characters_species",
        "characters",
        """
        species IN (
            'HUMAN',
            'SAIYAN',
            'HALF_SAIYAN',
            'NAMEKIAN',
            'FROST_DEMON',
            'BIO_ANDROID',
            'MAJIN',
            'GOD_OF_DESTRUCTION',
            'ANDROID',
            'ANGEL',
            'KAI',
            'OTHER'
        )
        """,
    )


def downgrade() -> None:
    op.drop_constraint(
        "ck_characters_species",
        "characters",
        type_="check",
    )

    op.drop_constraint(
        "ck_characters_status",
        "characters",
        type_="check",
    )

    op.drop_constraint(
        "ck_characters_gender",
        "characters",
        type_="check",
    )