---
title: "Prompt engineering tips that actually helped in production"
date: 2025-10-08T10:15:00-04:00
slug: "prompt-engineering-tips"
draft: false
tags: ["AI", "Prompting", "LLM", "Production"]
categories: ["blog", "AI"]
teaser: "Hard‑won tips for making LLMs more reliable, cheaper, and less surprising without fancy tooling."
---

I’ve shipped a handful of LLM‑powered features that real people used (and complained about). The things that helped weren’t clever prompts so much as boring habits that made behavior predictable and safe to launch.

Start with the contract, not the prose. When I define the interface first—what fields, what types, what to do when something’s missing—the model behaves like a small program instead of an essayist. “Return ONLY JSON, with `title`, `bullets[]`, and `citations[]`. If data is missing, use empty arrays.” That simple constraint removes a whole class of creative failures.

Adjectives don’t survive contact with production; tests do. “Concise and high‑quality” turned into “≤ 3 sentences; include one concrete fact; avoid ‘In conclusion.’” The side effect is that evals become measurable.

Structure helps more than examples. I’ll ask the model to think in a scaffold—facts → unknowns → answer—even if I only return the answer. Variance drops because the model has somewhere to put intermediate work.

Plan for refusals and safe defaults. For anything that can go wrong in front of users (medical, financial, private data), I’d rather get a polite refusal than a spicy hallucination. When confidence is shaky (you can approximate with crude heuristics like length or missing citations), fall back to the last known good answer.

Keep policy far from style. Safety rules live in the system prompt; tone and brand live in a tiny style block I can swap without touching logic. It keeps change‑risk small.

Cheap checks before expensive calls. Normalize input, run a fast classifier to gate traffic, and cache aggressively (including a tiny stale‑OK cache for brownouts). Half the “prompt issues” I’ve seen were actually plumbing.

Evals are a product, not a script. A curated set of ~100–200 representative prompts with rubrics, plus replay of scrubbed real traffic, let me compare deltas when I tweak prompts, models, or temperatures. If I can’t see it, I can’t fix it.

Hard limits beat soft wishes. If you need ≤ 300 tokens, set `max_tokens: 300`, say it in the prompt, then truncate. If you want JSON, parse JSON and fail closed.

Prompts rot. Version them, add changelogs, and be ready to roll back when live metrics slip.

A tiny template I keep around when the task is “render some UI”: 

```
SYSTEM: Return ONLY valid JSON for UI.
Contract: {title: string, bullets: string[], citations: {url: string, reason: string}[]}
Rules: never invent citations; if outside scope, return empty arrays.
STYLE: neutral, clear. Audience: non‑technical.
USER: <content>
```

It’s not glamorous, but boring systems ship and stay up.
