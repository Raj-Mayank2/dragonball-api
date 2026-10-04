from math import ceil

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.character import Character
from app.schemas.character import CharacterCreate, CharacterUpdate

from app.services.event_manager import event_manager
async def create_character(
    db: AsyncSession,
    character_data: CharacterCreate,
) -> Character:
    character = Character(
        name=character_data.name,
        gender=character_data.gender,
        status=character_data.status,
        species=character_data.species,
        image=character_data.image,
    )

    db.add(character)

    await db.commit()
    await db.refresh(character)

    await event_manager.publish(
        event="character_created",
        data={
            "id": character.id,
            "name": character.name,
            "gender": character.gender.value,
            "status": character.status.value,
            "species": character.species.value,
        },
    )

    return character


async def get_characters(
    db: AsyncSession,
    name: str | None = None,
    gender: str | None = None,
    status: str | None = None,
    species: str | None = None,
    page: int = 1,
    limit: int = 10,
) -> tuple[list[Character], int]:

    query = select(Character)

    if name:
        query = query.where(
            func.lower(Character.name).contains(name.lower())
        )

    if gender:
        query = query.where(
            func.lower(Character.gender).contains(gender.lower())
        )

    if status:
        query = query.where(
            func.lower(Character.status).contains(status.lower())
        )

    if species:
        query = query.where(
            func.lower(Character.species).contains(species.lower())
        )

    count_query = select(func.count()).select_from(query.subquery())

    total_result = await db.execute(count_query)
    total = total_result.scalar_one()

    offset = (page - 1) * limit

    query = (
        query
        .order_by(Character.id)
        .offset(offset)
        .limit(limit)
    )

    result = await db.execute(query)

    characters = list(result.scalars().all())

    return characters, total


async def get_character_by_id(
    db: AsyncSession,
    character_id: int,
) -> Character | None:

    result = await db.execute(
        select(Character).where(
            Character.id == character_id
        )
    )

    return result.scalar_one_or_none()


async def update_character(
    db: AsyncSession,
    character: Character,
    character_data: CharacterUpdate,
) -> Character:

    update_data = character_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(character, field, value)

    await db.commit()
    await db.refresh(character)
    await event_manager.publish(
    event="character_updated",
    data={
        "id": character.id,
        "name": character.name,
        "gender": character.gender.value,
        "status": character.status.value,
        "species": character.species.value,
    },
)

    return character


async def delete_character(
    db: AsyncSession,
    character: Character,
) -> None:
    character_id = character.id
    character_name = character.name

    await db.delete(character)
    await db.commit()

    await event_manager.publish(
        event="character_deleted",
        data={
            "id": character_id,
            "name": character_name,
        },
    )