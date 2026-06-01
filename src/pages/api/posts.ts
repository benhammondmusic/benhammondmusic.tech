export const prerender = false;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
    const allPosts = await getCollection('blog');
    const recentPosts = allPosts
        .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf())
        .slice(0, 6)
        .map(post => ({
            slug: post.id.replace(/\.(md|mdx)$/, ''),
            title: post.data.title,
            imgSrc: post.data.imgSrc,
        }));
    return new Response(JSON.stringify(recentPosts), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
};
