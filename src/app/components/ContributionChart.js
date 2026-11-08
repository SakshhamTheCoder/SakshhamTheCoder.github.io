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
                <h3 className="tile-title">{cal.totalContributions.toLocaleString()} contributions in the last year</h3>
                <div className="flex items-center gap-4 text-xs">
                    <span className="hidden sm:flex items-center gap-1" aria-hidden="true">
                        Less
                        {LEVELS.map((c) => (
                            <span key={c} className={`size-2.5 rounded-xs ${c}`} />
                        ))}
                        More
                    </span>
                    <a
                        href="https://github.com/SakshhamTheCoder"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-accent"
                    >
                        GitHub <MdArrowOutward />
                    </a>
                </div>
            </div>
            <div className="max-lg:overflow-x-auto">
                <div className="grid grid-flow-col grid-rows-7 gap-0.75 auto-cols-fr max-lg:min-w-160">
                    {cal.weeks.flatMap((w) =>
                        w.contributionDays.map((d) => (
                            <div
                                key={d.date}
                                tabIndex={0}
                                aria-label={`${d.contributionCount} contributions on ${d.date}`}
                                data-tip={`${d.contributionCount} on ${d.date}`}
                                className={`relative aspect-square rounded-xs ${LEVELS[level(d.contributionCount)]} hover:after:block focus:after:block after:hidden after:content-[attr(data-tip)] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:mb-1 after:z-20 after:whitespace-nowrap after:rounded after:bg-black after:px-2 after:py-1 after:text-xs after:text-tertiary`}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
