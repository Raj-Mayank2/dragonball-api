from math import ceil

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    status as http_status,
)
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.character import (
    CharacterCreate,
    CharacterListResponse,
    CharacterResponse,
    CharacterUpdate,
)
from app.services.character_service import (
    create_character,
    delete_character,
    get_character_by_id,
    get_characters,
    update_character,
)

from app.schemas.saga import SagaResponse
from app.services.saga_service import get_character_sagas
router = APIRouter(
    prefix="/api/v1/characters",
    tags=["Characters"],
)


@router.post(
    "",
    response_model=CharacterResponse,
    status_code=http_status.HTTP_201_CREATED,
)
async def create_character_endpoint(
    character: CharacterCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_character(
        db=db,
        character_data=character,
    )


@router.get(
    "",
    response_model=CharacterListResponse,
)
async def get_characters_endpoint(
    db: AsyncSession = Depends(get_db),
    name: str | None = Query(default=None),
    gender: str | None = Query(default=None),
    status_filter: str | None = Query(
        default=None,
        alias="status",
    ),
    species: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
):
    characters, total = await get_characters(
        db=db,
        name=name,
        gender=gender,
        status=status_filter,
        species=species,
        page=page,
        limit=limit,
    )

    pages = ceil(total / limit) if total else 0

    return {
        "items": characters,
        "page": page,
        "limit": limit,
        "total": total,
        "pages": pages,
    }


@router.get(
    "/{character_id}",
    response_model=CharacterResponse,
)
async def get_character(
    character_id: int,
    db: AsyncSession = Depends(get_db),
):
    character = await get_character_by_id(
        db=db,
        character_id=character_id,
    )

    if character is None:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="Character not found",
        )

    return character


@router.patch(
    "/{character_id}",
    response_model=CharacterResponse,
)
async def update_character_endpoint(
    character_id: int,
    character_data: CharacterUpdate,
    db: AsyncSession = Depends(get_db),
):
    character = await get_character_by_id(
        db=db,
        character_id=character_id,
    )

    if character is None:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="Character not found",
        )

    return await update_character(
        db=db,
        character=character,
        character_data=character_data,
    )


@router.delete(
    "/{character_id}",
    status_code=http_status.HTTP_204_NO_CONTENT,
)
async def delete_character_endpoint(
    character_id: int,
    db: AsyncSession = Depends(get_db),
):
    character = await get_character_by_id(
        db=db,
        character_id=character_id,
    )

    if character is None:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail="Character not found",
        )

    await delete_character(
        db=db,
        character=character,
    )

    return None


@router.get(
    "/{character_id}/sagas",
    response_model=list[SagaResponse],
)
async def get_character_sagas_endpoint(
    character_id: int,
    db: AsyncSession = Depends(get_db),
):
    sagas = await get_character_sagas(
        db=db,
        character_id=character_id,
    )

    if sagas is None:
        raise HTTPException(
            status_code=404,
            detail="Character not found",
        )

    return sagas