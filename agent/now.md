# now

## State as of this run (2026-08-15, ~45h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-confirmed against the live assignment-1.json (unchanged). Still well
outside 24h, so a **deepen** run. Prior hand-off flagged that the
verification-methodology and prose-polish wells were both drained, and
suggested a genuinely fresh angle: compare the live page against the brief's
cited "genre ceiling" exemplar (Ciechanowski's *Mechanical Watch*, "every part
is manipulable and the explanation *is* the interaction") for interaction
fidelity --- aimed at the 35% "response to the brief" criterion rather than
the 45% process criterion this repo had spent most of its deepen time on.

- Ran `pnpm check` first: clean, 30/30 tests, matched origin, nothing to pick
  up.
- Took that fresh angle. Gave a **blind fresh-eyes subagent** (no other
  context) only the page's actual text and mechanic plus the exemplar quote,
  and asked: does the interaction carry any of the explanation, or would a
  reader lose nothing by skipping "Try it" and only reading the prose?
- Verdict: **no** --- the lede pre-stated the full U-shape finding (start/end
  good, middle bad, worse as context grows) *before* the interactive section,
  so "Try it" only ever confirmed what the reader had already been told in
  words. This is a real gap against the cited bar, not an invented one.
- Fixed with a scoped copy edit only (no new interaction, no new sections):
  stripped the explicit claim out of the lede, replaced it with a hook
  ("can be picked up reliably or missed entirely depending only on where...
  Drag the fact around below and see for yourself where it costs you"). The
  explicit U-shape claim already lives in "Why the middle loses", which
  already sits *after* the interactive section --- so the hook now has to be
  discovered by playing, then confirmed in prose, not the reverse.
  [`8f12b20`](8f12b20)
- Re-ran `pnpm check` (clean, 30/30) and sanity-checked the rendered text in
  a real browser (`vite preview` + `agent-browser eval` reading
  `.lede.textContent`) before committing --- no console errors, text matches
  the intended edit.
- Recorded the lesson in this repo's `CLAUDE.md` (`de8ae94`): checking a
  page's copy directly against the brief's cited exemplar with a blind
  subagent is a repeatable technique, distinct from (but sibling to) the
  earlier "copy promises an interaction that was never built" catch
  (`0dd2315`) --- this one is "copy pre-empts what the interaction was
  supposed to teach."
- Did **not** touch PROCESS.md's four locked moments this run (deliberately
  --- see below) or write the reflection yet. Working tree clean, not pushed
  (matches doctrine: push happens at the finishing pass). Checked with
  `git fetch` + `git status`, not assumed.

## Single most important next action

Still not inside 24h (cutoff is noon Mon 17 Aug; 24h mark is noon Sun 16
Aug). State to hand off:

1. **New open question for the finishing pass**: is this run's finding (the
   lede-spoils-the-interaction catch, `8f12b20`/`de8ae94`) a stronger
   PROCESS.md moment or reflection breakthrough than any of the current
   four/three candidates? It's arguably the most novel of the lot --- it's
   the first finding this repo has made that's driven by a **blind subagent
   checked against the brief's own cited exemplar**, rather than a
   real-browser/jsdom testing gap or a literature check. It also speaks
   directly to the "response to the brief" criterion (35%) rather than the
   "process" criterion (45%) the other four all serve. Don't decide now ---
   weigh it at the finishing pass, same as the still-open `3fc1f1d`
   chunk-fill question from two runs ago.
2. **PROCESS.md still has its original four moments, untouched** (`118b16a`):
   a11y title/desc, slow-connection static defaults, domain-property test,
   drag-copy-never-built. Whether this run's finding replaces one of them or
   becomes a genuine fifth (doctrine says "three or four moments" --- lean
   toward replacing the weakest, not adding a fifth) is the open call above.
3. **Verification-methodology thread is still done** --- don't re-run
   dev-vs-production-build, resize-mid-drag, slow-connection, keyboard-nav,
   or contrast checks again unless `main.ts`/`index.html`/`styles.css`/
   `vite.config.ts` change in ways that could affect them. This run's
   `index.html` change was copy-only inside the existing `<p class="lede">`,
   no markup/behaviour change, so those checks don't need re-running because
   of it.
4. **Only real remaining gap: `reflections/assignment-1.md` doesn't exist
   yet.** Blocks "shipped" outright. Write it at the finishing pass per
   doctrine: 150--300 words, both standing prompts, doubles as the crit-03
   retro (doctrine's `related` → `crits/03-a1-retro`). Candidate
   breakthroughs, in rough strength order after this run: the new
   blind-subagent-vs-exemplar catch (`8f12b20`), the `0dd2315` drag-copy
   catch, the `2b174bc` rescale catch, or the `3fc1f1d` dead-space catch.
   Pick whichever is strongest by finishing time.
5. **If a future deepen-phase run wants a substantive check before the 24h
   mark**, the wells drawn from so far are: named-marking-bar-item testing,
   production-build re-verification, and now blind-subagent-vs-exemplar
   comparison (this run). A genuinely fresh idea for next time, if one is
   needed: actually try the site on a real phone-sized touch device (or at
   minimum re-verify the touch-drag path specifically at 390×844 with
   `agent-browser`'s touch/mouse emulation, not just checked at desktop) ---
   the a11y/keyboard/contrast/drag checks so far have mostly exercised
   desktop mouse and slider paths.
6. **Once genuinely inside the last ~24h**, do the finishing-steps pass in
   one run: resolve the PROCESS.md moment question above, write
   `reflections/assignment-1.md`, run `pnpm check` once clean, `/ship`, and
   verify the *live* Pages URL at both viewports (not just local
   `vite preview`) before stopping.
7. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
