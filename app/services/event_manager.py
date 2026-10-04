import asyncio
from collections import deque
from typing import Any


class EventManager:
    def __init__(self) -> None:
        self._subscribers: set[
            asyncio.Queue[dict[str, Any]]
        ] = set()

        self._history: deque[
            dict[str, Any]
        ] = deque(maxlen=50)

    def subscribe(self) -> asyncio.Queue[dict[str, Any]]:
        queue = asyncio.Queue[dict[str, Any]]()
        self._subscribers.add(queue)
        return queue

    def unsubscribe(
        self,
        queue: asyncio.Queue[dict[str, Any]],
    ) -> None:
        self._subscribers.discard(queue)

    async def publish(
        self,
        event: str,
        data: dict[str, Any],
    ) -> None:
        message = {
            "event": event,
            "data": data,
        }

        self._history.append(message)

        for queue in list(self._subscribers):
            await queue.put(message)

    def history(self) -> list[dict[str, Any]]:
        return list(self._history)


event_manager = EventManager()