# now

## State as of this run (2026-08-10, ~165h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026, 20% of
the course, marked 45% process / 20% artefact / 35% response to brief. Brief:
"build an interactive explainer of something you think more people should know
or understand" --- one strong idea, one dataset or mechanic, nothing else,
static/client-side, deployed to GitHub Pages. This run landed early in the
week (165h out), so per doctrine this was a plan/build run, not a finishing
run --- no `PROCESS.md`, reflection, or `/ship` yet.

Repo was a fresh, untouched starter (one "Initial commit"). Picked the idea
and built a first working version in one pass:

**The idea:** the "lost in the middle" effect --- LLMs recall facts placed at
the start/end of a long context far more reliably than facts buried in the
middle, and it gets worse as context grows (Liu et al. 2023,
arXiv:2307.03172). Chose this specifically because it's genuine --- something
this very agent runs into every week, not a topic picked for novelty.

**The mechanic:** two range sliders (context length, position of the "key
fact") drive a live chunk-row visual and an SVG recall curve
(`accuracyForPosition`/`curveForLength` in `main.ts`). Deliberately labelled
the curve as a hand-tuned illustrative model of the paper's U-shape, not
reproduced numbers --- didn't have the paper's actual figures memorised
confidently enough to present them as real data, so said so in the page copy
instead of fabricating precision. That's a real candidate PROCESS.md moment
for later: the judgement call not to overclaim data I didn't have.

**Shipped this run:** `pnpm check` green (typecheck, build, oxlint,
stylelint, 22 vitest tests across `spec/invariants.test.ts` and the new
`spec/explainer.test.ts`, which unit-tests the recall model's shape and
DOM-tests the slider-to-page wiring via `setup(doc)` + JSDOM --- this is the
"visitor does something that changes what they see" test the spec line asks
for). `spec/starter.test.ts` deleted (starter page replaced). `linkinator`
4/4 links resolve. Used the `dataviz` skill before building the SVG chart:
single-series line so no legend needed, `--series-1` blue from the reference
palette, 2px line / ≥8px dot-with-surface-ring per the mark specs, light+dark
via `prefers-color-scheme`. Screenshotted via `agent-browser` at both
1920x1080 and 390x844 against `vite preview` --- both render cleanly, no
overflow, no layout breakage; also drove the position slider live in the
browser (not just in tests) and confirmed the chunk highlight, readout text,
and chart dot all move together. Committed in one commit
([`a14acb7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/a14acb7)),
pushed --- `git status` clean, `origin/main` == `HEAD`.

Stylelint's `no-descending-specificity` bit again exactly as documented in
`MEMORY.md` (a bare `a` rule placed after `nav a`) --- fixed by reordering,
no new lesson needed, existing note already covers it.

## Single most important next action

Not a finishing run yet --- 165h were left at start, plenty of runway. Next
run(s) should **deepen**, not restart:
1. Look at the built page with fresh eyes for the "one strong idea, nothing
   else" bar --- is the copy tight enough, does the explanation section pull
   its weight, does the interaction reward more than one slider-drag (e.g. is
   there a natural "aha" a visitor gets in the first 10 seconds)?
2. Consider whether the HD artefact band ("holds up under use it wasn't
   designed for: keyboard, resize mid-interaction, slow connection") is
   actually covered --- native `<input type=range>` gives keyboard for free,
   but resize-mid-interaction and a real accessibility pass (axe-core via
   `agent-browser eval --stdin`, per the existing MEMORY.md recipe) haven't
   been run against this build yet.
3. Once the build feels genuinely done, do the finishing-steps pass in one
   run: `PROCESS.md` (400--600 words, 3--4 moments --- the "didn't fabricate
   the paper's numbers" moment is one; look for 2-3 more, ideally ones where
   a correction landed in the harness, e.g. the spec test itself), rewrite
   `CLAUDE.md` with anything this repo's build taught that isn't already
   there, `reflections/assignment-1.md` (150-300 words, doubles as the week 4
   retro entry per doctrine --- needs a real, specific breakthrough, not
   generic), then `/ship` and verify the *live* Pages URL at both viewports,
   not just local `vite preview`.
4. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
