
# benhammondmusic.tech

Denver Developer && Song Builder

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b3d0a7f-fe2a-4273-adea-b125542c108f/deploy-status)](https://app.netlify.com/sites/benhammondtech/deploys)

## Stack

- [Astro](https://astro.build) with hybrid static/SSR output via Netlify adapter
- React islands for client-side interactivity (GitHub activity, blog posts, Libby reading history)
- Svelte islands for D3 data visualizations on the `/playground` page
- Tailwind CSS with custom design tokens
- Netlify Functions for runtime API routes (GitHub Events, Spotify, Upstash Redis, OpenLibrary)

## Features

- Live GitHub activity swim lanes (real-time, not build-time)
- Music data-viz playground: Spotify playlist analyzed with D3 - tempo distribution, artist breakdown, genre bubbles; cached in Upstash Redis
- Library reading history via Libby/Denver Public Library timeline
- Tech blog (Astro content collections)

[benhammondmusic.tech](https://benhammondmusic.tech)
