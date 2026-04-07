"""Pydantic schemas for roadmap endpoints."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class RoadmapBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=2000)


class RoadmapCreate(RoadmapBase):
    pass


class RoadmapUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=2000)


class RoadmapRead(RoadmapBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    owner_id: UUID
    created_at: datetime
    updated_at: datetime


# --- Generation (LLM-backed) ---


class RoadmapGenerateRequest(BaseModel):
    objective: str = Field(min_length=3, max_length=200)


class RoadmapNodeOut(BaseModel):
    id: str
    title: str
    description: str
    parent_id: str | None = None


class RoadmapGenerateResponse(BaseModel):
    objective: str
    nodes: list[RoadmapNodeOut]
