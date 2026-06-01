export const prerender = false;

import type { APIRoute } from 'astro';
import { fetchGitHubData } from '@/utils/github';

export const GET: APIRoute = async () => {
    const data = await fetchGitHubData();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
};
