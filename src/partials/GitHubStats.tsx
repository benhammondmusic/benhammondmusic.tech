import { GradientText, Section } from "@/astro-boilerplate-components";

export const prerender = false;

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

const EXCLUDED = ['CreateEvent', 'DeleteEvent', 'WatchEvent'];

function splitEventsByDate(events: any[]): Record<string, any[]> {
  const byDate: Record<string, any[]> = {};
  for (const event of events) {
    if (EXCLUDED.includes(event.type)) continue;
    const date = event.created_at.split('T')[0];
    (byDate[date] ??= []).push(event);
  }
  return byDate;
}

function getThisWeekStats(events: any[]) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  cutoff.setHours(0, 0, 0, 0);
  const recent = events.filter(e => !EXCLUDED.includes(e.type) && new Date(e.created_at) >= cutoff);
  const commits = recent
    .filter(e => e.type === 'PushEvent')
    .reduce((sum, e) => sum + (e.payload.size ?? e.payload.commits?.length ?? 0), 0);
  const repos = new Set(recent.map(e => e.repo.name)).size;
  return { commits, repos };
}

function getDaysActiveThisMonth(byDate: Record<string, any[]>): number {
  const now = new Date();
  const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return Object.keys(byDate).filter(date => date.startsWith(monthStr)).length;
}

function buildHeatmapWeeks(): (string | null)[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gridStart = new Date(today);
  gridStart.setDate(today.getDate() - today.getDay() - 49);

  return Array.from({ length: 8 }, (_, w) =>
    Array.from({ length: 7 }, (_, d): string | null => {
      const cell = new Date(gridStart);
      cell.setDate(gridStart.getDate() + w * 7 + d);
      return cell > today ? null : (cell.toISOString().split('T')[0] ?? null);
    })
  );
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

function heatmapColor(count: number): string {
  if (count === 0) return 'bg-white/5';
  if (count <= 2) return 'bg-benhammondblue-400/50';
  if (count <= 5) return 'bg-benhammondblue-300';
  return 'bg-benhammondyellow';
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface GitHubStatsProps {
  data: any[];
}

function GitHubStats({ data }: GitHubStatsProps) {
  const byDate = splitEventsByDate(data);
  const { commits, repos } = getThisWeekStats(data);
  const daysActive = getDaysActiveThisMonth(byDate);
  const weeks = buildHeatmapWeeks();
  const topRepos = getTopRepos(data);

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

        {/* Heatmap */}
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            <div className="flex flex-col gap-1 pt-5 pr-1">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="text-xs text-white/30 h-4 w-3 flex items-center">{label}</div>
              ))}
            </div>
            {weeks.map((week, wi) => {
              const firstDate = week.find(Boolean);
              const month = firstDate
                ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(firstDate))
                : '';
              const prevFirst = wi > 0 ? (weeks[wi - 1]!.find(Boolean) ?? null) : null;
              const prevMonth = prevFirst
                ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(prevFirst))
                : '';

              return (
                <div key={wi} className="flex flex-col gap-1">
                  <div className="text-xs text-white/40 h-5 leading-5 whitespace-nowrap">
                    {month !== prevMonth ? month : ''}
                  </div>
                  {week.map((date, di) => {
                    const count = date ? (byDate[date]?.length ?? 0) : 0;
                    const label = date
                      ? `${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(date))}: ${count} event${count !== 1 ? 's' : ''}`
                      : '';
                    return (
                      <div
                        key={di}
                        title={label}
                        className={`w-4 h-4 rounded-sm transition-colors ${date ? heatmapColor(count) : 'bg-transparent'}`}
                      />
                    );
                  })}
                </div>
              );
            })}
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
