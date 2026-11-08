import { MdArrowOutward } from 'react-icons/md';
import { getContributions } from '@/lib/github';

const LEVELS = ['bg-tertiary/10', 'bg-primary/25', 'bg-primary/45', 'bg-primary/70', 'bg-primary'];

export default async function ContributionChart() {
    const cal = await getContributions();
    if (!cal) return null;

    const max = Math.max(1, ...cal.weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));
    const level = (n) => (n === 0 ? 0 : Math.ceil((n / max) * 4));

    return (
        <div className="glass-navbar rounded-2xl p-6 text-tertiary" role="group" aria-label={`${cal.totalContributions} contributions on GitHub in the last year`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm uppercase tracking-widest text-primary">
                    {cal.totalContributions.toLocaleString()} contributions in the last year
                </h3>
                <a
                    href="https://github.com/SakshhamTheCoder"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-primary"
                >
                    GitHub <MdArrowOutward />
                </a>
            </div>
            <div className="overflow-x-auto pt-8 pb-1">
                <div className="flex gap-0.75 min-w-max">
                    {cal.weeks.map((w, i) => (
                        <div key={i} className="flex flex-col gap-0.75">
                            {w.contributionDays.map((d) => (
                                <div
                                    key={d.date}
                                    tabIndex={0}
                                    aria-label={`${d.contributionCount} contributions on ${d.date}`}
                                    data-tip={`${d.contributionCount} on ${d.date}`}
                                    className={`relative size-2.5 rounded-xs ${LEVELS[level(d.contributionCount)]} outline-offset-2 focus-visible:outline focus-visible:outline-primary hover:after:block focus:after:block after:hidden after:content-[attr(data-tip)] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:mb-1 after:z-20 after:whitespace-nowrap after:rounded after:bg-black after:px-2 after:py-1 after:text-xs after:text-tertiary`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
