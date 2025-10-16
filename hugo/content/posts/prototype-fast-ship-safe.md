---
title: "Prototype fast, ship safe"
date: 2025-09-08T10:00:00-04:00
slug: "prototype-fast-ship-safe"
draft: false
tags: ["AI", "Product", "Prototyping", "Reliability"]
categories: ["blog", "AI"]
teaser: "In an AI upgrade cycle, the teams that win prototype quickly — and know exactly how to make it safe before launch."
---

Every quarter the toolbox changes—new models, new knobs, new caveats. I’ve learned to bias for speed early, then turn that speed into something I’m not afraid to ship.

On day one I build the smallest possible vertical: one path, one data source, one user action. It’s ugly, but it has logs, flags, and a metric or two so people can react to a working thing instead of a slide. I keep the code disposable because the point is to test a behavior, not design a framework.

Once it’s interesting, I evaluate it like a product. Define success you can measure this week (CTR, task completion, a simple rubric), compare to a baseline, and keep a small eval set that actually looks like the real traffic. Decisions get clearer when numbers show up.

Guardrails come next and they’re not optional: refusals for sensitive inputs, rate limits and timeouts, circuit breakers for flaky dependencies, and two caches (a product cache for repeats and a tiny stale‑OK cache for outages). Also, a clean kill switch. Moving fast only works if you can stop fast.

If a prototype earns its keep, I harden just the parts that survived. Separate the prompt/policy layer from app logic and style. Turn one‑off scripts into versioned components with changelogs. Write down ownership and on‑call basics (alerts, playbooks). Iteration speeds up when you reduce surprise.

Culturally, I try to celebrate the boring launch: the one that didn’t page anyone and quietly moved the metric. That’s speed on purpose.

A small checklist I actually use:

- [ ] Scope is one flow, one persona
- [ ] Logs + metrics from day one
- [ ] Eval set + baseline deltas
- [ ] Guardrails: refusals, limits, cache, kill switch
- [ ] Rollout plan in the PR
- [ ] Ownership + runbook + bake time

The tech will keep changing. The feedback loop is the product.
