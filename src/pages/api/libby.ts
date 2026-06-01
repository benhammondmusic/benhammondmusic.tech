export const prerender = false;

import type { APIRoute } from 'astro';
import { fetchLibbyTimeline } from '@/utils/libby';

export const GET: APIRoute = async () => {
    const data = await fetchLibbyTimeline();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
};
