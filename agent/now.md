# now

## State as of this run (2026-08-15, ~52h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-confirmed against the live assignment-1.json (unchanged). Still well
outside 24h, so a **deepen** run. Prior hand-off had flagged that another
prose-review pass would be ritual and pointed at re-testing a named,
untested marking-bar item instead --- this run picked "verify against the
actual production build, not just the dev server" as the fresh angle, since
doctrine's own verify step distinguishes them and no run had done it yet.

- Ran `pnpm check` first: clean, 30/30 tests, matches origin, nothing to
  pick up.
- Built `dist/` and served it with `vite preview` (port 4173), then drove it
  with `agent-browser` at both marking viewports: tab order (nav link →
  lede citation link → length slider → position slider → explainer citation
  link, no trap), full reload state (defaults correct, matching the static
  HTML fallback), and the mid-drag resize check from last run (start a drag
  at 1920x1080, resize to 390x844 without releasing, keep moving). All held
  up against the real build. No console errors in the preview server log.
- **First attempt at the resize-mid-drag re-check gave a false pass**: I
  hand-built `PointerEvent`s and dispatched them via
  `document.dispatchEvent`/`window.dispatchEvent`. These don't route through
  `chunks.setPointerCapture(pointerId)`, so the `pointermove` listener on
  `#chunks` never actually fired --- the readout just held whatever the
  initial real `pointerdown` had set, and it looked like a passing check
  (no error, plausible chunk number) until I compared it against the
  coordinates I'd actually moved to. Redid it with `agent-browser mouse move
  <x> <y>` / `mouse down` / `mouse up` (real synthetic input, not
  constructed-and-dispatched events) and got the expected chunk indices at
  every step. **No site bug** --- the mid-drag resize genuinely holds, this
  was a testing-methodology trap, not a product defect.
- Recorded the trap in global `MEMORY.md` (environment quirks: any
  `setPointerCapture`-based drag must be tested with `agent-browser mouse
  ...`, not a constructed `PointerEvent`) and in this repo's `CLAUDE.md`
  lessons (`2a4954c`), since a future run (here or elsewhere) could otherwise
  trust a similarly-broken synthetic-event test and miss a real regression.
- Working tree clean, pushed... no --- **not pushed**, matches doctrine
  (repo stays private, push happens at the finishing pass). Checked with
  `git fetch` + `git status`, not assumed.

## Single most important next action

Still not inside 24h (cutoff is noon Mon 17 Aug; 24h mark is noon Sun 16
Aug). State to hand off:

1. **PROCESS.md is done** (`118b16a`, four moments) and still current --- this
   run found no new site bug, so there's no fifth candidate moment to weigh
   in. The one open question from last run (whether the `3fc1f1d` chunk-fill
   catch should swap in for one of the four) is still open and still belongs
   at the finishing pass, not before.
2. **Prose-review thread is done. Verification-methodology thread (dev
   server vs. production build; resize-mid-drag; slow connection; keyboard
   nav; a11y contrast in both themes) is now also done** --- all of it has
   been checked against the real production build, not just dev. Don't
   re-run any of these again unless `main.ts`/`index.html`/`styles.css`/
   `vite.config.ts` change.
3. **Only real remaining gap: `reflections/assignment-1.md` doesn't exist
   yet.** Blocks "shipped" outright. Write it at the finishing pass per
   doctrine: 150--300 words, both standing prompts, doubles as the crit-03
   retro (doctrine's `related` → `crits/03-a1-retro`). Candidate
   breakthroughs to frame it around, in rough strength order: the `0dd2315`
   drag-copy catch (copy promised an interaction that was never built,
   caught by literally trying it), the `2b174bc` rescale catch (a claim
   about behaviour checked after the action, not just after initial
   render), or the `3fc1f1d` dead-space catch (measuring filled-vs-container
   geometry at more than one configuration). Pick whichever ends up as
   PROCESS.md's strongest moment by finishing time.
4. **If a future deepen-phase run wants a substantive check before the 24h
   mark**, the well I've been drawing from twice now (named-marking-bar-item
   testing) and once more (production-build re-verification) both look
   drained --- everything the marker's own described process names (open at
   both viewports, use the interaction, resize mid-use, tab through) has now
   been tested against the actual built artefact. A genuinely fresh
   deepen-phase idea for the next run, if one is needed before 24h: compare
   the live page directly against the brief's cited "genre ceiling"
   exemplar (Ciechanowski's *Mechanical Watch*, "every part is manipulable
   and the explanation *is* the interaction") for scope/interaction fidelity
   --- a design comparison, not another verification pass, aimed at the 35%
   "response to the brief" criterion rather than the 45% process criterion
   this repo has spent most of its deepen time on so far.
5. **Once genuinely inside the last ~24h**, do the finishing-steps pass in
   one run: write `reflections/assignment-1.md`, run `pnpm check` once
   clean, `/ship`, and verify the *live* Pages URL at both viewports (not
   just local `vite preview`) before stopping.
6. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
