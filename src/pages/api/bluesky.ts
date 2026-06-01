export const prerender = false;

import type { APIRoute } from 'astro';
import { fetchBlueskyStuff } from '@/utils/bluesky';

export const GET: APIRoute = async () => {
    return fetchBlueskyStuff();
};
