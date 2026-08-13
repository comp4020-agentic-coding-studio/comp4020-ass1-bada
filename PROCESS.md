# Process overview

## What I built

A one-idea explainer of the "lost in the middle" effect: LLMs recall facts
planted at the start or end of a long context more reliably than facts buried
in its middle. Two sliders control context length and where the target fact
sits; a chunk row, a readout, and a small chart all update in lockstep so the
one mechanic — drag the fact around a context and watch retrieval odds
change — carries the whole page.

## The moments that mattered

**1. A static-HTML a11y annotation that a live render silently broke.**
`renderChart` rebuilt the whole SVG's `innerHTML` on every slider move,
quietly deleting the `<title>`/`<desc>` its `aria-labelledby` pointed at —
invisible to jsdom, which mounts a bare fixture, never the real page. A
real-browser `axe-core` run (`agent-browser eval --stdin`) caught it as
`svg-img-alt`, and the same run surfaced light-theme text under 4.5:1
contrast. Fixed by re-emitting the title/desc inside the template on every
render and darkening the failing colours, then added a jsdom regression test
asserting they survive a render — the harness now catches this itself.
[`9a95b1a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/9a95b1a5322663a6790f19f1a558ca79ca135603)

**2. Checking the slow-connection state instead of assuming JS covers it.**
Nothing forces a check of what a page shows before its script loads, so
skipping it was the easy default. Instead I used `agent-browser network
route "**/main.ts" --abort` to hold the page in its pre-JS state: the
sliders, readout, and chart showed blank interpolation ("Context length:
chunks") and empty boxes, not the default state a fast connection never
reveals. Fixed by giving the static HTML the same computed defaults
`render()` produces for the sliders' own default attribute values, so first
paint is already correct.
[`c009c90`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/c009c9023620384c9a49d04d8c0ca8226c0a9b27)

**3. A green test that encoded an unverified assumption about the domain.**
A spec test named "is symmetric around the middle of the context" passed
reliably, which made it easy to leave alone. But the name is a claim about
Liu et al.'s findings, not about my code, so I checked it against their real
figures via web search instead of trusting the first draft's
simplification — the true effect is an asymmetric primacy-over-recency U,
not a clean symmetric one. Rewrote the model and prose to match, and
replaced the test with one asserting the verified asymmetry rather than
patching it to keep passing the wrong claim. Confirmed live at both marking
viewports: start reads 87%, end reads 83%.
[`cdd57e9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/cdd57e9e381bd20070edb148d1320f5372aa82b1)

**4. Copy promising an interaction the markup never built.**
The lede said "Drag it around" from the first commit; the only control was
ever a range slider, and three prose-review passes read the markup and moved
on without trying to drag anything. Caught only by opening the live page in
`agent-browser` and attempting the literal action the copy described.
Rather than weakening the copy to match the slider, I wired real pointer
drag onto the chunk row (mouse and touch, `touch-action: none` so it doesn't
hijack scroll), kept the sliders as the keyboard/AT-accessible path, and
re-ran axe-core to confirm it stayed clean. Landed a `CLAUDE.md` rule
afterward treating any second-person imperative in a page's own copy as a
claim to physically test, not proofread — the correction is in the harness,
not just the one line of copy.
[`0dd2315`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/0dd231577f0746f8986dbf972d3df357fbe9ddcc)

## Before you ship

`pnpm check:evidence` confirms these citations resolve — it doesn't judge
whether the four moments above are the right four. Each is a case where the
obvious next step (accept the diff, patch the test, tighten the copy) would
have shipped something subtly wrong, and a real-browser or literature check
caught it first.
