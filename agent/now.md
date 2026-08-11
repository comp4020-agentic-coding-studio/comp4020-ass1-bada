# now

## State as of this run (2026-08-11, ~135h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-fetched and unchanged. Still well outside 24h, so another **deepen** run.

Re-read `spec/README.md` and the assignment JSON's "How it's marked" table as
the prior hand-off asked, then actually opened the live dev server in
`agent-browser` at both marking viewports rather than judging the copy from
the diff alone. Found a real gap: the lede has said "Drag it around" since
the very first commit ([`a14acb7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/a14acb7)),
but the only control was ever a range slider --- there was never an actual
drag affordance, through several "closed out" interaction-review passes.

Fixed in [`0dd2315`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/0dd2315):
wired real pointer drag onto the chunk row itself (mouse + touch), pressing
and moving over it tracks the nearest chunk via a small pure function
(`indexOfNearestCenter`), kept the sliders as the keyboard/AT-accessible
path. Verified live: dragged end-to-end at 1920x1080 and confirmed the
slider/readout/chart all stay in sync; dragged at 390x844 and confirmed
`window.scrollY` didn't move during the drag (`touch-action: none` doing its
job); ran a real axe-core pass against the live DOM afterward --- zero
violations. `pnpm check` green, 26 tests (3 new: the pure function, a
DOM-level drag wiring test with stubbed `getBoundingClientRect`, since jsdom
never lays anything out).

Also closed a second gap noticed along the way: `CLAUDE.md` was still pure
boilerplate five commits in, despite real lessons already sitting in the
history (the innerHTML/a11y wipe, the pre-JS static-default fix, the
symmetric-curve test bug). Wrote them into a new "Lessons this prototype has
taught" section in [`461fd2d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/461fd2d)
rather than saving that for the finishing pass --- growing the harness as
lessons land, not backfilling it, is the point of the file. Committed and
pushed; `git status` clean, `origin/main` == `HEAD`.

## Single most important next action

Still not a finishing run --- ~135h were left at start. Next run(s):

1. If still meaningfully more than 24h left: the HD-artefact-band candidates
   are now genuinely thin on the ground (copy/interaction review --- and this
   run found the interaction review had actually missed something real, so
   it's worth one more skeptical pass rather than assuming the list is
   exhausted --- keyboard, resize mid-interaction, accessibility, slow
   connection, citation accuracy, curve-shape accuracy, and now the drag
   affordance matching its own copy). Worth checking: does the drag+slider
   combo still feel obvious to a first-time visitor with no instructions
   beyond the lede, or does it want a lighter-touch visual cue (e.g. a
   cursor-grab affordance is already there, but nothing hints "you can grab
   this" before the first hover)? Otherwise re-read `spec/README.md` and the
   assignment JSON's "How it's marked" table again before assuming there's
   nothing left in "response to the brief" (35%) or "process" (45%).
2. Once genuinely inside the last ~24h, do the finishing-steps pass in one
   run: `PROCESS.md` (400--600 words, **3--4 moments**, not a template count
   --- re-read `spec/README.md` and the assignment JSON's "What you submit"
   section first, since it specifically wants moments where a correction
   landed in the *harness* rather than a retry). Strong candidates now in the
   history: (a) the a11y fix at the render level (`9a95b1a`); (b) the pre-JS
   fallback fix (`c009c90`); (c) the asymmetric-curve fix (`cdd57e9`) ---
   required deleting a test asserting the wrong contract; (d) this run's
   drag-affordance fix (`0dd2315`) plus the CLAUDE.md lessons commit
   (`461fd2d`) --- a copy claim about the interaction that went unchecked for
   three commits, caught by actually using the page rather than reading the
   diff. Pick 3--4, not all of them. Then write
   `reflections/assignment-1.md` (150--300 words, doubles as the week 4 retro
   entry per doctrine), `/ship`, and verify the *live* Pages URL at both
   viewports, not just local `vite preview`.
3. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
