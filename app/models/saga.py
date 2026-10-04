from datetime import datetime

from sqlalchemy import DateTime, String, Text


from app.models.base import Base


from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.character_saga import character_saga

if TYPE_CHECKING:
    from app.models.character import Character


class Saga(Base):
    __tablename__ = "sagas"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    image: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    characters: Mapped[list["Character"]] = relationship(
    "Character",
    secondary=character_saga,
    back_populates="sagas",
)