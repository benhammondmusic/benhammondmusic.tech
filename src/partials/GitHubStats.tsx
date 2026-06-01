import { useState, useEffect } from 'react';
import { GradientText, Section } from "@/astro-boilerplate-components";

const EXCLUDED = ['CreateEvent', 'DeleteEvent', 'WatchEvent'];

const LANES = [
  { type: 'PushEvent',              emoji: '💪', label: 'Pushes',   color: 'bg-benhammondyellow' },
  { type: 'PullRequestEvent',       emoji: '⇵',  label: 'PRs',      color: 'bg-benhammondgreen-400' },
  { type: 'IssueCommentEvent',      emoji: '💬', label: 'Comments', color: 'bg-sky-400' },
  { type: 'IssuesEvent',            emoji: '🐛', label: 'Issues',   color: 'bg-orange-400' },
  { type: 'PullRequestReviewEvent', emoji: '👀', label: 'Reviews',  color: 'bg-violet-400' },
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

function getStats(events: any[]) {
  const now = new Date();

  const cutoff7 = new Date(now);
  cutoff7.setDate(now.getDate() - 6);
  cutoff7.setHours(0, 0, 0, 0);

  const cutoff28 = new Date(now);
  cutoff28.setDate(now.getDate() - 27);
  cutoff28.setHours(0, 0, 0, 0);

  const recent7 = events.filter(e => !EXCLUDED.includes(e.type) && new Date(e.created_at) >= cutoff7);
  const recent28 = events.filter(e => !EXCLUDED.includes(e.type) && new Date(e.created_at) >= cutoff28);

  const commits = recent7
    .filter(e => e.type === 'PushEvent')
    .reduce((sum, e) => sum + (e.payload?.size || e.payload?.commits?.length || 1), 0);

  const repos4wks = new Set(recent28.map((e: any) => e.repo.name)).size;

  const daysActive4wks = new Set(
    recent28.map(e => (e.created_at as string).split('T')[0])
  ).size;

  return { commits, repos4wks, daysActive4wks };
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

function SkeletonRow() {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <div className="w-24 h-5 bg-white/10 rounded shrink-0" />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex-1 h-7 bg-white/10 rounded" />
      ))}
    </div>
  );
}

function GitHubStats() {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  const allWeeks = getLast12Weeks();
  const weeklyMap = data ? buildWeeklyEventMap(data, allWeeks) : {};

  // Only show weeks that have at least one event across any lane
  const activeWeeks = allWeeks
    .map((week, wi) => ({ week, wi }))
    .filter(({ wi }) => LANES.some(lane => (weeklyMap[wi]?.[lane.type] ?? 0) > 0));

  // Recalculate month labels for the compressed active-weeks sequence
  const activeWeeksWithLabels = activeWeeks.map(({ week, wi }, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(week.start));
    const prevMonth = i > 0
      ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(activeWeeks[i - 1]!.week.start))
      : null;
    return { week, wi, monthLabel: i === 0 || month !== prevMonth ? month : null };
  });

  const { commits, repos4wks, daysActive4wks } = data ? getStats(data) : { commits: 0, repos4wks: 0, daysActive4wks: 0 };
  const topRepos = data ? getTopRepos(data) : [];
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
        {data === null ? (
          <div className="flex flex-wrap gap-x-6 gap-y-2 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-baseline gap-2">
                <div className="h-9 w-10 bg-white/10 rounded" />
                <div className="h-4 w-28 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-benhammondyellow font-bold text-3xl">{commits}</span>
              <span className="text-white/60 text-sm">commits this week</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-benhammondyellow font-bold text-3xl">{repos4wks}</span>
              <span className="text-white/60 text-sm">repos (4 wks)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-benhammondyellow font-bold text-3xl">{daysActive4wks}</span>
              <span className="text-white/60 text-sm">days active (4 wks)</span>
            </div>
          </div>
        )}

        {/* Swim lanes */}
        {data === null ? (
          <div className="animate-pulse">
            {LANES.map(lane => <SkeletonRow key={lane.type} />)}
          </div>
        ) : (
          <div>
            {/* Month headers aligned with active week columns */}
            <div className="flex gap-1.5 mb-1 ml-24">
              {activeWeeksWithLabels.map(({ wi, monthLabel }) => (
                <div key={wi} className="flex-1 text-center text-xs text-white/40">
                  {monthLabel ?? ''}
                </div>
              ))}
            </div>

            {/* Lane rows */}
            {LANES.map(lane => (
              <div key={lane.type} className="flex items-center gap-1.5 mb-2">
                <div className="w-24 shrink-0 flex items-center gap-1.5">
                  <span className="text-sm leading-none">{lane.emoji}</span>
                  <span className="text-xs text-white/50 whitespace-nowrap">{lane.label}</span>
                </div>
                {activeWeeksWithLabels.map(({ week, wi }) => {
                  const count = weeklyMap[wi]?.[lane.type] ?? 0;
                  const title = count > 0
                    ? `${fmt(week.start)} – ${fmt(week.end)}: ${count} ${lane.label}`
                    : `${fmt(week.start)} – ${fmt(week.end)}: none`;
                  return (
                    <div
                      key={wi}
                      title={title}
                      className={`flex-1 h-7 rounded ${lane.color} ${cellOpacity(count)} transition-opacity`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        )}

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
