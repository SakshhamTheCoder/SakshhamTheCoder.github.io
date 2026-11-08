import { MdArrowOutward } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { getResumeLink, getProfile, getExperience, getNow } from '@/lib/content';
import { getContributions } from '@/lib/github';
import { formatRange } from '@/lib/format';
import { Icon, SOCIAL_ICONS } from '@/lib/icons';
import { FaGlobe } from 'react-icons/fa';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';
import EmailCard from '@/app/components/EmailCard';
import ContributionChart from '@/app/components/ContributionChart';

const socialIcon = (id) => {
    const C = SOCIAL_ICONS[id] || FaGlobe;
    return <C size={28} />;
};

export default async function Home() {
    const [resumeLink, profile, allExperience, now, cal] = await Promise.all([
        getResumeLink(),
        getProfile(),
        getExperience(),
        getNow(),
        getContributions(),
    ]);
    const experience = allExperience.filter((e) => e.showOnHome).slice(0, 6);
    const socials = profile.socials || [];
    const [before, after] = (profile.aboutShort || '').split(profile.aboutHighlight || '\0');

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[minmax(0,1fr)_auto] gap-4"
        >
            <motion.div variants={container} className="flex flex-col gap-4 min-h-0">
                <motion.div variants={item} className="glass rounded-2xl p-6 flex flex-1 min-h-0 items-center">
                    <div className="flex flex-col gap-3 md:items-end w-full">
                        <h1 className="text-3xl sm:text-4xl lg:text-[clamp(2rem,6.4vh,3.75rem)] text-balance font-bold md:text-end text-primary leading-tight text-center">
                            <span className="text-tertiary"> I am a </span>
                            {(profile.heroLine || 'Developer & Music Producer').split('&').map((part, i) => (
                                <span key={i}>
                                    {i > 0 && <span className="text-tertiary"> & </span>}
                                    {part.trim()}
                                </span>
                            ))}
                        </h1>
                        {now && <p className="text-sm text-tertiary italic text-center md:text-end">Now: {now}</p>}
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <Link href="/about" className="glass glass-link rounded-2xl p-5 text-tertiary block">
                        <div className="flex items-center justify-between mb-2">
                            <span className="tile-label">About</span>
                            <MdArrowOutward size={28} className="text-primary" aria-hidden="true" />
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

            <motion.div variants={container} className="flex flex-col gap-4 min-h-0">
                <motion.div variants={item} className="glass rounded-2xl relative overflow-hidden aspect-4/3 lg:aspect-auto flex-1 min-h-0">
                    <Image
                        src="https://avatars.githubusercontent.com/u/74554569?v=4"
                        alt="Sakshham"
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover"
                        priority
                    />
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
                        <MdArrowOutward size={26} className="text-primary shrink-0" aria-hidden="true" />
                    </motion.a>
                    <motion.div variants={item}>
                        <Link href="/projects" className="glass glass-link rounded-2xl p-5 flex items-center justify-between gap-2">
                            <span className="tile-label">Projects</span>
                            <MdArrowOutward size={26} className="text-primary shrink-0" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div variants={item} className="glass rounded-2xl p-6 text-tertiary flex flex-col min-h-0">
                <h2 className="tile-title mb-4">Experience</h2>
                <div className="flex flex-1 min-h-0 flex-col justify-between gap-3">
                    {experience.map((area) => (
                        <div key={area.id} className="flex items-center gap-3 border-b border-tertiary/10 pb-3 last:border-b-0 last:pb-0">
                            <span className="text-primary text-xl shrink-0" aria-hidden="true">
                                <Icon name={area.icon} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline justify-between gap-3">
                                    <h3 className="font-bold">{area.org}</h3>
                                    <span className="text-xs text-tertiary/80 whitespace-nowrap">
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
                <motion.div variants={item} className="lg:col-span-2">
                    <ContributionChart cal={cal} />
                </motion.div>
            )}

            <motion.div
                variants={container}
                className={`grid grid-cols-2 gap-4 ${cal ? '' : 'lg:col-span-3 lg:grid-cols-4'}`}
            >
                {socials.map((s) => (
                    <motion.a
                        variants={item}
                        key={s.id}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.id}
                        className="glass glass-link rounded-2xl p-4 flex items-center justify-center text-primary"
                    >
                        {socialIcon(s.id)}
                    </motion.a>
                ))}
                <EmailCard email={profile.email} />
            </motion.div>
        </motion.div>
    );
}
