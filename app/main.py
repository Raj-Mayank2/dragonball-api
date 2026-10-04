from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers.sagas import router as saga_router
from app.routers.characters import router as character_router
from strawberry.fastapi import GraphQLRouter
from app.routers.events import router as event_router
from app.graphql.context import get_context
from app.graphql.schema import schema
from app.routers.auth import router as auth_router
from app.config import settings
app = FastAPI(
    title="Dragon Ball API",
    description="REST and GraphQL API for the Dragon Ball universe.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://dragonball-api-vert.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)

graphql_router = GraphQLRouter(
    schema,
    context_getter=get_context,
)

app.include_router(
    graphql_router,
    prefix="/graphql",
)
app.include_router(auth_router)
app.include_router(character_router)
app.include_router(saga_router)
app.include_router(event_router)
@app.get("/")
async def root():
    return {
        "name": "Dragon Ball API",
        "message": "Welcome to the Dragon Ball API",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "message": "Dragon Ball API is running",
    }