"""LLM-backed roadmap generation endpoint."""

from fastapi import APIRouter

from app.schemas.roadmap import RoadmapGenerateRequest, RoadmapGenerateResponse
from app.services import roadmap_generator

router = APIRouter()


@router.post("/generate", response_model=RoadmapGenerateResponse)
async def generate_roadmap(data: RoadmapGenerateRequest) -> RoadmapGenerateResponse:
    return await roadmap_generator.generate(data.objective)
