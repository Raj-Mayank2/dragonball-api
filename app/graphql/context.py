from sqlalchemy.ext.asyncio import AsyncSession

from app.database import AsyncSessionLocal


async def get_context():
    session = AsyncSessionLocal()

    try:
        yield {
            "db": session,
        }
    finally:
        await session.close()