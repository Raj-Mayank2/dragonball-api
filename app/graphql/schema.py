import strawberry

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.graphql.types import (
    CharacterSummaryType,
    CharacterType,
    SagaSummaryType,
    SagaType,
)
from app.models.character import Character
from app.models.saga import Saga


@strawberry.type
class Query:

    @strawberry.field
    async def characters(
        self,
        info: strawberry.Info,
    ) -> list[CharacterType]:
        db = info.context["db"]

        result = await db.execute(
            select(Character)
            .options(selectinload(Character.sagas))
            .order_by(Character.id)
        )

        characters = result.scalars().all()

        return [
            CharacterType(
                id=character.id,
                name=character.name,
                gender=character.gender.value,
                status=character.status.value,
                species=character.species.value,
                created_at=character.created_at,
                image=character.image,
                sagas=[
                    SagaSummaryType(
                        id=saga.id,
                        name=saga.name,
                    )
                    for saga in character.sagas
                ],
            )
            for character in characters
        ]

    @strawberry.field
    async def character(
        self,
        info: strawberry.Info,
        id: int,
    ) -> CharacterType | None:
        db = info.context["db"]

        result = await db.execute(
            select(Character)
            .options(selectinload(Character.sagas))
            .where(Character.id == id)
        )

        character = result.scalar_one_or_none()

        if character is None:
            return None

        return CharacterType(
            id=character.id,
            name=character.name,
            gender=character.gender.value,
            status=character.status.value,
            species=character.species.value,
            created_at=character.created_at,
            image=character.image,
            sagas=[
                SagaSummaryType(
                    id=saga.id,
                    name=saga.name,
                )
                for saga in character.sagas
            ],
        )

    @strawberry.field
    async def sagas(
        self,
        info: strawberry.Info,
    ) -> list[SagaType]:
        db = info.context["db"]

        result = await db.execute(
            select(Saga)
            .order_by(Saga.id)
        )

        sagas = result.scalars().all()

        return [
            SagaType(
                id=saga.id,
                name=saga.name,
                description=saga.description,
                created_at=saga.created_at,
                image=saga.image,
                characters=[],
            )
            for saga in sagas
        ]

    @strawberry.field
    async def saga(
        self,
        info: strawberry.Info,
        id: int,
    ) -> SagaType | None:
        db = info.context["db"]

        result = await db.execute(
            select(Saga)
            .options(selectinload(Saga.characters))
            .where(Saga.id == id)
        )

        saga = result.scalar_one_or_none()

        if saga is None:
            return None

        return SagaType(
            id=saga.id,
            name=saga.name,
            description=saga.description,
            created_at=saga.created_at,
            image=saga.image,
            characters=[
                CharacterSummaryType(
                    id=character.id,
                    name=character.name,
                    species=character.species.value,
                )
                for character in saga.characters
            ],
        )


schema = strawberry.Schema(query=Query)