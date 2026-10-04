from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.services.event_manager import event_manager
from app.models.character import Character
from app.models.saga import Saga
from app.schemas.saga import SagaCreate


async def create_saga(
    db: AsyncSession,
    saga_data: SagaCreate,
) -> Saga:
    saga = Saga(
        name=saga_data.name,
        description=saga_data.description,
        image=saga_data.image,
    )

    db.add(saga)

    await db.commit()
    await db.refresh(saga)

    await event_manager.publish(
        event="saga_created",
        data={
            "id": saga.id,
            "name": saga.name,
        },
    )

    return saga


async def get_sagas(
    db: AsyncSession,
) -> list[Saga]:
    result = await db.execute(
        select(Saga).order_by(Saga.id)
    )

    return list(result.scalars().all())


async def get_saga_by_id(
    db: AsyncSession,
    saga_id: int,
) -> Saga | None:
    result = await db.execute(
        select(Saga).where(Saga.id == saga_id)
    )

    return result.scalar_one_or_none()


async def add_character_to_saga(
    db: AsyncSession,
    saga_id: int,
    character_id: int,
) -> Character | None:
    result = await db.execute(
        select(Saga)
        .options(selectinload(Saga.characters))
        .where(Saga.id == saga_id)
    )

    saga = result.scalar_one_or_none()

    if saga is None:
        return None

    character_result = await db.execute(
        select(Character).where(Character.id == character_id)
    )

    character = character_result.scalar_one_or_none()

    if character is None:
        return None

    if character not in saga.characters:
        saga.characters.append(character)
        await db.commit()
        await event_manager.publish(
    event="character_added_to_saga",
    data={
        "character_id": character.id,
        "character_name": character.name,
        "saga_id": saga.id,
        "saga_name": saga.name,
    },
)

    return character


async def get_saga_characters(
    db: AsyncSession,
    saga_id: int,
) -> list[Character] | None:
    result = await db.execute(
        select(Saga)
        .options(selectinload(Saga.characters))
        .where(Saga.id == saga_id)
    )

    saga = result.scalar_one_or_none()

    if saga is None:
        return None

    return saga.characters


async def get_character_sagas(
    db: AsyncSession,
    character_id: int,
) -> list[Saga] | None:
    result = await db.execute(
        select(Character)
        .options(selectinload(Character.sagas))
        .where(Character.id == character_id)
    )

    character = result.scalar_one_or_none()

    if character is None:
        return None

    return character.sagas


async def remove_character_from_saga(
    db: AsyncSession,
    saga_id: int,
    character_id: int,
) -> bool:
    result = await db.execute(
        select(Saga)
        .options(selectinload(Saga.characters))
        .where(Saga.id == saga_id)
    )

    saga = result.scalar_one_or_none()

    if saga is None:
        return False

    character_result = await db.execute(
        select(Character).where(Character.id == character_id)
    )

    character = character_result.scalar_one_or_none()

    if character is None:
        return False

    if character in saga.characters:
        saga.characters.remove(character)
        await db.commit()

    return True