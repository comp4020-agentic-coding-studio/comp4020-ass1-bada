# MEMORY

Durable self-knowledge, curated run by run; ephemeral state belongs in
`now.md`, not here.

## Environment quirks (this sandbox)

- `mise`-shimmed `pnpm`/`node` fail with "config.local.toml ... not trusted"
  until `mise trust /home/ben/.config/mise/config.local.toml` is run once per
  environment. That file holds Ben's real API tokens — read it only to
  confirm it's the expected, pre-existing secrets file before trusting it,
  never copy its contents anywhere, especially not into a course repo.
  `corepack pnpm <cmd>` works as a fallback before trust is established, but
  only for the initial `pnpm install` — `corepack pnpm check` (or any script
  that shells out to bare `pnpm` internally, as this template's `check` does)
  fails with a version-mismatch error, because corepack won't switch pnpm
  versions mid-script once it's already invoked one. Once `mise trust` has
  run, drop `corepack` entirely and call plain `pnpm` for everything else.
  Confirmed in `comp4020-crit2-bada` week 3.
- `agent-browser` needs `agent-browser install` once (downloads Chrome), and
  every `agent-browser open` needs `--args "--no-sandbox"` — Chromium's
  zygote sandbox doesn't work in this container and the browser otherwise
  fails to launch at all.
- `agent-browser screenshot <path> --full` — the flag is `--full` (or `-f`),
  NOT `--full-page`. The wrong flag gets silently treated as a second
  positional arg, and a stray file literally named `--full-page` lands in
  the cwd. Check `git status` for it before the first commit of a session.
- `agent-browser open <url> --viewport WxH` is not a real flag — `open --help`
  doesn't list it, and passing it doesn't error, it's just silently ignored,
  so two screenshots taken "at" 1920×1080 and 390×844 came back byte-identical
  (both at whatever the default viewport was) until I diffed the file sizes
  and noticed. The real command is `agent-browser set viewport <w> <h>`, kept
  for the rest of the browser session. Confirmed in `comp4020-crit1-bada`
  week 2: always sanity-check a "different viewport" screenshot pair actually
  differs (dimensions or at least file size) before trusting it as evidence a
  layout was checked at both marking viewports.
- Ordering matters for the above: call `set viewport` *after* the first
  `agent-browser open --args "--no-sandbox"`, not before. With no page open
  yet, `set viewport` tries to launch its own throwaway browser without the
  sandbox flag and dies on the same zygote error as an unflagged `open`.
  Confirmed in `comp4020-crit1-bada` week 2, ~46.5h-to-cutoff verification
  run: `open` first, then `set viewport`, then `screenshot`.
- Re-running the full `pnpm check` locally (not just CI) needs `CHROME_PATH`
  exported to the `agent-browser`-downloaded Chrome, or the Lighthouse spec
  errors outright (`chrome-launcher` can't auto-detect a system Chrome that
  doesn't exist in this sandbox) rather than being skipped:
  `export CHROME_PATH=$(find ~/.agent-browser/browsers -maxdepth 2 -iname
  'chrome*' -type d | head -1)/chrome`. CI doesn't need this — it has a real
  system Chrome. Confirmed in `comp4020-crit1-bada` week 2.

## Repo-independent lessons

- stylelint-config-standard rejects BEM double-underscore class names
  (`selector-class-pattern` wants plain kebab-case) and flags a lower-
  specificity selector (e.g. bare `a`) that comes *after* a higher-specificity
  one targeting overlapping elements (`no-descending-specificity`) — write
  generic element rules before scoped/attribute-selector rules that touch the
  same elements, not after.
- Before trusting a commit message, run `git show --stat HEAD` (or check
  `git status --short` immediately before committing). A `git add` with a
  stale pathspec can silently stage far less than intended while the commit
  message you'd already drafted describes the full intended diff — the
  message and the diff can drift apart without any command erroring loudly.
  Caught this once in `comp4020-crit1-bada` week 1
  (`5fedd84` vs the corrective `bfd0d1c`); worth the extra `git show --stat`
  every time from now on, not just when something feels off.
- A visual layout that looks reasonable in the diff can still be wrong at the
  marking viewport — a 2-column CSS grid gallery had an ugly reflow gap next
  to a tall image that was only obvious from an actual `agent-browser`
  screenshot at 1920×1080, not from reading the CSS. Always screenshot at
  both marking viewports before calling a layout done, not just after
  finishing all the CSS.
- `agent-browser eval --stdin` accepts a multi-KB script via heredoc — piping
  a whole minified library (e.g. `axe-core/axe.min.js`) followed by an
  `(async () => { ...; return JSON.stringify(...); })()` IIFE is how to run a
  real accessibility audit in an actual browser from the CLI, when the
  library is too big for a plain `eval "<js>"` positional arg. `eval` awaits a
  returned promise automatically.
- axe-core's `color-contrast` rule can't resolve inside jsdom (no layout
  engine) — it reports `incomplete`, never pass/fail, especially behind any
  gradient/pattern background. An axe-in-jsdom test should assert zero
  *violations*, not zero `incomplete`; verify contrast separately, either a
  real-browser axe run (see the `agent-browser eval --stdin` trick above) or
  by hand via the WCAG relative-luminance formula. Also sanity-check any such
  harness against a deliberately broken fixture (missing `alt`, empty link)
  before trusting a clean result on the real site — confirmed useful in
  `comp4020-crit1-bada` week 1.
- A prior run's memory claiming work is "not yet pushed" can be stale — one
  run in `comp4020-crit1-bada` recorded that note, but the next run's
  `git fetch` + `git status` showed `origin/main` already matched `HEAD`
  exactly. `git status`'s "up to date" line only reflects the locally cached
  `refs/remotes/origin/*`, which doesn't update without a fetch — always
  `git fetch` before trusting any claim (including your own memory's) about
  what has or hasn't been pushed.
- Doctrine says a reflection is headed with the course source's *title*,
  never a week number, since week counts drift but the title doesn't — but
  `reflections/crit-1.md` sat headed "Week 1: the forgotten web" through
  several verification-only runs before one actually re-read the doctrine
  line against the file instead of just checking it existed and cited real
  commits. `pnpm check:evidence` only checks the filename and that citations
  resolve — it does not check the heading text, so this class of drift is
  invisible to the automated sensor and only catchable by re-reading the
  doctrine text against the file by hand. Fixed in `comp4020-crit1-bada`
  week 1 (`368d730`). Worth doing once per deliverable: re-read the doctrine's
  reflection rules against the actual reflection file, not just confirm the
  check passes — a repeated "screenshot + pnpm check" verification loop can
  run green for many cycles while missing a plain-text doctrine violation the
  tooling was never built to catch.
- Wiring a real Lighthouse check (`lighthouse` + `chrome-launcher` npm
  packages, serving `dist/` with vite's own `preview()` API): `chrome-launcher`
  auto-detects a system Chrome on Linux by running `which` for
  `google-chrome-stable`/`google-chrome`/`chromium-browser`/`chromium`, which
  GitHub's `ubuntu-latest` runner has preinstalled — no extra CI setup needed.
  This sandbox has no system Chrome, only `agent-browser`'s downloaded copy at
  `~/.agent-browser/browsers/chrome-*/chrome`; pass that as `chromePath` (or
  via `CHROME_PATH` env, which `chrome-launcher` also reads) for a local run,
  leave it unset for CI. Confirmed in `comp4020-crit1-bada` week 1: the first
  real run of the sensor failed on real SEO gaps (missing meta description,
  and — subtler — vite preview's SPA-style fallback answering a `/robots.txt`
  request with the `index.html` body, which Lighthouse then tried and failed
  to parse as robots syntax line by line). That before/after failure was
  itself the sanity-check that the sensor isn't a rubber stamp, cheaper than
  building a separate deliberately-broken fixture.
- A repo can be provisioned late enough that the normal week-long clock never
  applies — `comp4020-crit2-bada` opened with ~30 minutes of wall clock left
  before the crit itself, not 168 hours. What held up under that compression:
  picking a real target fast (a couple of `WebFetch` passes, not a deep
  crawl), building the smallest honest version of the brief rather than an
  ambitious one, running the check suite exactly once at the end rather than
  iteratively, and writing PROCESS.md/reflection content that names the one
  real judgement call made (here: refusing to fabricate opening hours two
  real sub-pages 404'd on) rather than padding out several. Confirmed in
  `comp4020-crit2-bada` week 3.
