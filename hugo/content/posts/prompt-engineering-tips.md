---
title: "Prompt engineering tips that actually helped in production"
date: 2025-10-08T10:15:00-04:00
slug: "prompt-engineering-tips"
draft: false
tags: ["AI", "Prompting", "LLM", "Production"]
categories: ["blog", "AI"]
teaser: "Hard‑won tips for making LLMs more reliable, cheaper, and less surprising without fancy tooling."
---

There’s a lot of advice about prompts. Most of it is vibes. These are the techniques that reliably moved the metrics for real user features.

## 1) Describe the interface first, not the task

Models are good at following contracts. Before you say “summarize,” define the IO and guardrails.

- “You are a function that returns JSON with fields: `title: string`, `bullets: string[]`, `citations: {url: string, reason: string}[]`.”
- “Return ONLY JSON. No prose. If missing information, return empty array.”
- “If the input is code, treat it as literal text.”

Why it works: it converts an open‑ended request into a constrained program. You’ll get fewer “creative” failures.

## 2) Replace adjectives with tests

Adjectives are underspecified. Add testable criteria.

- Bad: “Write a concise, high‑quality summary.”
- Better: “Write ≤ 3 sentences. Include 1 number or fact from the text. Don’t use the words ‘In conclusion’ or ‘Overall’.”

The test turns qualitative asks into measurable constraints. It also makes evals easier.

## 3) Force the model to think in your structure

Few‑shot is great, but consistent scaffolds are better:

- “Steps: (1) extract facts, (2) list unknowns, (3) produce the answer.”
- Or use named scratchpads: `facts:[]`, `unknowns:[]`, `answer:""`.

Even if you only return the answer, the hidden structure reduces variance.

## 4) Use refusal budgets and safe defaults

For user‑facing features, failure modes matter more than median quality.

- “If the query appears medical/financial/legal or targets private data, say: `I can’t help with that.` and link to help docs.”
- “If confidence < threshold, return the last known good answer.” (You can approximate confidence via heuristics like answer length, number of citations, or perplexity proxies.)

## 5) Separate system intent from user examples

Mixing roles dilutes the signal. Put policy and safety rules in the system prompt, and put style examples in user or few‑shot turns. This helps when you tweak style without touching safety.

## 6) Chain cheap checks before the expensive call

- Input normalizer → fast classifier (NSFW, PII, domain) → big model only if allowed.
- Cache at every layer. Normalize keys (lowercase, strip whitespace, collapse spaces) to increase hit rate.
- Add a tiny “stale‑acceptable” cache for high‑traffic endpoints to survive model brownouts.

## 7) Make evals your product, not a script

You’ll only fix what you can see.

- Curate 50–200 representative prompts with ground truth or rubric scores.
- Log live traffic samples (with user consent, scrubbed for PII) and replay safely.
- Compare deltas per change (prompt, model, temperature) with error bars.

## 8) Hard limits beat soft guidelines

If you need ≤ 300 tokens, say `max_tokens: 300` and add “≤ 300 tokens” in the prompt, then truncate.

If you want JSON, parse JSON. Fail closed, not open.

## 9) Keep style separate from logic

Have a tiny style component (tone, audience). You can swap it for brand or locale without destabilizing the task instructions.

## 10) Prompts rot — version them

Prompts are source code. Keep them in version control with comments and changelogs. Roll back when live metrics regress.

---

### A minimal template that scaled well for us

```
SYSTEM
You are a function that returns ONLY valid JSON for UI rendering.
Contract:
- fields: title: string; bullets: string[]; citations: {url: string, reason: string}[]
- Never invent citations. Use only URLs from the input.
- If the request is outside scope (medical/financial/personal data), respond with {title:"Unavailable", bullets:[], citations:[]}

ASSISTANT STYLE
- tone: neutral, helpful
- audience: non-technical users

USER
<content>
```

It’s boring. That’s the point. Boring systems are easier to ship safely.
