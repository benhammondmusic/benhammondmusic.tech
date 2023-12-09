export async function fetchRecentPosts() {
  const query = JSON.stringify({
    query: `{
					user(username: "benhammondmusic") {
						publication {
							posts(page: 0) {
								title
								coverImage
								slug
							}
						}
					}
        }`,
  });

  const response = await fetch("https://api.hashnode.com/", {
    method: "post",
    body: query,
    headers: {
      "Content-Type": "application/json",
    },
  });

   const jsonResponse = await response.json();
	 return jsonResponse.data.user.publication.posts
};