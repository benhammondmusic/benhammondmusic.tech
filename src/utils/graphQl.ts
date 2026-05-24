
export async function fetchRecentPosts() {
	const query = `
	query Publication {
		publication(host: "blog.benhammondmusic.tech") {
			isTeam
			title
			posts(first: 6) {
				edges {
					node {
						title
						coverImage {
							url
						}
						slug
					}
				}
			}
		}
	}
	`
	try {
		const response = await fetch("https://gql.hashnode.com", {
			method: "post",
			body: JSON.stringify({ query }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			console.error(`Hashnode API returned ${response.status}`);
			return [];
		}

		const contentType = response.headers.get('content-type') || '';
		if (!contentType.includes('application/json')) {
			const text = await response.text();
			console.error(`Expected JSON from Hashnode but got ${contentType}: ${text.slice(0, 300)}`);
			return [];
		}

		const jsonResponse = await response.json();
		const posts = jsonResponse.data.publication?.posts.edges.map((post: any) => post.node);
		return posts ?? [];
	} catch (error) {
		console.error('Error fetching recent posts:', error);
		return [];
	}
};