# now

## State as of this run (2026-08-13, ~93h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
re-confirmed against the live assignment-1.json (unchanged from prior reads):
HD artefact bar reads "holds up under use it wasn't designed for: the
keyboard, a resize mid-interaction, a slow connection" --- slow-connection was
already done (`c009c90`); this run worked the other two.

Still well outside 24h: a **verify** run, no code changes. Ran `pnpm dev` +
`agent-browser` and checked both remaining HD-bar stress cases by hand:

- **Keyboard-only.** Tabbed through the page: nav link → lede link →
  `#length` slider → `#position` slider → next body link. The chunk row
  (`#chunks`, `role="img"`, no `tabindex`) is correctly skipped --- it's
  decorative to assistive tech, and the actual state (position, length) is
  fully keyboard-operable through the two native `<input type=range>`
  sliders regardless. Focused `#position`, pressed ArrowRight ×5: readout,
  highlighted chunk, and chart all updated in lockstep (position 0→5,
  "chunk 6 of 20", highlighted span index 5). Focused `#length`, ArrowLeft
  ×3: value 20→14 (step=2), both `output` bindings and the chunk count
  updated. No keyboard trap, no console errors. Verdict: this stress case
  already holds --- the pointer-drag on the row (`0dd2315`) is a redundant
  affordance layered on top of an already-fully-keyboard-accessible control,
  not a gap. Nothing to fix.
- **Resize mid-interaction.** Set state via the slider at 1920×1080
  (length=14, position=10), then resized live to 390×844 without reloading.
  Readout text, slider value, and chart width (352px, fits inside the 390px
  viewport) all held correctly across the resize; screenshotted
  (`/tmp/resize-mobile.png`, not committed --- scratch verification output)
  to confirm no visual overflow or reflow glitch. Verdict: also already
  holds. Nothing to fix.

Both were genuine "checked, found clean" outcomes --- the artefact already
meets this HD bullet on both counts, so no commit this run. Grepped for
existing coverage first (none of this was under test), and this was a
real-browser check, not something jsdom could have told us (no layout engine
for the resize case, and jsdom's synthetic KeyboardEvents don't reliably drive
native `<input type=range>` the way a real browser does).

## Single most important next action

Still not a finishing run --- ~93h were left at start of this one.

1. **All three HD-bar artefact stress cases are now checked**: slow
   connection (`c009c90`), keyboard-only (this run, clean), resize
   mid-interaction (this run, clean). Don't re-check these again absent a
   code change that could plausibly break one of them.
2. **Prose-review thread is also done** (h1/figcaption/caveat `deb8dd4`,
   lede/Try-it `6c144dc`, why-opener `80bc89e`). Don't manufacture a fifth
   pass.
3. **Best use of remaining outside-24h time**: start drafting `PROCESS.md`
   for real (400--600 words, 3--4 moments, per doctrine and the assignment
   spec's own emphasis on "a correction that landed in the harness rather
   than a retry"). Candidate moments already identified across prior
   hand-offs, in commit order:
   - `9a95b1a` --- real-browser axe-core audit caught an `innerHTML =`
     re-render silently deleting a static `<title>`/`<desc>` an
     `aria-labelledby` pointed at; fixed by re-emitting them every render,
     plus a jsdom regression test.
   - `c009c90` --- `agent-browser network route "**/main.ts" --abort"` found
     the pre-JS static state was blank/wrong; fixed by giving the static
     markup real computed defaults matching the sliders' own default values.
   - `cdd57e9` --- a test named after a domain property ("symmetric") was
     checked against the actual cited paper (Liu et al. 2023) via web search,
     found wrong (real effect is asymmetric primacy-over-recency), and
     rewritten rather than kept green.
   - `0dd2315` --- copy said "drag it around" for three commits before
     anyone actually tried dragging the row; fixed by wiring real pointer
     drag, with a CLAUDE.md rule added afterward about treating imperative
     copy as a claim to test.
   Repo for citations: `github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada`.
4. **Once genuinely inside the last ~24h**, the finishing-steps pass in one
   run: write `PROCESS.md` for real (draft above), write
   `reflections/assignment-1.md` (150--300 words, doubles as the crit-03
   retro entry per doctrine's `related` field pointing at
   `crits/03-a1-retro`), run `pnpm check` once clean, `/ship`, and verify the
   *live* Pages URL at both viewports (not just local `vite preview`) before
   stopping.
5. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
