from datetime import datetime

from sqlalchemy import DateTime, Enum as SQLEnum, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base
from app.models.enums import Gender, Species, Status



from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.character_saga import character_saga

if TYPE_CHECKING:
    from app.models.saga import Saga

class Character(Base):
    __tablename__ = "characters"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    gender: Mapped[Gender] = mapped_column(
        SQLEnum(
            Gender,
            name="ck_characters_gender",
            native_enum=False,
            create_constraint=True,
            validate_strings=True,
            length=20,
        ),
        nullable=False,
    )

    status: Mapped[Status] = mapped_column(
        SQLEnum(
            Status,
            name="ck_characters_status",
            native_enum=False,
            create_constraint=True,
            validate_strings=True,
            length=20,
        ),
        nullable=False,
    )

    species: Mapped[Species] = mapped_column(
        SQLEnum(
            Species,
            name="ck_characters_species",
            native_enum=False,
            create_constraint=True,
            validate_strings=True,
            length=50,
        ),
        nullable=False,
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

    sagas: Mapped[list["Saga"]] = relationship(
        "Saga",
        secondary=character_saga,
        back_populates="characters",
    )