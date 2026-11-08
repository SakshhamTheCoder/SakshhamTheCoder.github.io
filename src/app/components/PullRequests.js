'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ease } from './Transition';
import { GoGitMerge, GoGitPullRequest, GoGitPullRequestClosed } from 'react-icons/go';

const ICON = { MERGED: GoGitMerge, OPEN: GoGitPullRequest, CLOSED: GoGitPullRequestClosed };
const TONE = { MERGED: 'text-accent', OPEN: 'text-tertiary', CLOSED: 'text-tertiary/60' };
const SHOWN = 4;
const month = (iso) => new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

// Fills the row height set by the chart beside it (absolute inset-0 on lg), so it can never change the layout.
// Always shows the latest few, and the count line stays pinned at the bottom.
export default function PullRequests({ prs }) {
    const [scope, setScope] = useState('external');
    const list = prs.filter((p) => scope === 'all' || p.external);
    const merged = list.filter((p) => p.state === 'MERGED').length;

    return (
        <section aria-labelledby="pr-title" className="glass rounded-2xl text-tertiary lg:absolute lg:inset-0 p-4 flex flex-col gap-2 min-h-0">
            <div className="flex items-center justify-between gap-2">
                <h3 id="pr-title" className="tile-title">
                    Pull requests
                </h3>
                <div role="group" aria-label="Which repositories" className="flex items-center gap-1 text-xs">
                    {[
                        ['external', 'Other projects'],
                        ['all', 'All public'],
                    ].map(([id, label]) => (
                        <button
                            key={id}
                            aria-pressed={scope === id}
                            onClick={() => setScope(id)}
                            className={`relative px-2.5 leading-5 rounded-full border transition-colors duration-200 ${scope === id ? 'border-transparent text-accent' : 'border-tertiary/20 hover:text-accent'}`}
                        >
                            {scope === id && (
                                <motion.span
                                    layoutId="pr-scope"
                                    className="absolute inset-0 rounded-full border border-primary/60 bg-primary/10"
                                    transition={{ duration: 0.35, ease }}
                                />
                            )}
                            <span className="relative">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {list.length === 0 ? (
                <p className="text-sm">No public pull requests to other projects yet.</p>
            ) : (
                <ul className="flex flex-col gap-0.5 min-h-0 flex-1">
                    {list.slice(0, SHOWN).map((p) => {
                        const I = ICON[p.state] || GoGitPullRequest;
                        return (
                            <li key={p.url} className="shrink-0">
                                <a href={p.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md px-1.5 py-0.5 text-sm hover:bg-tertiary/10 hover:translate-x-0.5 transition-[background-color,translate] duration-300 ease-out-expo">
                                    <I className={`shrink-0 ${TONE[p.state]}`} aria-label={p.state.toLowerCase()} />
                                    <span className="font-bold shrink-0 max-w-[45%] truncate">{p.repo}</span>
                                    <span className="truncate">{p.title}</span>
                                    <span className="ml-auto pl-2 shrink-0 text-xs tabular-nums text-tertiary/80">{month(p.createdAt)}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
            <p className="text-xs text-tertiary/80 px-1.5 mt-auto">
                {list.length} pull request{list.length === 1 ? '' : 's'}, {merged} merged{list.length > SHOWN && `, latest ${SHOWN} shown`}
            </p>
        </section>
    );
}
