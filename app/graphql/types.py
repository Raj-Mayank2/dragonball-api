from datetime import datetime

import strawberry


@strawberry.type
class SagaSummaryType:
    id: int
    name: str


@strawberry.type
class CharacterSummaryType:
    id: int
    name: str
    species: str


@strawberry.type
class CharacterType:
    id: int
    name: str
    gender: str
    status: str
    species: str
    created_at: datetime
    image: str | None

    sagas: list[SagaSummaryType]


@strawberry.type
class SagaType:
    id: int
    name: str
    description: str | None
    created_at: datetime
    image: str | None

    characters: list[CharacterSummaryType]