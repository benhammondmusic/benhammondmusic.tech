import { GradientText, Section } from "@/astro-boilerplate-components"
import { fetchGitHubData } from "@/utils/github";


function splitEventsByDate(events: any[]) {
	const eventsByDate: any = {};

	events.forEach(event => {
			// Extract the date portion of the timestamp (YYYY-MM-DD)
			const eventDate = event.created_at.split('T')[0];

			// Check if the eventsByDate object already has a key for the current date
			if (!eventsByDate[eventDate]) {
					// If not, create a new array for this date
					eventsByDate[eventDate] = [event];
			} else {
					// If yes, push the current event to the existing array for this date
					eventsByDate[eventDate].push(event);
			}
	});
	return eventsByDate;
}

const data = await fetchGitHubData()
const eventsByDate = splitEventsByDate(data);

const activityMap = {
	PushEvent: "💪", // Represents pushing commits
	IssuesEvent: "🐛", // Represents opening or closing issues
	IssueCommentEvent: "💬", // Represents commenting on issues
	DeleteEvent: "🗑️", // Represents deleting branches or tags
	PullRequestEvent: "⬆️", // Represents opening, merging, or closing pull requests
	CreateEvent: "🌱", // Represents creating branches or tags
	PullRequestReviewCommentEvent: "🔍", // Represents commenting on pull request reviews
	PullRequestReviewEvent: "👀", // Represents approving or requesting changes on pull requests
	ForkEvent: "🍴", // Represents creating a for
	WatchEvent: "⭐️", // Represents watching repos
};

type ActivityType = keyof typeof activityMap


function generateGitHubEventLink(event: any): string {
	// Extract relevant information from the event
	const eventType = event.type;
	const eventRepo = event.repo.name;

	// Generate GitHub link based on event type
	switch (eventType) {
			case 'PushEvent':
					// For push events, link to the commit SHA
					const eventSha = event.payload.commits?.[0]?.sha ?? '';
					return `https://github.com/${eventRepo}/commit/${eventSha}`;
			case 'IssuesEvent':
			case 'IssueCommentEvent':
					// For issues and issue comment events, link to the issue
					const issueNumber = event.payload.issue.number;
					return `https://github.com/${eventRepo}/issues/${issueNumber}`;
			// Add cases for other event types as needed
			default:
					// For other event types, provide a generic link
					return `https://github.com/${eventRepo}`;
	}
}



function GitHubStats() {


	return (
		<Section
		title={
			<div className='font-rubik'>
				Last 100 <GradientText>GitHub Events</GradientText>
			</div>
		}
		>

{Object.entries(eventsByDate).map(([eventDate, events]: any) => {
	if (!events.length) return null;
	return(
<div className="flex flex-col px-5 py-1 m-1 rounded border-white border bg-benhammondblue-800">
		<h2>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(eventDate))}</h2>
		<ul className="flex flex-wrap ">
			{events.map((event: any) => {

				const link = generateGitHubEventLink(event);

				return (
				<li key={event.id} title={event.type} className="px-0.5 hover:bg-white">
{/* emoji link to GitHub event */}
					<a href={link}>
						{activityMap[event.type as ActivityType]}
						</a>
					</li>
			)})}
		</ul>
		</div>
)})}

		</Section>
	)
}

export { GitHubStats }