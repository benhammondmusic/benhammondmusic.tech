import { AtpAgent } from '@atproto/api';
import NodeCache from 'node-cache';

// Types based on the provided JSON structure
type BlueskyAuthor = {
	did: string;
	handle: string;
	displayName: string;
	avatar: string;
	viewer: object;
	labels: any[];
	createdAt: string;
};

type BlueskyEmbed = {
	$type: string;
	external?: {
		uri: string;
		title: string;
		description?: string;
		thumb?: string;
	};
	images?: Array<{
		alt: string;
		thumb: string;
	}>;
};

type BlueskyRecord = {
	$type: string;
	text: string;
	createdAt: string;
	embed?: BlueskyEmbed;
	facets?: any[];
	langs?: string[];
	reply?: object;
};

type BlueskyPost = {
	uri: string;
	cid: string;
	author: BlueskyAuthor;
	record: BlueskyRecord;
	embed?: BlueskyEmbed;
	replyCount: number;
	repostCount: number;
	likeCount: number;
	indexedAt: string;
	viewer: {
		repost?: string;
		threadMuted: boolean;
		embeddingDisabled: boolean;
	};
	labels: any[];
};

type BlueskyFeedItem = {
	post: BlueskyPost;
	reason?: {
		$type: string;
		by: BlueskyAuthor;
		indexedAt: string;
	};
	reply?: {
		root: {
			$type: string;
			uri: string;
			cid: string;
			author: BlueskyAuthor;
			record: BlueskyRecord;
			embed?: BlueskyEmbed;
			replyCount: number;
			repostCount: number;
			likeCount: number;
			indexedAt: string;
			viewer: object;
			labels: any[];
		};
		parent: {
			$type: string;
			uri: string;
			cid: string;
			author: object;
			record: object;
			replyCount: number;
			repostCount: number;
			likeCount: number;
			indexedAt: string;
			viewer: object;
			labels: any[];
		};
		grandparentAuthor?: BlueskyAuthor;
	};
};

type BlueskyResponse = {
	data: {
		feed: BlueskyFeedItem[];
	};
};

type PostOutput = {
	text: string;
	url: string;
	images?: Array<{
		alt: string;
		url: string;
	}>;
};

// Create a cache that stores results for 4 hours
const postCache = new NodeCache({ stdTTL: 14400 });

export function getProfileLink(): string {
	return `https://bsky.app/profile/${import.meta.env.ATP_HANDLE}`;
}

function getPostLink(post: BlueskyPost): string {
	return `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`;
}

export const fetchBlueskyStuff = async (): Promise<Response> => {
	try {
		// Check cache first
		const cachedPosts = postCache.get('bluesky_posts') as PostOutput[];
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
			limit: 5
		}) as unknown as BlueskyResponse;

		const posts = response.data.feed.map((item: BlueskyFeedItem): PostOutput => {

			// Transform image data if it exists
			const images = item.post.embed?.images?.map(img => ({
				alt: img.alt,
				url: img.thumb
			}));

			return {
				text: item?.post?.record?.text ?? '',
				url: getPostLink(item.post),
				...(images && images.length > 0 ? { images } : {})
			};
		});

		// Store in cache
		console.log('Storing Bluesky posts in cache');
		postCache.set('bluesky_posts', posts);

		return new Response(JSON.stringify(posts), {
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
