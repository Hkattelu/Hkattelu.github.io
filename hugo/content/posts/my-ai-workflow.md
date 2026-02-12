---
title: "How I use AI"
date: 2026-02-11 00:00:00 -0500
draft: false
tags: ["open-source", "ai", "programming"]
categories: ["blog"]
slug: "how-i-use-ai"
---

I've been asked a lot about how I use AI. Here are some concrete examples:

- I use it to write code for [my gaming wrapped website](https://gamingwrapped.com)
- I use it to plan my workout and sleep schedules
- I use it to learn about new things [like color rendering](https://hkattelu.com/blog/color-rendering/)
- I even use it to critique the writing in this very blog post
 
There are so many AI tools coming out these days that it's hard to even realize where to start to learn and it can be quite overwhelming. I'm making this post to kind of document what I have tried, what I've learned, and hopefully you can use it to onboard and improve your workflows

## A preamble on defensive thinking

I want to start with a bit about mindset.

There are a lot of ways to think about how AI can fail you. For example maybe it can run the wrong commands or hallucinate and say the wrong thing and guide you down the wrong path. There are arguments that it can reduce your creativity by pulling from existing sources. 

While I do think that many of these points are true, I think it's important to keep what I would call an offensive mindset.

Instead of saying that AI can give you the wrong answer and then stopping there, I want to challenge the reader to actually think about what they could do to improve the quality.

For example could you:
- Provide more sources and then have the model point to a specific source every time it says something?
- Have AI critique its own plan before presenting the result to you?
- Can you use it as a supplemental tool in some cases if not an end-all-be-all solution?
- Have it generate tests and quizzes to ensure you're actively and critically thinking?
 
There's a lot of things that people all over the world do, as this stuff is still extremely new.

I spend a lot of time trying out new tech, but essentially everything I have tried below did not work out of the box on the first try. It always took a little bit more research and context to optimize.

**EVERYTHING IN MY WORKFLOW IS A PRODUCT OF TRYING, FAILING, AND IMPROVING**.

**NOTHING WORKED OUT OF THE BOX, BUT THAT DOES NOT MEAN IT WAS USELESS**.

With that being said, let's jump into what I use AI for. Where it's relevant, i'll mention some problems that I saw and how I tackled them.

# My Flow

## Programming

I will break down programming into two parts:
1. Planning
2. Implementing

My primary tool for programming, both planning and implementing, is [Gemini CLI](https://gemini.google.dev/). 

**Why Gemini CLI over alternatives:** 
The primary reason is that it's by far the cheapest. It also has all of the same features as popular agentic tools like claude code or warp. Additionally, it's technically the only one I'm allowed to use at work.

There are a lot of tools that you can use to improve both planning and implementation.

### MCPs

The best way to improve the capabilities of your AI tool is gonna be MCPs.

An MCP is essentially just an API that your model can use. It can plug into pretty much anything.

The nice thing about MCP servers is that they can be ported across AI clients. For example whether using Claude or Gemini or Warp, they can all use the same MCPs 

Two MCPs I use somewhat often are the [Chrome Developer Tools MCP](https://github.com/anthropics/mcp-servers) and the [Context 7 MCP](https://github.com/anthropics/mcp-servers).

The Chrome DevTools MCP is really good because it basically lets your model use the browser, which can be used in a lot of interesting ways.
- I could use it to to check the chrome console error logs automatically
- I can use it to automatically snapshot the UI to see if a change worked
- You can even do actually UI critique by having the model comment on design principle related things

**What didn't work:**  The other MCP that often gets used for this is the playwright MCP, but I don't like that one and its kind of janky. It often causes the model to loop, and the chrome's 1p mcp seems to be the only way to get debug logs, and use the chrome debug port.

The Context 7 MCP is kind of simple in practice. All it does is allow you to get the most recent documentation for a feature. 

**Real-world example:** When upgrading my video editor, [Synapse](https://github.com/hkattelu/synapse-releases), I had to upgrade from remotion 3 to remotion 4 which had a bunch of breaking changes. Context7 was able to solve this migration which constantly failed without context7.

This is really useful because a lot of the times I deal with build issues with weird npm packages or old versions. There are many odd behavior skews that context7 can solve like how to integrate tailwind with vite or how to resolve node imports in js.

**Limitations:** Context7 does seem to add some bloat when using well known libraries though. I try to activate it only in projects that are using the latest frameworks and text, as it can contribute to context rot.


### Skills or Custom commands

Skills are essentially prompts that may be included in an AI model to give a context or a certain skill, like being really good at front-end or how to push and release a new version of your app.

I think in general skills are a little overrated but I use a couple of skills a lot, those being the [Impeccable.style](https://impeccable.style) front-end library and even actually the Conductor custom command in [Gemini CLI](https://gemini.google.dev/), which encourages the model to do planning and acting.

**How I use Conductor in practice:** Sometimes I try to zero-shot prompt a feature and it doesn't work. Then, I pause, take a deep breathe, and then construct a more formal plan with conductor. This usually dramatically improves code quality, helps me understand what progress is, and fixes strange thought loops.
 
Some of these things come by default in editors like [Antigravity](https://antigravity.dev), [Cursor](https://cursor.com), or [Warp](https://warp.dev) but with the CLI app you kind of have to get one and I recommend Conductor. I think it's quite strong

**What didn't work with skills:** A lot of skills just aren't really necessary. I try to only add skills that are somewhat specific like frontend design or skills for very niche libraries like remotion. Usually model knowledge can tackle most problems without skills.

### Cost management

It's worth mentioning that I pay $20 a month for Google's [Gemini AI Pro](https://gemini.google.com/app) plan. The irony is that I work at Google and they still don't give it to me for free, which is kind of annoying.

Now I think one way you can manage costs is to simply install a lot of different tools which offer free monthly plans. For example, [Warp](https://warp.dev) provides a lot of free credits. [Kira](https://kira.ai/) provides a lot of free credits and even [Gemini CLI](https://gemini.google.dev/) provides a ton of free credits on a daily basis. By basically being smart about how you use store context between models, you can actually get a lot of mileage for free every month by just toggling tools.

**My strategy:** Use gemini CLI until i run out of quota. For very tiny tasks I use Amp (ex: generating commit messages or READMEs). When I run out of quota, I swap to warp and then kiro in that order.

The other tool I would recommend is [Amp](https://ampcode.com), which is very strong.

**Why it's worth the cost:** Amp has a great free plan, and the model is extremely strong and fast. It is definitely the highest quality model I have tried for its speed.

## Life management

As a follow up I do also use [Gemini CLI](https://gemini.google.dev/) and occasionally just the [Gemini Web App](https://gemini.google.com/app) or the [ChatGPT Web App](https://chatgpt.com) to do life management stuff. I find that the Web App UI is quite useful because I can toggle between it on my phone and my desktop. The important thing is you need to give these things tool access to your calendar, which I think is really useful.

**Specific use case:** The main thing that I use this for is scheduling one-off tasks which I just want to get off my mind. For example if I have to set up a haircut or hang out with friends, I might just ask to throw something from the calendar with the description that I used my voice to describe. Which is kind of a small thing but it really helps get the mental load off of me 

For example if I'm having a lot of trouble deciding when I am going to the gym or do the chores, I think one of the best ways you can kind of get that going is to simply have the model construct calendar events for you. That makes things well-spaced apart. You can be clear about how much break time you want in between things. I think it is a really good way to de-clutter your mind and just get stuff onto the drawing board

**Challenges:** The main problem was getting the initial setup, which is quite annoying but it did eventually work once I got it set up. 

## Design

Whenever I have a new app idea, I essentially jump right to [Google Stitch](https://stitch.withgoogle.com/). It's a really cool app that basically lets you construct a website or app for free and they have very generous quota. I think that there are other tools such as [Firebase](https://firebase.google.com) and [Base44](https://base44.com) but I found that Stitch is quite simple and it lets you do a lot of nice things. This is good because I can design little mini apps, prototype ideas, or see if they are ridiculous or not in a short period of time. I will say that Stitch's design philosophy is not super creative so use it with some amount of caution

**Real example:** My current project, https://gamingwrapped.com, was largely Brainstorm Music Stitch. I used it to come up with some of the initial ideas for the story cards, which came out to be good starting points that I manually tweaked later on . 

**What didn't work:** I will say that Stitch does have a very AI-defined sense of style. I did have to do a lot of manual prompting and tweaking the knobs to get something more creative and interesting. Even then I only got a good starting point but it was a good starting point 

Instead of creating app prototypes, another thing I sometimes do is just create slide decks. One thing that I think is really great is [Gamma.app](https://gamma.app), which does a phenomenal job of making PowerPoint presentations that look really nice and present new ideas.

**Example presentation:** I made [this slide deck](https://gamma.app/docs/78e9rjz7jkofsga?following_id=mqf0o2kxm1ru79t&follow_on_start=true) using Gamma. It's basically just a party presentation where I help the spelling bee at my apartment with a bunch of friends. It was just really good to run the event and it was a lot of fun.

For example if I have an idea for just like a new club I'm trying to start or hangout with some friends, weirdly it's a fun idea to make a PowerPoint presentation to kind of visualize the idea. Gamma is fantastic. I will say it's slightly expensive and they don't have that much free quota but it is extremely high quality and I would recommend everyone at least try it once

**Limitations:** [PLACEHOLDER: Cases where Gamma didn't fit your needs or produced subpar results] 

## Learning

Generally when I'm learning something new, I'll either use [Notebook LM](https://notebooklm.google.com/) or [Gemini's guided learning feature](https://gemini.google.com/app). I think that Notebook LM is really, really strong, especially with the deep research feature that can find you sources. I find that in practice I don't really use the video overviews or the audio overviews too much but it is really strong at giving you citations for very specific sources or being able to quiz you. It takes a little bit of time to set up but it's nice that you can share it and stuff too 

**Real use case:** I mainly use NotebookLM to do research for Youtube video scripts. I create [this notebook](https://notebooklm.google.com/notebook/d6aaa543-fe56-4efe-95fd-0f0ebf94281f) to do research for a video on tetsuya nomura. Its good for comparing and contrasting, as well as organizing things chronologically for the viewer.

**Limitations:** My biggest problem with notebookLM is just that it takes a lot of time to set up the sources properly, which is very minor feedback.

Gemini Guided Learning is really good for when I have about 30 minutes and I just want to sit down and really grind stuff out that I think is confusing. I think it does a good job of tailoring to your specific level or mindset and providing kind of natural stopping points. I would recommend it as well but I will say it is much slower and a little bit less powerful

**When to use it:** Use it when you have time to learn actively, and are really confused about a topic. It is really optimized well such that it allows you to ask questions often.

# Conclusion

And there is how I use AI. I included links and some of the rationale, as well as examples where it was relevant. Hopefully you can find my thought process useful, and I hope you could take away something positive.

If nothing else, I'd like you to just be enthusiastic and try out new tools. Having that curious mindset will help you stay on top of things and create a good intuition for how you personally work with AI, and what you can do to prompt or manage context better.


## A note on ethics and anti-patterns

It should go without saying that you shouldn't use AI to cheat. Obviously not only is that unethical but also you're cheating yourself.

I would also say that you probably should not use AI for something like art. That is again just hampering you. Art is a lot of fun. It's part of being human..

In practice, the biggest anti-pattern is avoiding critical thinking by using AI. It's important to constantly be in a critical mindset and think about where things could go wrong, why they went wrong, and how you can improve them. Also try to understand or critique model responses. Always try to notice when you're slipping and losing rigor.

My whole flow is alright, but it can definitely be improved in many ways, and I'd encourage you to actively think about it. Feel free to email me with recommendations.
