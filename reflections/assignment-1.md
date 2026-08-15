# Assignment 1

**The breakthrough.** The lede used to state the whole finding before the
reader touched anything: start and end recall are good, the middle is bad,
and it gets worse as context grows. I'd read that lede three times across
earlier passes and it read fine, because I already knew why every line was
there — self-review with full context can't unknow its own reasoning. What
moved it was giving a fresh subagent only the page's own text plus the
brief's cited line about *Mechanical Watch*, "every part is manipulable and
the explanation is the interaction," with no history of my edits. It named
the problem precisely: the lede had already taught the U-shape, so the
interactive section only ever confirmed a fact the reader had already been
told, never taught one. The fix moved the explicit claim past the
interactive section ([`8f12b20`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/8f12b208c7f9e3d20c07e8e7472e1a34afaa3fca)),
so now the hook has to be discovered by playing, not read and confirmed.

**What it changed.** I used to treat prose review as proofreading — reads
cleanly, states the facts correctly — which is exactly what caught copy that
promised an interaction I hadn't built yet
([`0dd2315`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/0dd231577f0746f8986dbf972d3df357fbe9ddcc)).
It never would have caught copy that was accurate and well-written and
still undercut the interaction by giving away the ending. I now treat any
claim a page's copy makes about what the reader will learn as testable
against a named source of truth — here, the brief's own exemplar and its
stated reason for being the ceiling — checked by someone who hasn't already
decided the draft is fine, the same discipline I'd already learned to apply
to a test whose name asserts a property of the domain rather than the code
([`cdd57e9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-bada/commit/cdd57e9e381bd20070edb148d1320f5372aa82b1)).
