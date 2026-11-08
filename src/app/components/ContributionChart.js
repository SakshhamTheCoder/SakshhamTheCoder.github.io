import { MdArrowOutward } from 'react-icons/md';

const LEVELS = ['bg-tertiary/15', 'bg-primary/35', 'bg-primary/60', 'bg-primary', 'bg-accent'];

// cal comes from getContributions(); the page decides whether to render the tile.
export default function ContributionChart({ cal }) {
    const max = Math.max(1, ...cal.weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));
    const level = (n) => (n === 0 ? 0 : Math.ceil((n / max) * 4));

    return (
        <div
            className="glass rounded-2xl p-4 text-tertiary flex flex-col gap-3"
            role="group"
            aria-label={`${cal.totalContributions} contributions on GitHub in the last year`}
        >
            <div className="flex items-center justify-between gap-4">
                <h3 className="tile-title tabular-nums">{cal.totalContributions.toLocaleString()} contributions in the last year</h3>
                <a
                    href="https://github.com/SakshhamTheCoder"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-accent"
                >
                    GitHub <MdArrowOutward className="link-arrow" />
                </a>
            </div>
            <div className="max-lg:overflow-x-auto flex-1 flex items-center">
                <div className="grid grid-flow-col grid-rows-7 gap-0.75 auto-cols-fr w-full max-lg:min-w-160">
                    {cal.weeks.flatMap((w, wi) =>
                        w.contributionDays.map((d) => (
                            <div
                                key={d.date}
                                data-tip={`${d.contributionCount} on ${d.date}`}
                                style={{ '--w': wi }}
                                className={`chart-cell ${LEVELS[level(d.contributionCount)]}`}
                            />
                        ))
                    )}
                </div>
            </div>
            {/* The legend sits under the grid, so the tile reads top (title), middle (data), bottom (key). */}
            <div className="flex items-center justify-end gap-1 text-xs" aria-hidden="true">
                Less
                {LEVELS.map((c) => (
                    <span key={c} className={`size-2.5 rounded-xs ${c}`} />
                ))}
                More
            </div>
        </div>
    );
}
