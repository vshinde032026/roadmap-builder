"""Pydantic schemas for roadmap endpoints."""

from pydantic import BaseModel, Field


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
