from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import Gender, Species, Status


class CharacterBase(BaseModel):
    name: str
    gender: Gender
    status: Status
    species: Species
    image: str | None = None


class CharacterCreate(CharacterBase):
    pass


class CharacterUpdate(BaseModel):
    name: str | None = None
    gender: Gender | None = None
    status: Status | None = None
    species: Species | None = None
    image: str | None = None


class CharacterResponse(CharacterBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CharacterListResponse(BaseModel):
    items: list[CharacterResponse]
    page: int
    limit: int
    total: int
    pages: int