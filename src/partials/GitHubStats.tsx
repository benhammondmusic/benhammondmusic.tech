import { GradientText, Section } from "@/astro-boilerplate-components";

export const prerender = false;

function splitEventsByDate(events: any[]) {
	const eventsByDate: any = {};
	events.forEach(event => {
		if (!['CreateEvent', 'DeleteEvent'].includes(event.type)) {
			const eventDate = event.created_at.split('T')[0];
			if (!eventsByDate[eventDate]) {
				eventsByDate[eventDate] = [event];
			} else {
				eventsByDate[eventDate].push(event);
			}
		}
	});
	return eventsByDate
}

const activityMap = {
	PushEvent: "💪",
	IssuesEvent: "🐛",
	IssueCommentEvent: "💬",
	PullRequestEvent: "⇵",
	PullRequestReviewCommentEvent: "🔍",
	PullRequestReviewEvent: "👀",
	ForkEvent: "🍴",
	WatchEvent: "⭐️",
};

type ActivityType = keyof typeof activityMap;

function generateGitHubEventLink(event: any): string {
	const eventType = event.type;
	const eventRepo = event.repo.name;

	switch (eventType) {
		case 'PushEvent':
			const eventSha = event.payload.commits?.[0]?.sha ?? '';
			return `https://github.com/${eventRepo}/commit/${eventSha}`;
		case 'IssuesEvent':
			return event.payload.issue.html_url;
		case 'IssueCommentEvent':
		case 'PullRequestReviewCommentEvent':
			return event.payload.comment.html_url;
		case 'PullRequestReviewEvent':
			return event.payload.review.html_url;
		case 'PullRequestEvent':
			return event.payload.pull_request.html_url;
		default:
			return `https://github.com/${eventRepo}`;
	}
}


interface GitHubStatsProps {
	data: any[];
}

function GitHubStats(props: GitHubStatsProps) {

	const { data } = props;

	const eventsByDate = splitEventsByDate(data);

	return (
		<Section
			title={
				<div className="font-rubik">
					Recent <GradientText>GitHub Activity</GradientText>
				</div>
			}
		>
			{/* <div className="flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6"></div> */}
			<div className="flex flex-wrap gap-2 p-4 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md">
				{Object.entries(eventsByDate).reverse().map(([eventDate, events]: any) => {
					if (!events.length) return null;
					const date = new Date(eventDate);
					const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
					const dayNumber = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);

					return (
						<div
							key={eventDate}
							className="flex-shrink-0 bg-benhammondblue-800 rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-colors"
							style={{
								minWidth: '120px',
								maxWidth: `${Math.min(200, events.length * 40)}px`
							}}
						>
							<div className="px-3 py-2 bg-white/5 border-b border-white/10">
								<div className="text-sm font-medium">{dayName}</div>
								<div className="text-xs text-white/70">{dayNumber}</div>
							</div>
							<div className="p-2">
								<div className="flex flex-wrap gap-1">
									{events.map((event: any) => {
										const link = generateGitHubEventLink(event);
										return (
											<a
												key={event.id}
												href={link}
												target="_blank"
												className="group relative"
											>
												<span role='img' aria-label={event.type} className="text-lg hover:scale-110 transition-transform inline-block p-1">
													{activityMap[event.type as ActivityType]}
												</span>
												<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-white text-benhammondblue-800 rounded opacity-0 group-hover:opacity-100  transition-opacity whitespace-nowrap">
													{event.type.replace('Event', '')}
												</span>
											</a>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Section>
	);
}

export { GitHubStats };