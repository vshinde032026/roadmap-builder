"""Pydantic schemas for LLM structured outputs."""

from pydantic import BaseModel, Field


class SubTopic(BaseModel):
    """A specific sub-topic inside a major topic."""

    title: str = Field(description="Short sub-topic name (max ~60 chars).")
    description: str = Field(
        description="One or two sentences on what to learn here and why."
    )


class MajorTopic(BaseModel):
    """A top-level topic the learner must cover, plus its sub-topics."""

    title: str = Field(description="Short topic name (max ~60 chars).")
    description: str = Field(
        description="One or two sentences explaining what this topic covers and why it matters."
    )
    sub_topics: list[SubTopic] = Field(
        description="Ordered list of 3-7 concrete sub-topics, foundational first."
    )


class TwoLevelRoadmapLLM(BaseModel):
    """Single-call structured output: objective → major topics → sub-topics."""

    objective: str = Field(description="Echo of the user's learning objective.")
    major_topics: list[MajorTopic] = Field(
        description=(
            "Ordered list of 5-10 major topics, foundational first. "
            "Each major topic contains its own sub-topics."
        )
    )


# --- Final assembled roadmap (flat tree used by the API layer) ---


class RoadmapNodeLLM(BaseModel):
    id: str
    title: str
    description: str
    parent_id: str | None = None


class RoadmapLLM(BaseModel):
    objective: str
    nodes: list[RoadmapNodeLLM]
