"""Async MongoDB client (Motor).

A single AsyncIOMotorClient is created at app startup and shared across
requests. Use the FastAPI dependency `MongoDb` to obtain the database handle
inside endpoints/services.
"""

from typing import Annotated

from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import get_settings

_client: AsyncIOMotorClient | None = None
_db: AsyncIOMotorDatabase | None = None


async def connect_to_mongo() -> None:
    """Initialize the global Mongo client. Call from FastAPI lifespan."""
    global _client, _db
    settings = get_settings()
    _client = AsyncIOMotorClient(settings.mongodb_uri, tz_aware=True)
    _db = _client[settings.mongodb_db]
    # Cheap ping to fail fast if Mongo is unreachable.
    await _client.admin.command("ping")


async def close_mongo_connection() -> None:
    """Close the global Mongo client. Call from FastAPI lifespan shutdown."""
    global _client, _db
    if _client is not None:
        _client.close()
    _client = None
    _db = None


def get_mongo_db() -> AsyncIOMotorDatabase:
    """FastAPI dependency returning the shared Mongo database handle."""
    if _db is None:
        raise RuntimeError("Mongo client is not initialized")
    return _db


MongoDb = Annotated[AsyncIOMotorDatabase, Depends(get_mongo_db)]
