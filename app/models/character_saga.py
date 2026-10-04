from sqlalchemy import Column, ForeignKey, Integer, Table

from app.models.base import Base


character_saga = Table(
    "character_saga",
    Base.metadata,
    Column(
        "character_id",
        Integer,
        ForeignKey(
            "characters.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    ),
    Column(
        "saga_id",
        Integer,
        ForeignKey(
            "sagas.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    ),
)