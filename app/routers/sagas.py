from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.character import CharacterResponse
from app.schemas.saga import SagaCreate, SagaResponse
from app.services.saga_service import (
    add_character_to_saga,
    create_saga,
    get_character_sagas,
    get_saga_by_id,
    get_saga_characters,
    get_sagas,
    remove_character_from_saga,
)


router = APIRouter(
    prefix="/api/v1/sagas",
    tags=["Sagas"],
)


@router.post(
    "",
    response_model=SagaResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_saga_endpoint(
    saga: SagaCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_saga(db, saga)


@router.get(
    "",
    response_model=list[SagaResponse],
)
async def get_sagas_endpoint(
    db: AsyncSession = Depends(get_db),
):
    return await get_sagas(db)


@router.get(
    "/{saga_id}",
    response_model=SagaResponse,
)
async def get_saga(
    saga_id: int,
    db: AsyncSession = Depends(get_db),
):
    saga = await get_saga_by_id(db, saga_id)

    if saga is None:
        raise HTTPException(
            status_code=404,
            detail="Saga not found",
        )

    return saga


@router.post(
    "/{saga_id}/characters/{character_id}",
    response_model=CharacterResponse,
    status_code=status.HTTP_201_CREATED,
)
async def add_character(
    saga_id: int,
    character_id: int,
    db: AsyncSession = Depends(get_db),
):
    character = await add_character_to_saga(
        db=db,
        saga_id=saga_id,
        character_id=character_id,
    )

    if character is None:
        raise HTTPException(
            status_code=404,
            detail="Saga or character not found",
        )

    return character


@router.get(
    "/{saga_id}/characters",
    response_model=list[CharacterResponse],
)
async def get_saga_characters_endpoint(
    saga_id: int,
    db: AsyncSession = Depends(get_db),
):
    characters = await get_saga_characters(
        db=db,
        saga_id=saga_id,
    )

    if characters is None:
        raise HTTPException(
            status_code=404,
            detail="Saga not found",
        )

    return characters

@router.delete(
    "/{saga_id}/characters/{character_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def remove_character(
    saga_id: int,
    character_id: int,
    db: AsyncSession = Depends(get_db),
):
    success = await remove_character_from_saga(
        db=db,
        saga_id=saga_id,
        character_id=character_id,
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Saga or character not found",
        )

    return None