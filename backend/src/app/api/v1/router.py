"""Aggregate v1 API router."""

from fastapi import APIRouter

from app.api.v1.endpoints import roadmap_generate, roadmaps

api_router = APIRouter()
api_router.include_router(roadmaps.router, prefix="/roadmaps", tags=["roadmaps"])
api_router.include_router(
    roadmap_generate.router, prefix="/roadmaps", tags=["roadmaps"]
)
