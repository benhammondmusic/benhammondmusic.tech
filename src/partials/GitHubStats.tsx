import { GradientText, Section } from "@/astro-boilerplate-components";

export const prerender = false;

const EXCLUDED = ['CreateEvent', 'DeleteEvent', 'WatchEvent'];

const LANES = [
  { type: 'PushEvent',                    emoji: '💪', label: 'Pushes',   color: 'bg-benhammondyellow' },
  { type: 'PullRequestEvent',             emoji: '⇵',  label: 'PRs',      color: 'bg-benhammondblue-300' },
  { type: 'IssueCommentEvent',            emoji: '💬', label: 'Comments', color: 'bg-benhammondblue-400' },
  { type: 'IssuesEvent',                  emoji: '🐛', label: 'Issues',   color: 'bg-benhammondgreen-400' },
  { type: 'PullRequestReviewEvent',       emoji: '👀', label: 'Reviews',  color: 'bg-benhammondblue-200' },
];

const activityMap: Record<string, string> = {
  PushEvent: "💪",
  IssuesEvent: "🐛",
  IssueCommentEvent: "💬",
  PullRequestEvent: "⇵",
  PullRequestReviewCommentEvent: "🔍",
  PullRequestReviewEvent: "👀",
  ForkEvent: "🍴",
  WatchEvent: "⭐️",
  ReleaseEvent: "🚀",
};

function buildEventMap(events: any[]): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};
  for (const event of events) {
    if (EXCLUDED.includes(event.type)) continue;
    const date = event.created_at.split('T')[0] as string;
    if (!result[date]) result[date] = {};
    result[date][event.type] = (result[date][event.type] ?? 0) + 1;
  }
  return result;
}

function getLast21Days(): string[] {
  return Array.from({ length: 21 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (20 - i));
    return d.toISOString().split('T')[0] as string;
  });
}

function getThisWeekStats(events: any[]) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  cutoff.setHours(0, 0, 0, 0);
  const recent = events.filter(e => !EXCLUDED.includes(e.type) && new Date(e.created_at) >= cutoff);
  const pushes = recent.filter(e => e.type === 'PushEvent');
  const commits = pushes.reduce((sum, e) => {
    const size = e.payload?.size;
    const len = e.payload?.commits?.length;
    return sum + (size || len || 1);
  }, 0);
  const repos = new Set(recent.map((e: any) => e.repo.name)).size;
  return { commits, repos };
}

function getDaysActiveThisMonth(events: any[]): number {
  const now = new Date();
  const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const days = new Set(
    events
      .filter(e => !EXCLUDED.includes(e.type) && (e.created_at as string).startsWith(monthStr))
      .map(e => (e.created_at as string).split('T')[0])
  );
  return days.size;
}

function getTopRepos(events: any[], limit = 4) {
  const repoMap: Record<string, any[]> = {};
  for (const event of events) {
    if (EXCLUDED.includes(event.type)) continue;
    (repoMap[event.repo.name] ??= []).push(event);
  }
  return Object.entries(repoMap)
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, limit)
    .map(([fullName, evts]) => ({
      name: fullName.split('/')[1],
      url: `https://github.com/${fullName}`,
      events: evts,
    }));
}

interface GitHubStatsProps {
  data: any[];
}

function GitHubStats({ data }: GitHubStatsProps) {
  const eventMap = buildEventMap(data);
  const last21Days = getLast21Days();
  const { commits, repos } = getThisWeekStats(data);
  const daysActive = getDaysActiveThisMonth(data);
  const topRepos = getTopRepos(data);

  const activeLanes = LANES.filter(lane =>
    last21Days.some(date => (eventMap[date]?.[lane.type] ?? 0) > 0)
  );

  return (
    <Section
      title={
        <div className="font-rubik">
          Recent <GradientText>GitHub Activity</GradientText>
        </div>
      }
    >
      <div className="flex flex-col gap-5 p-4 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md">

        {/* Stat bar */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-benhammondyellow font-bold text-3xl">{commits}</span>
            <span className="text-white/60 text-sm">commits this week</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-benhammondyellow font-bold text-3xl">{repos}</span>
            <span className="text-white/60 text-sm">repos touched</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-benhammondyellow font-bold text-3xl">{daysActive}</span>
            <span className="text-white/60 text-sm">days active this month</span>
          </div>
        </div>

        {/* Swim lanes */}
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Day headers */}
            <div className="flex mb-2 pl-24">
              {last21Days.map((date) => {
                const d = new Date(date);
                const dayNum = d.getDate();
                const dow = new Intl.DateTimeFormat('en-US', { weekday: 'narrow' }).format(d);
                return (
                  <div key={date} className="w-7 flex flex-col items-center">
                    <div className="text-xs text-white/25">{dow}</div>
                    <div className="text-xs text-white/40 font-medium">{dayNum}</div>
                  </div>
                );
              })}
            </div>

            {/* Lane rows */}
            {activeLanes.map(lane => (
              <div key={lane.type} className="flex items-center mb-2">
                <div className="w-24 flex items-center gap-1.5 pr-3 shrink-0">
                  <span className="text-base">{lane.emoji}</span>
                  <span className="text-xs text-white/50">{lane.label}</span>
                </div>
                {last21Days.map(date => {
                  const count = eventMap[date]?.[lane.type] ?? 0;
                  const d = new Date(date);
                  const label = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
                  const title = count > 0 ? `${label}: ${count} ${lane.label}` : label;
                  return (
                    <div key={date} className="w-7 flex justify-center">
                      <div
                        title={title}
                        className={`w-5 h-5 rounded transition-all ${
                          count === 0
                            ? 'bg-white/5'
                            : count <= 2
                            ? `${lane.color} opacity-50`
                            : `${lane.color} opacity-90`
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Repo spotlight */}
        {topRepos.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
            {topRepos.map(({ name, url, events: repoEvents }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 bg-white/5 hover:bg-white/10 transition-colors rounded-lg px-3 py-2"
              >
                <span className="text-xs font-semibold text-benhammondyellow truncate max-w-[180px]">{name}</span>
                <span className="text-base leading-relaxed">
                  {repoEvents.slice(0, 7).map((e: any, i: number) => (
                    <span key={i} title={e.type.replace('Event', '')}>
                      {activityMap[e.type] ?? '⚡'}
                    </span>
                  ))}
                  {repoEvents.length > 7 && (
                    <span className="text-white/40 text-xs ml-1">+{repoEvents.length - 7}</span>
                  )}
                </span>
              </a>
            ))}
          </div>
        )}

      </div>
    </Section>
  );
}

export { GitHubStats };
