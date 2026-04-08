"""Clip endpoints — capture and list snippets from external pages.

Backed by MongoDB. Auth is intentionally omitted for the MVP so the browser
extension can post without a token. Tighten this up once auth is wired.
"""

from fastapi import APIRouter, status

from app.db.mongo import MongoDb
from app.schemas.clip import ClipCreate, ClipRead
from app.services import clip_service

router = APIRouter()


@router.get("", response_model=list[ClipRead])
async def list_clips(db: MongoDb) -> list[ClipRead]:
    clips = await clip_service.list_clips(db)
    return [ClipRead.model_validate(c) for c in clips]


@router.post("", response_model=ClipRead, status_code=status.HTTP_201_CREATED)
async def create_clip(data: ClipCreate, db: MongoDb) -> ClipRead:
    clip = await clip_service.create_clip(db, data)
    return ClipRead.model_validate(clip)
