"""Orchestrates LLM-backed roadmap generation. Keeps handlers thin."""

import structlog
from fastapi import HTTPException, status

from app.llm.chains.roadmap_chain import generate_roadmap as llm_generate_roadmap
from app.llm.schemas import RoadmapLLM
from app.schemas.roadmap import (
    RoadmapGenerateResponse,
    RoadmapNodeOut,
)

log = structlog.get_logger(__name__)


def _validate_tree(roadmap: RoadmapLLM) -> None:
    """Sanity-check the LLM output: one root, valid parent refs, unique ids."""
    if not roadmap.nodes:
        raise ValueError("Roadmap has no nodes.")

    ids = {n.id for n in roadmap.nodes}
    if len(ids) != len(roadmap.nodes):
        raise ValueError("Duplicate node ids.")

    roots = [n for n in roadmap.nodes if n.parent_id is None]
    if len(roots) != 1:
        raise ValueError(f"Expected exactly 1 root node, got {len(roots)}.")

    for n in roadmap.nodes:
        if n.parent_id is not None and n.parent_id not in ids:
            raise ValueError(f"Node {n.id} references unknown parent {n.parent_id}.")


async def generate(objective: str) -> RoadmapGenerateResponse:
    log.info("roadmap.generate.start", objective=objective)
    try:
        roadmap = await llm_generate_roadmap(objective)
        _validate_tree(roadmap)
    except ValueError as e:
        log.warning("roadmap.generate.invalid_output", error=str(e))
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            f"LLM returned an invalid roadmap: {e}",
        ) from e
    except Exception as e:
        log.exception("roadmap.generate.failed")
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            "Failed to generate roadmap from LLM.",
        ) from e

    log.info("roadmap.generate.success", node_count=len(roadmap.nodes))
    return RoadmapGenerateResponse(
        objective=roadmap.objective,
        nodes=[
            RoadmapNodeOut(
                id=n.id,
                title=n.title,
                description=n.description,
                parent_id=n.parent_id,
            )
            for n in roadmap.nodes
        ],
    )
