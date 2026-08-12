# now

## State as of this run (2026-08-12, ~111h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-fetched (assignment-1.json): still asks for one interactive idea, static/
client-side, deployed to Pages, with process evidence weighted 45% and
"response to the brief" 35%. Confirmed the exact HD bar for response by
fetching the assignment page directly (the assessment overview page doesn't
carry it): **"a pointed, surprising answer to the provocation, scoped with
judgement: one idea, carried all the way."** P band explicitly includes "an
answer without a point of view" as a failure mode --- worth re-reading that
exact line again in the finishing run, not just remembering it secondhand.

Still well outside 24h: another **deepen** run, continuing the prior run's
prose-sharpening thread rather than starting a new direction. The prior
hand-off flagged two passages as unreviewed with fresh eyes since the
project's early commits: the lede and the "Try it" intro. Rather than
re-reading them myself with already-loaded context, spawned a fresh
general-purpose agent with only the two passages, the HD bar text, and the
already-revised "Why the middle loses" opener as a register reference, and
asked it to critique blind.

Verdict, and it held up as a real finding, not a manufactured one: the lede
opened on a definition of "long context" before giving the reader a reason to
care, and its one genuinely counter-intuitive clause ("the longer the
context, the worse the burial") was buried as a subordinate clause rather
than framed as a reversal of the "more context = better" instinct --- the
same "buried in the middle of its own sentence" failure the prior run already
fixed in the "Why" section. The "Try it" intro cast the reader as a
spectator ("watch ... move") rather than telling them what each control was
for. Before adopting the proposed rewrite, checked its strongest claim
against the source rather than trusting it: "may as well not have been
supplied at all" for a mid-context fact. A web search on Liu et al.'s actual
reported numbers confirmed this is if anything an *understatement* --- the
paper reports GPT-3.5-turbo scoring *below* its closed-book (no-document-at-
all) baseline when the answer document sits mid-context, i.e. genuinely worse
than not supplying it, not merely equivalent. Rewrote both passages
(`6c144dc`), ran the full `pnpm check` (26/26, typecheck/build/lint clean),
and screenshotted both marking viewports in `agent-browser` --- both render
cleanly, no overflow or reflow from the length change. Grepped `spec/` and
`scripts/` first to confirm no test locked the old text. Pushed; `origin/main`
matches.

Did not touch the mechanic, model, or any other copy this run (h1, "Why the
middle loses", the caveat paragraph) --- those weren't in scope for this
pass and weren't re-reviewed.

## Single most important next action

Still not a finishing run --- ~111h were left at start of this one.

1. **If still meaningfully more than 24h left:** the interaction-bug
   checklist (two passes) and now two prose passes (why-section opener,
   lede + Try-it intro) are done. The remaining unreviewed copy is the h1,
   the caveat paragraph under "Why the middle loses", and the chart
   figcaption --- give those the same blind-fresh-eyes treatment (spawn an
   agent with just the passage + the HD bar text, don't self-review) *only
   if* there's still real time left; don't manufacture a third prose pass
   for its own sake if the copy already reads tight. If a pass turns up
   nothing real (agent says "these hold up, no rewrite"), that's a valid
   outcome --- don't force a change to justify the run. At that point pivot
   fully to drafting PROCESS.md content (below) as the more productive use
   of remaining pre-24h time, still without committing PROCESS.md itself.

2. **PROCESS.md moment candidates, drafted here so the finishing run can
   paste and refine rather than start cold** (400--600 words total, 3--4
   moments, each moment doing: what happened / what I did instead of the
   obvious thing / how I knew it was right / the citation). Re-read
   `spec/README.md` and this file's HD-bar text one more time before
   finalizing the pick --- the brief's own hint is that the strongest
   moments are ones where a correction landed in the *harness* (a rule, a
   check, a test) rather than a retry:

   - **(a) `9a95b1a`** --- a11y fix. What happened: axe-core against the
     *live* DOM (not jsdom) found `svg-img-alt`, "aria-labelledby references
     elements that do not exist" --- the chart's `innerHTML =` re-render on
     every drag was wiping the static `<title>`/`<desc>` some other markup
     pointed at. What I did instead of the obvious thing: rather than patch
     that one render call, re-emit title/desc inside the template string
     *and* added a jsdom regression test asserting they survive a render,
     so the class of bug can't silently return. How I knew it was right:
     re-ran the real-browser axe audit clean afterwards, not just the new
     unit test. This is the strongest harness-correction candidate --- it
     changed what future renders are checked against, not just this one.
   - **(b) `c009c90`** --- pre-JS static defaults. What happened: blocking
     `main.ts` with `agent-browser network route --abort` (this sandbox's
     only real proxy for "what a slow connection sees," no throttle command
     exists) showed the `<output>` elements and chart blank before JS ran.
     What I did instead of the obvious thing: rather than add a loading
     spinner or placeholder, made the static HTML defaults *compute-correct*
     for the sliders' own default attribute values, so first paint is
     already right. How I knew it was right: reloaded with the same route
     block and read real numbers instead of blanks.
   - **(c) `cdd57e9`** --- deleting a test that asserted the wrong domain
     claim. What happened: a passing test named "is symmetric around the
     middle" encoded an assumption from the first draft, never checked
     against Liu et al.'s real figures. A web search on the actual paper
     showed primacy beats recency --- asymmetric, not a clean U. What I did
     instead of the obvious thing: deleted and rewrote the test to assert
     the verified asymmetry, rather than leaving a green-but-wrong test in
     place; changed the model to match. How I knew it was right: the new
     test would have failed against the old (wrong) model. Good candidate
     for the retro half specifically --- it's a caught-false-claim story.
   - **(d) `0dd2315`** + **`461fd2d`** --- drag affordance. What happened:
     the page's own lede said "Drag it around" from the first commit, but
     the only control was ever a range slider --- caught only by actually
     trying to drag the row in `agent-browser`, not by reading the markup.
     What I did instead of the obvious thing: wired real pointer drag rather
     than weakening the copy to match the slider, then wrote the lesson into
     `CLAUDE.md` ("treat any second-person imperative in a page's own copy as
     a claim to physically test") so it's a standing check, not a one-off
     fix. How I knew it was right: `window.scrollY` unchanged across a
     simulated mobile drag test, `touch-action: none` verified needed.
   - Weaker candidate, mention only if the retro specifically wants a
     response-to-brief moment rather than a harness-correction one:
     **(e) `80bc89e` + `6c144dc`** (this run) --- the two prose-sharpening
     passes, each triggered by spawning a fresh-eyes reviewer rather than
     re-reading with accumulated context, and each rewrite fact-checked
     against the cited paper before adopting (found the "worse than
     closed-book" result this run, which is *stronger* than what shipped).
     This is a real technique (deliberately de-biasing self-review via a
     blind subagent, verifying claims before trusting a subagent's rewrite)
     but it's a quality pass, not a caught contradiction like (a)--(d).

   Recommended pick for the actual PROCESS.md: (a), (b), (c), (d) --- four
   harness-correction moments, in commit order. Use (c) or (d) as the retro
   answer if the crit-03 retro reads this same file, since both have a clear
   before/after and a named mechanism.

3. **Once genuinely inside the last ~24h:** the finishing-steps pass in one
   run --- write `PROCESS.md` from the drafted moments above (trim to
   400--600 words, cite as commit-hash links to the real GitHub repo URL,
   not the placeholder), write `reflections/assignment-1.md` (150--300
   words, doubles as the crit-03 retro entry per doctrine's `related` field
   pointing at `crits/03-a1-retro`), `/ship`, and verify the *live* Pages
   URL at both viewports, not just local `vite preview`.

4. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
