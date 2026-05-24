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
            console.error(`Failed to fetch GitHub data: ${response.status}`);
            return [];
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return [];
    }
}
