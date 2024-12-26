import { AtpAgent } from '@atproto/api';
import NodeCache from 'node-cache';

// Set prerender to false to disable prerendering
export const prerender = false

// Create a cache that stores results for 4 hours
const postCache = new NodeCache({ stdTTL: 14400 });

export function getProfileLink() {
	return `https://bsky.app/profile/${import.meta.env.ATP_HANDLE}`;
}

function getPostLink(post: any) {
	return `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`;
}


export const fetchBlueskyStuff = async () => {
	try {
		// Check cache first
		const cachedPosts = postCache.get('bluesky_posts');
		if (cachedPosts) {
			console.log('Returning cached Bluesky posts');
			return new Response(JSON.stringify(cachedPosts), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Create a Bluesky agent
		const agent = new AtpAgent({ service: 'https://bsky.social' });

		// Log in
		await agent.login({
			identifier: import.meta.env.ATP_HANDLE,
			password: import.meta.env.ATP_PASSWORD
		});

		// Fetch posts
		const response = await agent.getAuthorFeed({
			actor: import.meta.env.ATP_HANDLE,
			limit: 10
		});



		const texts = response.data.feed.map((item: any) => {
			return {
				text: item?.post?.record?.text,
				url: getPostLink(item.post)
			};
		});

		// Store in cache
		console.log('Storing Bluesky posts in cache');
		postCache.set('bluesky_posts', texts);

		return new Response(JSON.stringify(texts), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching Bluesky posts:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};