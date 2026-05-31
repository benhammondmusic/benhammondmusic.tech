import { Octokit } from "octokit";

export async function fetchGitHubData() {
    try {
        const token = import.meta.env.GH_STATS_TOKEN;

        const octokit = new Octokit({
            auth: token,
        });

				// https://api.github.com/users/benhammondmusic/events

        const allEvents: any[] = [];
        for (let page = 1; page <= 5; page++) {
            const response = await octokit.request('GET /users/benhammondmusic/events', {
                headers: { 'X-GitHub-Api-Version': '2022-11-28' },
                per_page: 100,
                page,
            });
            if (response.status !== 200) {
                console.error(`Failed to fetch GitHub data: ${response.status}`);
                break;
            }
            allEvents.push(...response.data);
            if (response.data.length < 100) break;
        }

        return allEvents;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return [];
    }
}
