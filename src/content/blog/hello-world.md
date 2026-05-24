---
title: "Hello World"
description: "The blog has moved in-house. Posts are now markdown files committed directly to the repo."
pubDate: "2026-05-24"
---

The blog is now powered by Astro Content Collections — markdown files living right here in the repo, versioned with git, no external CMS required.

## What changed

Posts used to live on Hashnode and get pulled in at build time via GraphQL. That worked until Hashnode put their API behind a paid plan. Rather than pay for something I can do natively in Astro, I moved everything in-house.

## How it works

Each post is a `.md` file in `src/content/blog/`. Frontmatter covers the metadata (title, description, date, optional cover image), and everything below the `---` is the post body rendered with Tailwind's `prose` styles.

Publishing a post means:

1. Create `src/content/blog/my-post-title.md`
2. Add frontmatter and write the content
3. Commit and push — Netlify builds and deploys automatically

## What's next

More posts coming. The old Hashnode posts will get migrated over as markdown files when I get a chance.
