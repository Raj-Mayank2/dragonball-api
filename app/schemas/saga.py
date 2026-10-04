from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SagaBase(BaseModel):
    name: str
    description: str | None = None
    image: str | None = None


class SagaCreate(SagaBase):
    pass


class SagaResponse(SagaBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)