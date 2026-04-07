from unittest.mock import patch

from httpx import ASGITransport, AsyncClient

from app.llm.schemas import RoadmapLLM, RoadmapNodeLLM
from app.main import app


def _fake_roadmap() -> RoadmapLLM:
    return RoadmapLLM(
        objective="Learn frontend",
        nodes=[
            RoadmapNodeLLM(id="n1", title="Frontend", description="Root.", parent_id=None),
            RoadmapNodeLLM(id="n2", title="HTML", description="Markup.", parent_id="n1"),
            RoadmapNodeLLM(id="n3", title="CSS", description="Styles.", parent_id="n1"),
        ],
    )


async def test_generate_roadmap_success() -> None:
    with patch(
        "app.services.roadmap_generator.llm_generate_roadmap",
        return_value=_fake_roadmap(),
    ):
        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            resp = await client.post(
                "/api/v1/roadmaps/generate", json={"objective": "Learn frontend"}
            )

    assert resp.status_code == 200
    body = resp.json()
    assert body["objective"] == "Learn frontend"
    assert len(body["nodes"]) == 3
    assert body["nodes"][0]["parent_id"] is None


async def test_generate_roadmap_rejects_short_objective() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.post("/api/v1/roadmaps/generate", json={"objective": "hi"})
    assert resp.status_code == 422


async def test_generate_roadmap_invalid_tree_returns_502() -> None:
    bad = RoadmapLLM(
        objective="x",
        nodes=[
            RoadmapNodeLLM(id="n1", title="A", description="d", parent_id=None),
            RoadmapNodeLLM(id="n2", title="B", description="d", parent_id="missing"),
        ],
    )
    with patch(
        "app.services.roadmap_generator.llm_generate_roadmap",
        return_value=bad,
    ):
        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            resp = await client.post(
                "/api/v1/roadmaps/generate", json={"objective": "Learn x"}
            )
    assert resp.status_code == 502
