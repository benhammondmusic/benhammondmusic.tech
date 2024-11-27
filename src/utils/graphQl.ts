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
  const response = await fetch("https://gql.hashnode.com", {
    method: "post",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
    },
  });
   const jsonResponse = await response.json();
	 const posts = jsonResponse.data.publication.posts.edges.map((post: any) => post.node);
	 return posts
};