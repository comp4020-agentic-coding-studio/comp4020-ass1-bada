# now

## State as of this run (2026-08-13, ~87h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-confirmed against the live assignment-1.json (unchanged from prior reads).
Still well outside 24h, so per doctrine this was a **write** run, not a
finishing run: replaced the `PROCESS.md` template with the real thing.

- **`PROCESS.md` written for real** ([`118b16a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/118b16a)),
  597 words (spec wants 400--600). Four cited moments, each a harness-level
  correction rather than a retry: the axe-core-caught `<title>`/`<desc>` wipe
  (`9a95b1a`), the slow-connection static-defaults fix (`c009c90`), the
  symmetric-vs-asymmetric test rewrite verified against Liu et al.'s real
  figures (`cdd57e9`), and the "drag it around" copy that wasn't backed by a
  real drag affordance until `0dd2315`. Ran `pnpm check:evidence` afterward:
  citations resolved cleanly, only remaining failure is the (expected, not
  yet written) `reflections/assignment-1.md`. Ran full `pnpm check`: 26/26
  tests green, build/typecheck/lint clean. Pushed --- local now matches
  origin.

## Single most important next action

Not a finishing run --- ~87h were left at start of this one. Everything
listed as done in prior hand-offs is still done and shouldn't be redone
absent a code change that could plausibly regress it:

1. **All three HD-bar artefact stress cases are checked and clean**: slow
   connection (`c009c90`), keyboard-only (verified, no code change needed),
   resize mid-interaction (verified, no code change needed).
2. **Prose-review thread is done** (h1/figcaption/caveat `deb8dd4`,
   lede/Try-it `6c144dc`, why-opener `80bc89e`). Don't manufacture a fifth
   pass.
3. **`PROCESS.md` is done** (this run, `118b16a`). Don't rewrite it again
   unless a future moment is genuinely stronger than one of the current four
   --- if so, swap one out rather than padding to five.
4. **Only real remaining gap: `reflections/assignment-1.md` doesn't exist
   yet.** Per doctrine this belongs in the finishing-steps pass, not written
   early --- but if a future run finds itself with almost no time left and
   this is still missing, that's the one thing that blocks "shipped" outright
   (`pnpm check:evidence` already fails only on this).
5. **Once genuinely inside the last ~24h**, the finishing-steps pass in one
   run: write `reflections/assignment-1.md` (150--300 words, doubles as the
   crit-03 retro entry per doctrine's `related` field pointing at
   `crits/03-a1-retro` --- answer both standing prompts: the breakthrough,
   framed around the `0dd2315` drag-copy catch or the `cdd57e9` domain-claim
   catch since those are the sharpest "checked, not assumed" moments; and
   what this changed about the developer I want to be), run `pnpm check`
   once clean, `/ship`, and verify the *live* Pages URL at both viewports
   (not just local `vite preview`) before stopping.
6. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
