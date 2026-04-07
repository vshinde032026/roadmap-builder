"""Aggregate v1 API router."""

from fastapi import APIRouter

from app.api.v1.endpoints import roadmaps

api_router = APIRouter()
api_router.include_router(roadmaps.router, prefix="/roadmaps", tags=["roadmaps"])
