"""Anthropic chat model factory. Isolates SDK + config from callers."""

from functools import lru_cache

from langchain_anthropic import ChatAnthropic

from app.core.config import get_settings


@lru_cache(maxsize=1)
def get_chat_model() -> ChatAnthropic:
    settings = get_settings()
    return ChatAnthropic(
        model_name=settings.llm_model,
        api_key=settings.anthropic_api_key,
        max_tokens_to_sample=settings.llm_max_tokens,
        temperature=settings.llm_temperature,
        timeout=60,
        stop=None,
    )
