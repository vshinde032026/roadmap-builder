"""Roadmap CRUD endpoints."""

from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.api.deps import CurrentUserId, DbSession
from app.schemas.roadmap import RoadmapCreate, RoadmapRead, RoadmapUpdate
from app.services import roadmap_service

router = APIRouter()


@router.get("", response_model=list[RoadmapRead])
async def list_roadmaps(db: DbSession, user_id: CurrentUserId) -> list[RoadmapRead]:
    roadmaps = await roadmap_service.list_roadmaps(db, user_id)
    return [RoadmapRead.model_validate(r) for r in roadmaps]


@router.post("", response_model=RoadmapRead, status_code=status.HTTP_201_CREATED)
async def create_roadmap(
    data: RoadmapCreate, db: DbSession, user_id: CurrentUserId
) -> RoadmapRead:
    roadmap = await roadmap_service.create_roadmap(db, user_id, data)
    return RoadmapRead.model_validate(roadmap)


@router.get("/{roadmap_id}", response_model=RoadmapRead)
async def get_roadmap(
    roadmap_id: UUID, db: DbSession, user_id: CurrentUserId
) -> RoadmapRead:
    roadmap = await roadmap_service.get_roadmap(db, roadmap_id, user_id)
    if roadmap is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Roadmap not found")
    return RoadmapRead.model_validate(roadmap)


@router.patch("/{roadmap_id}", response_model=RoadmapRead)
async def update_roadmap(
    roadmap_id: UUID, data: RoadmapUpdate, db: DbSession, user_id: CurrentUserId
) -> RoadmapRead:
    roadmap = await roadmap_service.get_roadmap(db, roadmap_id, user_id)
    if roadmap is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Roadmap not found")
    updated = await roadmap_service.update_roadmap(db, roadmap, data)
    return RoadmapRead.model_validate(updated)


@router.delete("/{roadmap_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_roadmap(
    roadmap_id: UUID, db: DbSession, user_id: CurrentUserId
) -> None:
    roadmap = await roadmap_service.get_roadmap(db, roadmap_id, user_id)
    if roadmap is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Roadmap not found")
    await roadmap_service.delete_roadmap(db, roadmap)
