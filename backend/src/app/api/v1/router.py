"""Aggregate v1 API router."""

from fastapi import APIRouter

from app.api.v1.endpoints import clips, roadmap_generate

api_router = APIRouter()
api_router.include_router(
    roadmap_generate.router, prefix="/roadmaps", tags=["roadmaps"]
)
api_router.include_router(clips.router, prefix="/clips", tags=["clips"])
