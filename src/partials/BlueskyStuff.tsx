import { AtpAgent } from '@atproto/api';
import NodeCache from 'node-cache';

// Create a cache that stores results for 4 hours
const postCache = new NodeCache({ stdTTL: 14400 });

export function getProfileLink() {
	return `https://bsky.app/profile/${import.meta.env.ATP_HANDLE}`;
}

function getPostLink(post: any) {
	return `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`;
}

type ImageRef = {
	alt: string;
	url: string;
};

type PostItem = {
	text: string;
	url: string;
	images?: ImageRef[];
	likeCount: number;
	repostCount: number;
	replyCount: number;
	timestamp: string;
	author: {
		handle: string;
		displayName: string;
		avatar: string;
	};
};

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

		const posts: PostItem[] = response.data.feed.map((item: any) => {
			const post = item.post;
			const images = post.embed?.images?.map((img: any) => ({
				alt: img.alt,
				url: img.fullsize
			})) || [];

			return {
				text: post.record.text,
				url: getPostLink(post),
				images,
				likeCount: post.likeCount || 0,
				repostCount: post.repostCount || 0,
				replyCount: post.replyCount || 0,
				timestamp: new Date(post.indexedAt).toLocaleDateString(),
				author: {
					handle: post.author.handle,
					displayName: post.author.displayName || post.author.handle,
					avatar: post.author.avatar || ''
				}
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

import { GradientText, Section } from "@/astro-boilerplate-components";
import { Heart, Repeat, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

function BlueskyStuff() {
	const [blueSkyPosts, setBlueSkyPosts] = useState<PostItem[]>([]);

	useEffect(() => {
		const loadPosts = async () => {
			const response = await fetchBlueskyStuff();
			const posts = await response.json();
			setBlueSkyPosts(posts);
		};

		loadPosts();
	}, []);

	return (
		<Section
			title={
				<div className="font-rubik">
					Bluesky <GradientText>Feed</GradientText>
				</div>
			}
		>
			<div className="flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blueSkyPosts?.map((post, index) => (
						<a
							key={index}
							href={post.url}
							target="_blank"
							rel="noopener noreferrer"
							className="block group"
						>
							<div className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
								{/* Author Header */}
								<div className="flex items-center p-4 border-b border-gray-200">
									<img
										src={post.author.avatar || '/api/placeholder/40/40'}
										alt={post.author.displayName}
										className="w-10 h-10 rounded-full"
									/>
									<div className="ml-3">
										<p className="font-medium text-gray-900">{post.author.displayName}</p>
										<p className="text-sm text-gray-500">@{post.author.handle}</p>
									</div>
								</div>

								{/* Post Content */}
								<div className="p-4">
									<p className="text-gray-900 mb-4">{post.text}</p>

									{/* Images Grid */}
									{post.images && post.images.length > 0 && (
										<div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' :
												post.images.length === 2 ? 'grid-cols-2' :
													'grid-cols-2'
											}`}>
											{post.images.map((img, imgIndex) => (
												<img
													key={imgIndex}
													src={img.url}
													alt={img.alt}
													className="w-full h-48 object-cover rounded-md"
												/>
											))}
										</div>
									)}

									{/* Engagement Stats */}
									<div className="flex items-center justify-between text-gray-500 text-sm mt-4">
										<div className="flex items-center space-x-2">
											<Heart className="w-4 h-4" />
											<span>{post.likeCount}</span>
										</div>
										<div className="flex items-center space-x-2">
											<Repeat className="w-4 h-4" />
											<span>{post.repostCount}</span>
										</div>
										<div className="flex items-center space-x-2">
											<MessageCircle className="w-4 h-4" />
											<span>{post.replyCount}</span>
										</div>
										<span className="text-gray-400">{post.timestamp}</span>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>

				<div className="flex justify-end text-xs text-white">
					<a
						href={getProfileLink()}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline hover:text-benhammondyellow"
					>
						@benhammondmusic.tech 🦋
					</a>
				</div>
			</div>
		</Section>
	);
}

export { BlueskyStuff };