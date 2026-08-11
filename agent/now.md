# now

## State as of this run (2026-08-11, ~141h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-fetched and unchanged. Still well outside 24h, so another **deepen** run
--- closed out the last open candidate from the prior hand-off: whether the
hand-tuned recall curve's *shape* (not just the caveat wording) actually
tracks the paper's real accuracy-vs-position figure.

Web search on Liu et al.'s actual figures (not just the abstract) showed the
U is **asymmetric**: accuracy is highest with the relevant document at the
very start (primacy), nearly as high but measurably lower at the very end
(recency), and worst in the middle. The site's model (`accuracyForPosition`
in `main.ts`) was a perfectly symmetric parabola --- and `spec/explainer.test.ts`
had a test literally named "is symmetric around the middle of the context"
asserting that as a contract. That test encoded the bug, not a simplification
worth keeping.

Fixed in [`cdd57e9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/cdd57e9):
added a smooth `recencyDiscount` factor (full strength at the start,
tempered ~10% at the end, no effect at the exact middle where the U already
bottoms at 0) so the curve keeps its single dip but the two edges are no
longer equal. Replaced the symmetry test with one asserting
`accuracyForPosition(0, length) > accuracyForPosition(length-1, length)`.
Sharpened both the "Why the middle loses" paragraph and the caveat paragraph
in `index.html` to name the asymmetry explicitly ("highest... at the very
start..., nearly as high at the very end") without fabricating a specific
number the paper doesn't give. Verified live in `agent-browser` at both
marking viewports (1920×1080 and 390×844): position=0 reads 87%, position=19
(end of a 20-chunk context) reads 83%, chart visibly shows the right edge
sitting a touch lower than the left. `pnpm check` green throughout (still 23
tests --- one test rewritten, none added/removed). Committed and pushed;
`git status` clean, `origin/main` == `HEAD`.

This is a good harness-level correction candidate for `PROCESS.md` later:
the fix required *throwing away* a test that had been asserting the wrong
contract, not just editing the implementation to pass it.

## Single most important next action

Still not a finishing run --- ~141h were left at start, well outside the
last 24h. Next run(s):

1. If still meaningfully more than 24h left: the HD-artefact band's
   candidates are now all closed out (copy/interaction review, keyboard,
   resize mid-interaction, accessibility, slow connection, citation
   accuracy, and now curve-shape accuracy against the paper's real figures).
   A fresh angle worth a look: whether the explainer's *framing/hook* itself
   could be sharper per the brief's "pointed, surprising answer... scoped
   with judgement" — is there a stronger lede than the current one, or a
   genre choice (per the exemplars list) that would carry the idea further?
   Otherwise this repo may be close to done well ahead of schedule --- worth
   explicitly re-reading `spec/README.md` and the assignment JSON's "How
   it's marked" table again next run to check nothing in "response to the
   brief" (35% weight) is still thin before assuming there's nothing left to
   deepen.
2. Once genuinely inside the last ~24h, do the finishing-steps pass in one
   run: `PROCESS.md` (400--600 words, **3--4 moments**, not a template
   count --- re-read `spec/README.md` and the assignment JSON's "What you
   submit" section again first, since it specifically wants moments where a
   correction landed in the *harness* rather than a retry). Strong
   candidates already in the history: (a) the a11y fix at the render level
   (`9a95b1a`) --- axe caught what jsdom structurally couldn't; (b) the
   pre-JS fallback fix (`c009c90`) --- found by blocking the real network
   request, not by reading the diff; (c) this run's asymmetric-curve fix
   (`cdd57e9`) --- required deleting a test that had been asserting the
   wrong contract, the clearest "thrown away, not retried" moment so far;
   (d) the earlier "didn't fabricate the paper's numbers" caveat-writing
   decision (`a14acb7`) if still worth citing. Then rewrite `CLAUDE.md` with
   anything this repo's build taught that isn't already there, write
   `reflections/assignment-1.md` (150--300 words, doubles as the week 4
   retro entry per doctrine), then `/ship` and verify the *live* Pages URL
   at both viewports, not just local `vite preview`.
3. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
