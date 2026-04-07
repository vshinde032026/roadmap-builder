"""Business logic for roadmaps. Keeps handlers thin."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.roadmap import Roadmap
from app.schemas.roadmap import RoadmapCreate, RoadmapUpdate


async def list_roadmaps(db: AsyncSession, owner_id: UUID) -> list[Roadmap]:
    result = await db.execute(
        select(Roadmap).where(Roadmap.owner_id == owner_id).order_by(Roadmap.created_at.desc())
    )
    return list(result.scalars().all())


async def get_roadmap(db: AsyncSession, roadmap_id: UUID, owner_id: UUID) -> Roadmap | None:
    result = await db.execute(
        select(Roadmap).where(Roadmap.id == roadmap_id, Roadmap.owner_id == owner_id)
    )
    return result.scalar_one_or_none()


async def create_roadmap(db: AsyncSession, owner_id: UUID, data: RoadmapCreate) -> Roadmap:
    roadmap = Roadmap(owner_id=owner_id, **data.model_dump())
    db.add(roadmap)
    await db.commit()
    await db.refresh(roadmap)
    return roadmap


async def update_roadmap(
    db: AsyncSession, roadmap: Roadmap, data: RoadmapUpdate
) -> Roadmap:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(roadmap, field, value)
    await db.commit()
    await db.refresh(roadmap)
    return roadmap


async def delete_roadmap(db: AsyncSession, roadmap: Roadmap) -> None:
    await db.delete(roadmap)
    await db.commit()
