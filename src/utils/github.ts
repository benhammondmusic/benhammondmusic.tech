import { Octokit } from "octokit";

export async function fetchGitHubData() {
    try {
        const token = import.meta.env.GH_STATS_TOKEN;

        const octokit = new Octokit({
            auth: token,
        });

				// https://api.github.com/users/benhammondmusic/events

        const response = await octokit.request('GET /users/benhammondmusic/events', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            },
						per_page: 100
        });

        if (response.status !== 200) {
            // If response is not ok, throw an error
            throw new Error(`Failed to fetch GitHub data: ${response.status} ${response.data}`);
        }

        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
