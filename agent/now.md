# now

## State as of this run (2026-08-16 08:00 AEST, 28h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026.
Re-fetched `assignment-1.json`: brief, exemplars, and marking bands unchanged
from prior reads.

Prior run (39h mark) had already confirmed the verification-methodology well
was dry --- nothing fresh to check without a code change, and the touch-
dispatch idea was a confirmed dead end (recorded in `CLAUDE.md`). With no new
deepen work available and only ~4h of runway left before the doctrine's 24h
"finish" boundary, I judged it lower-risk to close out the one clear
remaining gap now rather than wait for the exact clock mark:

- **Wrote `reflections/assignment-1.md`** (287 words, both standing prompts).
  Breakthrough: the blind-subagent-vs-cited-exemplar catch on the lede
  (`8f12b20`) --- picked over the touch-dispatch/verification-methodology
  candidates because it's the one finding driven by checking the brief's own
  language (the *Mechanical Watch* ceiling quote) rather than a testing
  technique, so it speaks to "response to the brief" (35%) as well as
  process. What-it-changed: prose review as testable-claim-checking, not
  proofreading, tying back to the domain-property-test lesson (`cdd57e9`).
  This doubles as the crit-03 retro entry per doctrine; no second write
  needed. Commit `8e7c202`.
- **Resolved the open PROCESS.md question**: left its four moments
  (`118b16a`) untouched rather than swapping the lede-catch in. Reasoning:
  the current four are diverse failure modes (a11y bug, perf/slow-connection,
  domain-correctness test, copy-vs-build mismatch); adding the lede-catch
  would have meant two "copy" moments and no obvious weakest of the current
  four to cut. The lede-catch gets its full weight in the reflection instead,
  which is where the assignment brief specifically wants it (the retro
  reads the reflection, not PROCESS.md).
- **Ran `pnpm check`** (30/30 tests, typecheck/build/lint clean) and
  **`pnpm check:evidence`** (both reflection filename and all 4 PROCESS.md
  citations resolve) before committing --- both green.
- **Pushed** `8e7c202` to origin (`git fetch` confirmed matched after; not
  assumed).
- **Checked the live Pages URL**: `curl` on
  `https://comp4020-agentic-coding-studio.github.io/comp4020-ass1-bada/`
  returns 404. Expected, not a problem --- doctrine confirms CI/Pages stays
  skipped while the repo is private, and this repo hasn't shipped (gone
  public) yet. Don't read a 404 here as a bug until *after* the repo is
  public and a deploy has actually run.

## Single most important next action

Almost everything that doctrine calls a "finishing step" is now done early:
reflection written, PROCESS.md moments finalised, `pnpm check` +
`check:evidence` green, pushed. What's left, for the run that actually sits
inside the last 24h (24h mark is noon Sun 16 Aug 2026, ~4h after this run):

1. **Don't re-open the PROCESS.md/reflection content decision.** It's made;
   re-litigating it burns the little deepen-runway left for no reason.
2. **Once the repo has actually shipped (gone public) and Pages has deployed**,
   check the *live* URL at both marking viewports (1920×1080, 390×844) in
   `agent-browser` --- not just `vite preview` locally, which has already
   been checked repeatedly. This is the one check that genuinely cannot be
   done before shipping, so it's the one legitimate reason to open the
   browser again close to cutoff.
3. **If CI actually runs post-ship**, watch for the `check`/`deploy` jobs
   going green within the window before the crit sweep (fifteen minutes
   after cutoff) --- still running counts as not green.
4. **If a fresh code change happens between now and cutoff** (unlikely, the
   well is dry), re-run the relevant `agent-browser` check from the list
   already exhausted (a11y, resize-mid-drag, keyboard nav, slow-connection
   static defaults) rather than assuming it still holds.
5. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
