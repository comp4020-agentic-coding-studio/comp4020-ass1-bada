# now

## State as of this run (2026-08-11, ~148h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
unchanged from last run's read: "lost in the middle" explainer, two sliders
driving a chunk-row + SVG recall curve. Still well outside 24h, so this was
another **deepen** run --- worked the two candidates the previous hand-off
named.

1. **Citation accuracy check** --- fetched the actual Liu et al. 2023 abstract
   plus a web search on the paper's body (not just the abstract) and checked
   every claim in the "Why the middle loses" section against it: the U-shape,
   highest-at-edges/dropped-in-middle framing, "across several models" (the
   paper tests six model families), and "worse still as more documents were
   added" (the paper explicitly varies document count/context length and
   finds the effect compounds, confirmed via search --- the abstract alone
   doesn't say this, so it was worth checking the fuller record before either
   trusting or flagging it). Verdict: the site's claims hold up: no changes
   needed. Worth recording that "check the abstract" alone would have been
   too shallow here --- the one clause not covered by the abstract text
   turned out to be true anyway, just not abstract-supported.
2. **Slow-connection / pre-JS check** (the HD artefact band's third item) ---
   no native bandwidth throttle in this `agent-browser` build (checked
   `network --help`: only `route --abort`/`--body`, no delay), so used
   `network route "**/main.ts" --abort` as the proxy: whatever a visitor sees
   for however long the network takes to deliver `main.ts` is exactly what
   this shows permanently. Found a real gap: `<output>` elements were empty
   until `render()` ran, so first paint showed "Context length: chunks" (no
   number), "Position of the key fact: chunk" (no number), and a figcaption
   reading "a -chunk context" --- and the `#chunks` row and chart polyline/dot
   were both empty boxes. Not a layout break (the SVG viewBox and the empty
   `.chunks` padding meant no jank), but genuinely broken-looking text and two
   blank interactive areas.
   Fixed in [`c009c90`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/c009c90):
   gave the `<output>` elements, the `#chunks` row, the readout paragraph, and
   the chart's axis lines static defaults in `index.html` that exactly match
   what `render()` computes for the sliders' own default attribute values
   (length=20, position=0 → "Estimated recall at chunk 1 of 20: 87%"). JS
   still wipes and re-renders on load (`chunks.innerHTML = ""`,
   `svg.innerHTML = template`), so there's no drift risk between the static
   fallback and the live render --- confirmed by re-running the full flow with
   `main.ts` unblocked afterward (still renders 20 chunks, `pnpm check` green,
   23/23 tests) and screenshotting both the blocked-JS state and the normal
   mobile viewport (390×844) with JS running to check nothing regressed.
   This is a second HD-band item confirmed *live*, not assumed: the fix
   targeted the actual pre-JS DOM state, not a guess about what might be
   missing.

Both checks were verification-first: read the real paper record before either
trusting or correcting the copy, and blocked the real network request before
either trusting or fixing the fallback state. Neither found a change to make
blind --- the citation check found nothing to fix, the pre-JS check found a
real bug and fixed it with evidence before/after.

`pnpm check` green throughout (23 tests, unchanged from last run --- this
change didn't touch `main.ts` or add new test surface). Committed
([`c009c90`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/c009c90)),
pushed --- `git status` clean, `origin/main` == `HEAD`.

## Single most important next action

Still not a finishing run --- ~148h were left at start of this run, still
well outside the last 24h. Next run(s):

1. If there's still meaningfully more than 24h left, the HD-artefact band's
   candidates so far are all closed out (copy/interaction review, keyboard,
   resize mid-interaction, accessibility, slow connection, citation accuracy).
   Fresh candidates worth a look next: whether the explainer's framing itself
   could be sharpened (the brief rewards "a pointed, surprising answer...
   scoped with judgement" — is there a sharper hook than the current lede?),
   or a fresh look at whether the hand-tuned curve's *shape* (not just the
   caveat wording) actually tracks what the paper's real figures look like
   closely enough to be honest, since the caveat currently just asserts this
   without having been checked against the paper's actual accuracy-vs-position
   plot.
2. Once genuinely inside the last ~24h, do the finishing-steps pass in one
   run: `PROCESS.md` (400--600 words, **3--4 moments** per the assignment
   spec, not a template count --- re-read `spec/README.md` and the fetched
   assignment JSON's "What you submit" section again before writing it,
   since it specifically wants moments where a correction landed in the
   *harness* rather than a retry). Strong candidates already in the history:
   (a) the a11y fix at the render level (`9a95b1a`) --- axe caught what jsdom
   structurally couldn't; (b) this run's pre-JS fallback fix (`c009c90`) ---
   found by blocking the real network request, not by reading the diff; (c)
   the earlier "didn't fabricate the paper's numbers" caveat-writing decision
   (`a14acb7`) --- look for the actual commit/reasoning behind that if citing
   it. Then rewrite `CLAUDE.md` with anything this repo's build taught that
   isn't already there, write `reflections/assignment-1.md` (150--300 words,
   doubles as the week 4 retro entry per doctrine --- needs a real, specific
   breakthrough, and note the assignment JSON confirms this reflection *is*
   the week 4 retro entry, "there is nothing to write twice"), then `/ship`
   and verify the *live* Pages URL at both viewports, not just local `vite
   preview`.
3. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
