# now

## State as of this run (2026-08-12, ~117h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-fetched and unchanged. Still well outside 24h: a **deepen** run, and this
time it actually changed code rather than re-running the exhausted
interaction-bug checklist, per the prior hand-off's own instruction not to.

Took the prior run's flagged tension seriously: two successive skeptical
passes had exhausted interaction-level bugs (keyboard, resize-mid-drag,
console errors, light/dark a11y, 200% zoom, links, citation accuracy,
curve-shape accuracy, drag-affordance-matches-copy). The next lever was prose
sharpness against the "response to the brief" HD band, which explicitly wants
"pointed, surprising", not merely correct.

Re-read "Why the middle loses" fresh (not from having written it): the truly
counter-intuitive claim --- that handing a model *more* context can make it
*worse* at using the one fact that matters, which cuts directly against the
common RAG/long-context instinct to just retrieve more --- was present but
buried mid-sentence as a mechanism detail ("...dropped sharply for documents
placed in the middle --- worse still as more documents were added"). Rewrote
the section's opening two sentences to lead with that as the provocation
before the attention-mechanism explanation, rather than after it (`80bc89e`).
Checked no test locks that paragraph's exact text first (`grep` across
`spec/`, none). Ran the full `pnpm check` (26/26 tests, typecheck, build,
lint all green), `linkinator` against a fresh build (4/4), and screenshotted
both marking viewports in `agent-browser` to confirm the longer paragraph
doesn't break layout at either --- it doesn't, reads cleanly at both. Pushed
(`80bc89e`); `origin/main` now matches.

Did not touch the mechanic, the model, or scope --- this was a pure copy edit
in service of "one idea, carried all the way," not a new idea.

## Single most important next action

Still not a finishing run --- ~117h were left at start of this one. Next run(s):

1. If still meaningfully more than 24h left: the interaction-bug checklist and
   now one prose pass are both done. Before doing another prose pass on
   spec, re-read the *rest* of the copy with the same fresh-eyes standard
   applied to "Why the middle loses" this run --- specifically the lede and
   the "Try it" intro paragraph --- rather than assuming they're already
   optimal because no one has flagged them. If they hold up, the remaining
   lever is likely the **process evidence** getting built early rather than
   left to the last 24h: start drafting `PROCESS.md` moment candidates now
   (see list below) so the finishing run isn't rushed, without committing the
   file yet (the doctrine's finishing steps are for inside 24h).
2. Once genuinely inside the last ~24h, do the finishing-steps pass in one
   run: `PROCESS.md` (400--600 words, **3--4 moments**, not a template count
   --- re-read `spec/README.md` and the assignment JSON's "What you submit"
   section first, and note the JSON's own hint: "the strongest moments are
   the ones where a correction landed in the harness... rather than a
   retry"). Strong candidates now in the history: (a) the a11y fix at the
   render level (`9a95b1a`); (b) the pre-JS fallback fix (`c009c90`); (c) the
   asymmetric-curve fix (`cdd57e9`) --- required deleting a test asserting
   the wrong contract; (d) the drag-affordance fix (`0dd2315`) plus the
   CLAUDE.md lessons commit (`461fd2d`); (e) this run's prose-sharpening
   commit (`80bc89e`) is weaker evidence of *harness* correction than (a)--(d)
   --- it's a quality pass, not a caught contradiction --- so prefer (a)--(d)
   unless the retro specifically wants a response-to-brief moment. Pick 3--4,
   not all of them. Then write `reflections/assignment-1.md` (150--300 words,
   doubles as the week 4 retro entry per doctrine), `/ship`, and verify the
   *live* Pages URL at both viewports, not just local `vite preview`.
3. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
