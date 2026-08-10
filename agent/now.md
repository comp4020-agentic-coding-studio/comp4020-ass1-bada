# now

## State as of this run (2026-08-10, ~159h to cutoff, assignment 1)

`comp4020-ass1-bada` --- individual prototype, due noon Mon 17 Aug 2026. Brief
unchanged from last run's read: "lost in the middle" explainer, two sliders
driving a chunk-row + SVG recall curve. Still well outside 24h, so this was a
**deepen** run per doctrine --- no `PROCESS.md`/reflection/`/ship` yet, on
purpose.

Did the fresh-eyes + HD-band review the previous run's hand-off asked for:

1. **Copy/interaction review** --- read the built page again with fresh eyes
   against "one strong idea, nothing else." Verdict: holds up. Copy is tight,
   the explainer section pulls its weight (states the caveat plainly instead
   of padding), and the two-slider interaction gives a real 10-second aha ---
   confirmed live by moving the position slider from edge to middle in
   `agent-browser` and watching recall drop 87%→51% with the chunk highlight,
   readout, and chart dot all in sync. No changes made here; didn't want to
   fix what wasn't broken.
2. **HD artefact band** (keyboard, resize mid-interaction, accessibility):
   - Keyboard: native `<input type=range>` is focusable and arrow-key
     steppable, confirmed live (`agent-browser press ArrowRight` × 3 moved the
     slider and updated the readout). No work needed, but good to have
     actually driven it rather than assumed it from "it's a native input."
   - Resize mid-interaction: forced a viewport resize while a non-default
     slider position was set (`800×600` → `390×844`); the SVG chart (`width:
     100%; height: auto`) rescaled cleanly, no console errors, no layout
     break. Confirmed via screenshot.
   - Accessibility: ran a **real-browser** axe-core audit (`agent-browser
     eval --stdin` piping `axe.min.js` + an IIFE, per the existing MEMORY.md
     recipe) against the live dev page --- not just the jsdom spec tests,
     which can't see contrast at all. Found two real violations: (a)
     `renderChart`'s `svg.innerHTML = ...` was silently deleting the static
     `<title>`/`<desc>` the chart's `aria-labelledby` pointed at on every
     render (svg-img-alt violation); (b) light-mode `--series-1` (4.18:1) and
     `--text-muted` (3.4:1) both fell short of the 4.5:1 AA text-contrast
     minimum against `--page-plane` (dark mode already cleared both
     comfortably --- checked by hand with the WCAG relative-luminance
     formula). Fixed both: `main.ts` now re-emits title/desc inside the
     render template every time, `styles.css` darkened `--series-1` to
     `#1d5fb0` and `--text-muted` to `#6e6c66`, and added a jsdom regression
     test (`spec/explainer.test.ts`) asserting the title/desc survive a
     render. Re-ran axe after the fix: 0 violations, 0 incomplete, 36 passes
     (was 2 violations, 35 passes). `pnpm check` green throughout (23 tests
     now, was 22). Committed
     ([`9a95b1a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/9a95b1a)),
     pushed --- `git status` clean, `origin/main` == `HEAD`.

This is a strong PROCESS.md moment for later: a real bug (not a style nit)
that jsdom's spec tests structurally couldn't see, only found by actually
running an accessibility audit against the live DOM in a real browser, with
a before/after (2 violations → 0) as the verification. Also logged as a new
`MEMORY.md` repo-independent lesson (innerHTML-replaces-referenced-children
gotcha).

## Single most important next action

Still not a finishing run --- ~159h were left at start of this run, still
plenty of runway. Next run(s):

1. If there's still meaningfully more than 24h left, keep deepening rather
   than rushing to finish: candidates the last two runs haven't touched yet
   are a slow-connection check (the HD band's third item --- e.g. throttle
   and confirm nothing renders broken before JS loads) and a last close read
   of the "Why the middle loses" section's citation accuracy against the
   actual Liu et al. abstract.
2. Once genuinely inside the last ~24h, do the finishing-steps pass in one
   run: `PROCESS.md` (400--600 words, 3--4 moments --- the "didn't fabricate
   the paper's numbers" moment and this run's "axe caught a real a11y bug
   jsdom couldn't see, fixed at the render level not just the CSS" moment are
   two strong candidates; look for one more, e.g. anything in the git history
   with a harness-level fix rather than a retry), rewrite `CLAUDE.md` with
   anything this repo's build taught that isn't already there, write
   `reflections/assignment-1.md` (150--300 words, doubles as the week 4 retro
   entry per doctrine --- needs a real, specific breakthrough), then `/ship`
   and verify the *live* Pages URL at both viewports, not just local `vite
   preview`.
3. Don't touch `comp4020-crit2-bada` or any other sibling repo from inside
   this run --- only this deliverable's window is open right now.
