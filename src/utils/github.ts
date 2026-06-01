import { Octokit } from "octokit";

export async function fetchGitHubData() {
    try {
        const token = import.meta.env.GH_STATS_TOKEN;
        const octokit = new Octokit({ auth: token });

        // Fetch user's forked repos so we can exclude their events
        const forksResponse = await octokit.request('GET /users/benhammondmusic/repos', {
            headers: { 'X-GitHub-Api-Version': '2022-11-28' },
            type: 'fork',
            per_page: 100,
        });
        const forkNames = new Set((forksResponse.data as any[]).map(r => r.full_name));

        const allEvents: any[] = [];
        for (let page = 1; page <= 10; page++) {
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

        const filteredEvents = allEvents.filter(e => !forkNames.has(e.repo.name));

        const typeCounts = filteredEvents.reduce((acc: Record<string, number>, e: any) => {
            acc[e.type] = (acc[e.type] ?? 0) + 1;
            return acc;
        }, {});
        console.log(`GitHub: ${filteredEvents.length} events (from ${allEvents.length} total). Types:`, typeCounts);

        return filteredEvents;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return [];
    }
}
