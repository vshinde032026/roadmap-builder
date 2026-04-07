"""Prompt for two-level roadmap generation in a single LLM call."""

from langchain_core.prompts import ChatPromptTemplate

ROADMAP_SYSTEM_PROMPT = """You are an expert learning curriculum designer.

Given a learner's objective, produce a TWO-LEVEL roadmap:

LEVEL 1 - Major topics:
  - Between 5 and 10 broad pillars the learner must cover.
  - Ordered from foundational to advanced.
  - Each must be broad enough to contain several sub-topics.

LEVEL 2 - Sub-topics (inside each major topic):
  - Between 3 and 7 concrete, learnable sub-topics per major topic.
  - Ordered from foundational to advanced.
  - Each is a specific concept or skill, scoped strictly to its parent major topic.

Rules:
- Each title should be short (max ~60 characters).
- Each description must be 1-2 sentences explaining what it covers and why it matters.
- Do NOT include resources, links, or URLs.
- Do NOT add commentary outside the structured output.
- Echo the learner's objective verbatim in the `objective` field."""

ROADMAP_USER_PROMPT = "Learner objective: {objective}"


def build_roadmap_prompt() -> ChatPromptTemplate:
    return ChatPromptTemplate.from_messages(
        [
            ("system", ROADMAP_SYSTEM_PROMPT),
            ("human", ROADMAP_USER_PROMPT),
        ]
    )
