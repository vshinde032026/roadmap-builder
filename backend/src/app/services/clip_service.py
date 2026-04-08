"""Business logic for clips (MongoDB-backed)."""

from datetime import datetime, timezone
from uuid import uuid4

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.clip import ClipCreate

COLLECTION = "clips"


def _serialize(doc: dict) -> dict:
    """Convert a Mongo document into something Pydantic can validate."""
    return {
        "id": doc["_id"],
        "url": doc["url"],
        "title": doc.get("title"),
        "selected_text": doc["selected_text"],
        "fragment_url": doc["fragment_url"],
        "screenshot": doc.get("screenshot"),
        "roadmap_node_id": doc.get("roadmap_node_id"),
        "created_at": doc["created_at"],
    }


async def list_clips(db: AsyncIOMotorDatabase) -> list[dict]:
    cursor = db[COLLECTION].find().sort("created_at", -1)
    return [_serialize(doc) async for doc in cursor]


async def create_clip(db: AsyncIOMotorDatabase, data: ClipCreate) -> dict:
    doc = {
        "_id": str(uuid4()),
        **data.model_dump(),
        "created_at": datetime.now(timezone.utc),
    }
    await db[COLLECTION].insert_one(doc)
    return _serialize(doc)
