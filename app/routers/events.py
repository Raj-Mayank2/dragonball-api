import json
from collections.abc import AsyncGenerator

from fastapi import APIRouter
from sse_starlette.sse import EventSourceResponse


from app.services.event_manager import event_manager

router = APIRouter(
    prefix="/api/v1",
    tags=["Events"],
)


async def event_generator() -> AsyncGenerator[dict, None]:
    queue = event_manager.subscribe()

    try:
        while True:
            message = await queue.get()

            yield {
                "event": message["event"],
                "data": json.dumps(message["data"]),
            }

    finally:
        event_manager.unsubscribe(queue)


@router.get("/events")
async def events():
    return EventSourceResponse(
        event_generator(),
        ping=15,
    )

@router.get("/events/history")
async def event_history():
    return {
        "events": event_manager.history()
    }