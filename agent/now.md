# now

## State as of this run (2026-08-13, ~100h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-confirmed against the live assignment-1.json (unchanged from prior reads):
HD response bar is **"a pointed, surprising answer to the provocation, scoped
with judgement: one idea, carried all the way,"** and process is 45% of the
mark with the harness-correction framing ("a rule added to CLAUDE.md, a check
wired up, an attempt thrown away ... beats a retry").

Still well outside 24h: another **deepen** run, closing out the prose-
sharpening thread. Spawned a fresh general-purpose agent with only the h1, the
caveat paragraph, and the chart figcaption --- plus the HD bar text and the
already-revised "Why the middle loses" opener as a register reference --- and
asked it to critique blind, same technique as the prior run's lede/Try-it
pass.

Verdict, and two of three were real findings:

- **h1/title** ("Bury it in the middle and the model won't find it") ---
  flagged as understating the actual finding: the fact isn't hard to *locate*,
  it's sitting right there in the prompt and the model still fails to use it.
  Adopted the agent's rewrite verbatim: "Put it in the middle. The model
  still has it. The model still misses it."
- **figcaption** --- flagged as purely functional, a wasted chance to point at
  the dip rather than just label the axes. Adopted a modified version of the
  agent's rewrite (its version dropped the live `<output>` bound to the
  length slider entirely, which would have silently lost a working
  live-updating mechanic rather than just weakened prose --- caught this by
  grepping `main.ts` for `length-value-2` before accepting the proposed text,
  not by re-reading the HTML alone). Kept the chunk-count binding, added
  "--- the dip is the effect."
- **caveat paragraph** --- agent said the substance already holds up (the
  asymmetry claim and "if you only get one edge, make it the start" are
  exactly the pointed, verified idea the page needs) and declined to force a
  rewrite there; only flagged the "A note on the numbers above:" lead-in as
  throat-clearing that delayed the real claim. Trimmed just that opener,
  left everything after untouched. This is the outcome the doctrine's own
  guidance anticipates --- "if a pass turns up nothing real, that's a valid
  outcome" --- applied to one of the three passages rather than the whole
  pass.

Grepped for any test or `spec/` file locking the old h1/figcaption/caveat
text before editing (none), ran `pnpm check` (26/26 clean), and screenshotted
both marking viewports in `agent-browser` --- both render cleanly, the
three-sentence h1 wraps fine at 390px with no overflow. Committed
(`deb8dd4`) with `git show --stat` checked against the message before
pushing; `origin/main` matches.

This closes out the prose-review thread flagged across the last several
hand-offs: why-section opener (`80bc89e`), lede + Try-it intro (`6c144dc`),
now h1 + figcaption + caveat opener (`deb8dd4`). Every major copy block on
the page has had at least one blind fresh-eyes pass. Did not touch the
mechanic, model, or any other structural element this run.

## Single most important next action

Still not a finishing run --- ~100h were left at start of this one.

1. **Prose-review thread is done.** Don't manufacture a fifth pass looking
   for problems that aren't there. If a future non-finishing run has real
   time to spend, better uses now are: rechecking the interaction against
   fresh edge cases (keyboard-only use of the drag mechanic hasn't been
   explicitly verified --- the HD artefact bar specifically calls out "the
   keyboard" as a stress case markers will try), or drafting/refining
   PROCESS.md content further (below) rather than re-litigating copy that's
   already been checked twice.
2. **Keyboard-only pass, if there's a slot for it before the finishing run:**
   the artefact HD band reads "holds up under use it wasn't designed for:
   the keyboard, a resize mid-interaction, a slow connection." The slow-
   connection case is done (`c009c90`), resize hasn't been deliberately
   tested (only two fixed viewports), keyboard-only interaction with the
   drag row specifically hasn't been verified at all --- the sliders are
   native `<input type=range>` so keyboard works for free, but the row's
   pointer-drag affordance (`0dd2315`) may have no keyboard equivalent. Check
   with `agent-browser` by tabbing to the chunk row and trying arrow keys;
   if there's no keyboard path to move the key fact, that's a real gap
   against the HD bar worth fixing before the finishing run, not after.
3. **PROCESS.md moment candidates are already drafted** (see git history of
   this file, or reconstruct from commits `9a95b1a`, `c009c90`, `cdd57e9`,
   `0dd2315` --- each a harness-correction moment: axe-live-DOM finding a
   template wipe bug + regression test added; network-block finding a blank
   pre-JS state + static defaults fixed; a web-search catching a wrong
   domain-property test + rewritten to the verified asymmetry; drag-copy
   claim caught by literally trying to drag + CLAUDE.md rule added).
   Recommended four for the actual `PROCESS.md`, in commit order: those four.
   Repo URL for citations: `github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada`.
4. **Once genuinely inside the last ~24h:** the finishing-steps pass in one
   run --- write `PROCESS.md` (400--600 words, 3--4 moments from the list
   above, real commit-hash links to the real GitHub repo), write
   `reflections/assignment-1.md` (150--300 words, doubles as the crit-03
   retro entry per doctrine's `related` field pointing at `crits/03-a1-retro`),
   `/ship`, and verify the *live* Pages URL at both viewports, not just local
   `vite preview`.
5. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
