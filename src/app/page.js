import { MdArrowOutward } from 'react-icons/md';
import Link from 'next/link';
import { getResumeLink, getProfile, getExperience, getNow } from '@/lib/content';
import { getContributions, getPullRequests } from '@/lib/github';
import { getLatestRelease } from '@/lib/music';
import { formatRange } from '@/lib/format';
import { Icon, SOCIAL_ICONS } from '@/lib/icons';
import { FaGlobe } from 'react-icons/fa';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';
import EmailCard from '@/app/components/EmailCard';
import ContributionChart from '@/app/components/ContributionChart';
import PullRequests from '@/app/components/PullRequests';
import MusicTile from '@/app/components/MusicTile';
import HeroTitle from '@/app/components/HeroTitle';
import TiltPhoto from '@/app/components/TiltPhoto';

const socialIcon = (id) => {
    const C = SOCIAL_ICONS[id] || FaGlobe;
    return <C size="1.5rem" />;
};

export default async function Home() {
    const [resumeLink, profile, allExperience, now, cal, prs, music] = await Promise.all([
        getResumeLink(),
        getProfile(),
        getExperience(),
        getNow(),
        getContributions(),
        getPullRequests(),
        getLatestRelease(),
    ]);
    const experience = allExperience.filter((e) => e.showOnHome).slice(0, 6);
    // The Music tile already goes to the music site, so a social icon pointing at the same site would be a second link
    // to one place. It is hidden only while the tile shows; point that icon somewhere else (Spotify, say) in admin and it stays.
    const socials = (profile.socials || []).filter((s) => !(music && s.href?.startsWith('https://skshhm.vercel.app')));
    const [before, after] = (profile.aboutShort || '').split(profile.aboutHighlight || '\0');
    // Bottom row: chart, latest release and pull requests share 12 columns; any that is missing gives its width back.
    const SPAN = { 2: 'lg:col-span-2', 4: 'lg:col-span-4', 6: 'lg:col-span-6', 8: 'lg:col-span-8', 10: 'lg:col-span-10', 12: 'lg:col-span-12' };
    const span = { cal: SPAN[music ? 6 : 8], music: SPAN[2], prs: SPAN[cal ? 4 : music ? 10 : 12] };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_auto] gap-4"
        >
            <motion.div variants={container} className="flex flex-col gap-4 min-h-0 lg:col-span-4">
                <motion.div variants={item} className="glass rounded-2xl p-6 flex flex-1 min-h-0 items-center select-none">
                    <div className="flex flex-col gap-3 md:items-end w-full">
                        <h1 className="text-3xl sm:text-4xl lg:text-[clamp(2rem,6.4vh,3.75rem)] text-balance font-bold md:text-end text-primary leading-tight text-center">
                            <HeroTitle line={profile.heroLine || 'Developer & Music Producer'} />
                        </h1>
                        {now && <p className="text-sm text-tertiary italic text-center md:text-end">Now: {now}</p>}
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <Link href="/about" className="glass glass-link rounded-2xl p-5 text-tertiary block">
                        <div className="flex items-center justify-between mb-2">
                            <span className="tile-label">About</span>
                            <MdArrowOutward size="1.625rem" className="link-arrow text-primary shrink-0" aria-hidden="true" />
                        </div>
                        <p className="text-base">
                            {after === undefined ? (
                                before
                            ) : (
                                <>
                                    {before}
                                    <span className="italic text-accent">{profile.aboutHighlight}</span>
                                    {after}
                                </>
                            )}
                        </p>
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div variants={container} className="flex flex-col gap-4 min-h-0 lg:col-span-4">
                <motion.div variants={item} className="glass rounded-2xl relative overflow-hidden aspect-4/3 lg:aspect-auto flex-1 min-h-0 select-none">
                    <TiltPhoto src="/avatar.webp" alt="Sakshham" />
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                    <motion.a
                        variants={item}
                        href={resumeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="glass glass-link rounded-2xl p-5 flex items-center justify-between gap-2"
                    >
                        <span className="tile-label">Resume</span>
                        <MdArrowOutward size="1.625rem" className="link-arrow text-primary shrink-0" aria-hidden="true" />
                    </motion.a>
                    <motion.div variants={item}>
                        <Link href="/projects" className="glass glass-link rounded-2xl p-5 flex items-center justify-between gap-2">
                            <span className="tile-label">Projects</span>
                            <MdArrowOutward size="1.625rem" className="link-arrow text-primary shrink-0" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div variants={container} style={{ gridTemplateColumns: `repeat(${socials.length + 1}, minmax(0, 1fr))` }} className="grid gap-4">
                    {socials.map((sc) => (
                        <motion.a
                            variants={item}
                            key={sc.id}
                            href={sc.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={sc.id}
                            className="glass glass-link rounded-2xl py-3 flex items-center justify-center text-primary"
                        >
                            {socialIcon(sc.id)}
                        </motion.a>
                    ))}
                    <EmailCard email={profile.email} />
                </motion.div>
            </motion.div>

            <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary flex flex-col min-h-0 lg:col-span-4">
                <h2 className="tile-title mb-3">Experience</h2>
                <div className="flex flex-1 min-h-0 flex-col justify-between gap-2">
                    {experience.map((area) => (
                        <div key={area.id} className="flex items-center gap-3 border-b border-tertiary/10 pb-2 last:border-b-0 last:pb-0">
                            <span className="text-primary text-xl shrink-0" aria-hidden="true">
                                <Icon name={area.icon} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline justify-between gap-3">
                                    <h3 className="font-bold truncate">{area.org}</h3>
                                    <span className="text-xs tabular-nums text-tertiary/80 whitespace-nowrap">
                                        {formatRange(area.startDate, area.endDate)}
                                    </span>
                                </div>
                                <p className="text-sm line-clamp-2">{area.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {cal && (
                <motion.div variants={item} className={`${span.cal} lg:min-h-[12.5rem] flex flex-col [&>*]:flex-1`}>
                    <ContributionChart cal={cal} />
                </motion.div>
            )}

            {music && (
                <motion.div variants={item} className={`relative ${span.music} min-h-44 lg:min-h-[12.5rem]`}>
                    <MusicTile release={music} />
                </motion.div>
            )}

            {/* Sized by the chart beside it; the list inside is clipped rather than allowed to push the row taller. */}
            {prs.length > 0 && (
                <motion.div variants={item} className={`relative min-h-0 lg:min-h-[12.5rem] ${span.prs}`}>
                    <PullRequests prs={prs} />
                </motion.div>
            )}
        </motion.div>
    );
}
