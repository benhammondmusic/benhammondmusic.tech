import { Octokit } from "octokit";

const EXCLUDED_REPOS = new Set(['benhammondmusic/health-equity-tracker']);

export async function fetchGitHubData() {
    try {
        const token = import.meta.env.GH_STATS_TOKEN;
        const octokit = new Octokit({ auth: token });

        const responses = await Promise.all(
            Array.from({ length: 10 }, (_, i) =>
                octokit.request('GET /users/benhammondmusic/events', {
                    headers: { 'X-GitHub-Api-Version': '2022-11-28' },
                    per_page: 100,
                    page: i + 1,
                }).catch(() => null)
            )
        );

        const allEvents = responses
            .filter(r => r && r.status === 200 && r.data.length > 0)
            .flatMap(r => r!.data);

        const filteredEvents = allEvents.filter((e: any) => !EXCLUDED_REPOS.has(e.repo.name));

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
