import { GradientText, Section } from "@/astro-boilerplate-components";

export const prerender = false;

const EXCLUDED = ['CreateEvent', 'DeleteEvent', 'WatchEvent'];

const LANES = [
  { type: 'PushEvent',              emoji: '💪', label: 'Pushes',   color: 'bg-benhammondyellow' },
  { type: 'PullRequestEvent',       emoji: '⇵',  label: 'PRs',      color: 'bg-benhammondblue-300' },
  { type: 'IssueCommentEvent',      emoji: '💬', label: 'Comments', color: 'bg-benhammondblue-400' },
  { type: 'IssuesEvent',            emoji: '🐛', label: 'Issues',   color: 'bg-benhammondgreen-400' },
  { type: 'PullRequestReviewEvent', emoji: '👀', label: 'Reviews',  color: 'bg-benhammondblue-200' },
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

type WeekInfo = { start: string; end: string; monthLabel: string | null };

function getLast12Weeks(): WeekInfo[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());

  return Array.from({ length: 12 }, (_, i) => {
    const weekStart = new Date(thisWeekStart);
    weekStart.setDate(thisWeekStart.getDate() - (11 - i) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(weekStart);
    const prevStart = new Date(weekStart);
    prevStart.setDate(weekStart.getDate() - 7);
    const prevMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(prevStart);

    return {
      start: weekStart.toISOString().split('T')[0] as string,
      end: weekEnd.toISOString().split('T')[0] as string,
      monthLabel: i === 0 || month !== prevMonth ? month : null,
    };
  });
}

function buildWeeklyEventMap(events: any[], weeks: WeekInfo[]): Record<number, Record<string, number>> {
  const result: Record<number, Record<string, number>> = {};
  for (const event of events) {
    if (EXCLUDED.includes(event.type)) continue;
    const date = event.created_at.split('T')[0] as string;
    const wi = weeks.findIndex(w => date >= w.start && date <= w.end);
    if (wi === -1) continue;
    if (!result[wi]) result[wi] = {};
    result[wi][event.type] = (result[wi][event.type] ?? 0) + 1;
  }
  return result;
}

function getThisWeekStats(events: any[]) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  cutoff.setHours(0, 0, 0, 0);
  const recent = events.filter(e => !EXCLUDED.includes(e.type) && new Date(e.created_at) >= cutoff);
  const commits = recent
    .filter(e => e.type === 'PushEvent')
    .reduce((sum, e) => sum + (e.payload?.size || e.payload?.commits?.length || 1), 0);
  const repos = new Set(recent.map((e: any) => e.repo.name)).size;
  return { commits, repos };
}

function getDaysActiveThisMonth(events: any[]): number {
  const now = new Date();
  const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return new Set(
    events
      .filter(e => !EXCLUDED.includes(e.type) && (e.created_at as string).startsWith(monthStr))
      .map(e => (e.created_at as string).split('T')[0])
  ).size;
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

function cellOpacity(count: number): string {
  if (count === 0) return 'opacity-0';
  if (count <= 3) return 'opacity-40';
  if (count <= 8) return 'opacity-75';
  return 'opacity-100';
}

interface GitHubStatsProps {
  data: any[];
}

function GitHubStats({ data }: GitHubStatsProps) {
  const weeks = getLast12Weeks();
  const weeklyMap = buildWeeklyEventMap(data, weeks);
  const { commits, repos } = getThisWeekStats(data);
  const daysActive = getDaysActiveThisMonth(data);
  const topRepos = getTopRepos(data);


  const fmt = (d: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(d));

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
        <div>
          {/* Month headers */}
          <div className="flex gap-1 mb-1 ml-16">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex-1 min-w-3 max-w-10 text-center text-xs text-white/40 truncate">
                {week.monthLabel ?? ''}
              </div>
            ))}
          </div>

          {/* Lane rows */}
          {LANES.map(lane => (
            <div key={lane.type} className="flex items-center gap-1 mb-2">
              <div className="w-16 shrink-0 flex items-center gap-1">
                <span className="text-sm leading-none">{lane.emoji}</span>
                <span className="text-xs text-white/50 truncate">{lane.label}</span>
              </div>
              {weeks.map((week, wi) => {
                const count = weeklyMap[wi]?.[lane.type] ?? 0;
                const title = count > 0
                  ? `${fmt(week.start)} – ${fmt(week.end)}: ${count} ${lane.label}`
                  : `${fmt(week.start)} – ${fmt(week.end)}`;
                return (
                  <div
                    key={wi}
                    title={title}
                    className={`flex-1 min-w-3 max-w-10 h-7 rounded ${lane.color} ${cellOpacity(count)} transition-opacity`}
                  />
                );
              })}
            </div>
          ))}

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
