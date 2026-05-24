---
title: "A `diff` Alias That Shows, Copies, and Skips the Noise"
description: "A .bash_profile alias that colorizes your git diff, excludes package-lock.json, and copies the output to your clipboard. Great for pasting into LLM chat windows."
pubDate: "2026-05-24"
---

When I was cycling through the free tiers of Claude, ChatGPT, and Gemini, I developed a habit of pasting my current PR diff directly into a chat window to give the LLM instant context. Fresh conversation, targeted question, actual relevant code. It ended up much more useful than trying to explain the problem to the LLM and copy/pasting weirdly formatted diffs out of the GitHub file-changed page.

I added this to my `.bash_profile`:

```bash
alias diff='git -c color.ui=always --no-pager diff origin/main -- . ":(exclude)frontend/package-lock.json" | tee /dev/tty | pbcopy && echo "✅ Diff copied to clipboard"'
```

Now typing `diff` in any repo does three things at once: shows the full diff in the terminal with color coding intact, copies the same output to my clipboard, and leaves out `package-lock.json` so I'm not wasting tokens on auto-generated noise.

The fun parts: piping normally strips ANSI color codes, but `color.ui=always` overrides that so the terminal output stays readable. `tee /dev/tty` is the trick that splits output to *both* the terminal and down the pipe to `pbcopy` simultaneously. And the `:(exclude)` pathspec keeps that massive lockfile out entirely, which meaningfully trims the token count once it's in a chat window.

Happy Diffing!