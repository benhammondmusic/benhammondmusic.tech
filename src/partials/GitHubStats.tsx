import { GradientText, Section } from "@/astro-boilerplate-components"
import { fetchGitHubData } from "@/utils/github";

export const prerender = false

function splitEventsByDate(events: any[]) {
	const eventsByDate: any = {};

	events.forEach(event => {

		if (!['CreateEvent', 'DeleteEvent'].includes(event.type)) {
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
	PullRequestEvent: "⇵", // Represents opening, merging, or closing pull requests
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
			return event.payload.issue.html_url
		case 'IssueCommentEvent':
		case 'PullRequestReviewCommentEvent':
			// For issue comments, link to the issue hash
			return event.payload.comment.html_url
		case 'PullRequestReviewEvent':
			return event.payload.review.html_url
		case 'PullRequestEvent':
			// For pull request events, link to the pull request
			return event.payload.pull_request.html_url;
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
					Recent <GradientText>GitHub Activity</GradientText>
				</div>
			}
		>

			{Object.entries(eventsByDate).map(([eventDate, events]: any) => {
				if (!events.length) return null;
				return (
					<div className="flex flex-col px-5 py-1 m-1 rounded border-white border bg-benhammondblue-800">
						<h2>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(eventDate))}</h2>
						<ul className="flex flex-wrap ">
							{events.map((event: any) => {


								const link = generateGitHubEventLink(event);

								return (
									<li key={event.id} className="px-0.5 group hover:bg-white hover:text-benhammondblue-800">
										<a href={link} target="_blank" className="flex items-center">
											{activityMap[event.type as ActivityType]}
											<span
												className="ml-2 opacity-0 group-hover:opacity-100 group-hover:max-w-[200px] group-hover:block group-hover:text-benhammondblue-800 group-hover:font-medium transition-all duration-[1500ms] ease-in-out max-w-0 overflow-hidden"
											>
												{event.type.replace('Event', '')}
											</span>
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				)
			})}

		</Section>
	)
}

export { GitHubStats }