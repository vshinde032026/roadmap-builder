"""Pydantic schemas for clip endpoints."""

from datetime import datetime

from pydantic import BaseModel, Field


class ClipCreate(BaseModel):
    url: str = Field(min_length=1)
    title: str | None = None
    selected_text: str = Field(min_length=1)
    fragment_url: str = Field(min_length=1)
    screenshot: str | None = None
    roadmap_node_id: str | None = None


class ClipRead(BaseModel):
    id: str
    url: str
    title: str | None
    selected_text: str
    fragment_url: str
    screenshot: str | None
    roadmap_node_id: str | None
    created_at: datetime
