"""Single-call LangChain chain that extracts a two-level roadmap and flattens it."""

from langchain_core.runnables import Runnable

from app.llm.client import get_chat_model
from app.llm.prompts.roadmap_prompt import build_roadmap_prompt
from app.llm.schemas import RoadmapLLM, RoadmapNodeLLM, TwoLevelRoadmapLLM


def build_roadmap_chain() -> Runnable:
    """prompt | model.with_structured_output(TwoLevelRoadmapLLM)"""
    return build_roadmap_prompt() | get_chat_model().with_structured_output(
        TwoLevelRoadmapLLM
    )


async def generate_roadmap(objective: str) -> RoadmapLLM:
    chain = build_roadmap_chain()
    result = await chain.ainvoke({"objective": objective})
    assert isinstance(result, TwoLevelRoadmapLLM)
    return _flatten(result)


def _flatten(two_level: TwoLevelRoadmapLLM) -> RoadmapLLM:
    """Flatten the nested LLM output into a parent_id tree the API expects."""
    nodes: list[RoadmapNodeLLM] = []

    root_id = "n1"
    nodes.append(
        RoadmapNodeLLM(
            id=root_id,
            title=two_level.objective,
            description=f"Roadmap to: {two_level.objective}",
            parent_id=None,
        )
    )

    next_id = 2
    for major in two_level.major_topics:
        major_id = f"n{next_id}"
        next_id += 1
        nodes.append(
            RoadmapNodeLLM(
                id=major_id,
                title=major.title,
                description=major.description,
                parent_id=root_id,
            )
        )
        for sub in major.sub_topics:
            sub_id = f"n{next_id}"
            next_id += 1
            nodes.append(
                RoadmapNodeLLM(
                    id=sub_id,
                    title=sub.title,
                    description=sub.description,
                    parent_id=major_id,
                )
            )

    return RoadmapLLM(objective=two_level.objective, nodes=nodes)
