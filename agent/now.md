# now

## State as of this run (2026-08-14, ~63h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-confirmed against the live assignment-1.json (unchanged from prior reads).
Still well outside 24h, so a **deepen** run --- but the prior hand-off had
already flagged that a repeat blind-fresh-eyes prose pass or another
verification-only pass would be ritual, not signal. Instead this run went
looking for one specific unchecked gap named in the marking bar itself:
"resize mid-interaction" (HD band, working-deployed-artefact criterion) had
never been tested.

- Ran `pnpm check` first: clean, 30/30 tests. Confirmed no drift since last
  run's `2b174bc`/`1f52ec4`.
- Live-browser resize-mid-drag check (start a pointer drag at 1920x1080,
  resize to 390x844 mid-drag without releasing, keep moving the pointer):
  held up fine --- `setPositionFromPointer` recomputes chunk centers from the
  live DOM on every move, so it was never actually at risk. No bug there.
- **But that check surfaced a different, real bug while measuring the chunk
  row's geometry**: `.chunk` had a fixed `width: 12px` inside a `flex` row
  with no `flex-grow`, so the row was far narrower than its bordered
  container --- only ~46% filled at the default length (20), and only ~11%
  filled at the minimum length (4). Any drag/click landing in that empty 89%
  silently snapped to the last chunk instead of responding proportionally.
  The maths (`indexOfNearestCenter`) was always correct given the real chunk
  centers; the DOM just didn't fill the box it looked like it should. This
  had survived every prior screenshot/verification pass because those all
  looked at the default length (20, ~46% filled --- visible but not alarming)
  and never measured filled-vs-container width at the extremes.
  - Fixed: `.chunk { flex: 1 1 0; min-width: 8px; ... }` replaces the fixed
    `width: 12px` (`3fc1f1d`). Verified: filled width now ~627/640px (98%) at
    every length from 4 to 40; drag now maps proportionally (checked 0/25/50/
    75/100% of the row → chunk 0/4/9/15/19 of 20); both marking viewports
    screenshotted and look correct; `pnpm check` green after the fix (30/30).
  - Recorded in this repo's `CLAUDE.md` lessons section and in the global
    `MEMORY.md` (repo-independent: measure filled-extent vs. container-extent
    at more than one configuration before trusting a proportional drag/click
    surface, not just the default).
- Working tree clean after commit, matches origin locally (not yet pushed ---
  doctrine says push at the finishing pass, repo stays private until then).
  `git fetch` + `git status` both checked, not assumed.

## Single most important next action

Still ~63h out at the start of this run, so **not** the finishing pass yet.
State to hand off:

1. **PROCESS.md is done** (`118b16a`, four moments) but now slightly stale:
   it doesn't cite this run's chunk-fill fix (`3fc1f1d`). Worth deciding, at
   the finishing pass, whether this bug-catch (found by testing a *different*
   named marking-bar item, not by re-reading prose) is strong enough to swap
   in for one of the four existing moments --- it's a genuine
   harness-level catch (measuring geometry across configurations, not just at
   default), which is exactly the HD-band distinction the process criterion
   rewards. Don't just bolt on a fifth moment; the spec caps it at three or
   four.
2. **Prose-review thread is done.** Don't manufacture another pass.
3. **This run's specific findings**: resize-mid-drag holds (checked, no bug);
   chunk-row dead-space bug found and fixed. Don't re-run either check next
   run unless `main.ts`/`index.html`/`styles.css` change again.
4. **Only real remaining gap: `reflections/assignment-1.md` doesn't exist
   yet.** This is the one thing that blocks "shipped" outright if a run finds
   itself close to the 24h mark with it still missing.
5. **Once genuinely inside the last ~24h**, do the finishing-steps pass in
   one run: write `reflections/assignment-1.md` (150--300 words, doubles as
   the crit-03 retro entry per doctrine's `related` field pointing at
   `crits/03-a1-retro` --- answer both standing prompts: the breakthrough,
   framed around whichever catch ends up strongest in PROCESS.md by then
   --- candidates are the `0dd2315` drag-copy catch, the `2b174bc` rescale
   catch, or this run's `3fc1f1d` dead-space catch, all "checked real
   behaviour against a claim, not just the markup/maths" moments; and what
   this changed about the developer I want to be), run `pnpm check` once
   clean, `/ship`, and verify the *live* Pages URL at both viewports (not
   just local `vite preview` or dev server) before stopping.
6. If a future run wants a substantive deepen-phase pass before that point,
   the pattern that worked twice now is: pick one specific named item from
   the marking bar that hasn't been tested yet (this run: resize
   mid-interaction) and go test it for real in `agent-browser`, rather than
   re-running a prior check or doing another prose pass. Check what's
   already been tested (this file's history) before picking the next one.
7. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
