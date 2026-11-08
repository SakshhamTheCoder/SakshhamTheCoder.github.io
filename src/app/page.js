import { MdArrowOutward } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { getResumeLink, getProfile, getExperience, getNow } from '@/lib/content';
import { formatRange } from '@/lib/format';
import { Icon, SOCIAL_ICONS } from '@/lib/icons';
import { FaGlobe } from 'react-icons/fa';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';
import EmailCard from '@/app/components/EmailCard';
import ContributionChart from '@/app/components/ContributionChart';

const socialIcon = (id) => {
    const C = SOCIAL_ICONS[id] || FaGlobe;
    return <C size={36} />;
};

export default async function Home() {
    const [resumeLink, profile, allExperience, now] = await Promise.all([
        getResumeLink(),
        getProfile(),
        getExperience(),
        getNow(),
    ]);
    const experience = allExperience.filter((e) => e.showOnHome).slice(0, 6);
    const socials = profile.socials || [];
    const [before, after] = (profile.aboutShort || '').split(profile.aboutHighlight || '\0');

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[1fr_auto] gap-4"
        >
            <motion.div variants={container} className="flex flex-col gap-4">
                <motion.div variants={item} className="glass rounded-2xl p-6 flex flex-1 items-center">
                    <div className="flex flex-col gap-3 md:items-end">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-balance font-bold md:text-end text-primary leading-tight text-center">
                            <span className="text-tertiary"> I am a </span>
                            {(profile.heroLine || 'Developer & Music Producer').split('&').map((part, i) => (
                                <span key={i}>
                                    {i > 0 && <span className="text-tertiary"> & </span>}
                                    {part.trim()}
                                </span>
                            ))}
                        </h2>
                        {now && <p className="text-sm text-tertiary italic text-center md:text-end">Now: {now}</p>}
                    </div>
                </motion.div>

                <motion.div variants={container} className="grid grid-cols-2 gap-4 flex-1">
                    {socials.slice(1, 3).map((s) => (
                        <motion.a
                            variants={item}
                            key={s.id}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="glass rounded-2xl p-6 flex items-center justify-center text-2xl text-primary"
                        >
                            {socialIcon(s.id)}
                        </motion.a>
                    ))}
                </motion.div>
                <motion.div variants={item} className="glass rounded-2xl p-6 text-tertiary group">
                    <Link href="/about">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-serif italic">About</span>
                            <MdArrowOutward size={28} className="text-primary" />
                        </div>
                        <p className="text-md">
                            {after === undefined ? (
                                before
                            ) : (
                                <>
                                    {before}
                                    <span className="italic mx-1 text-primary">{profile.aboutHighlight}</span>
                                    {after}
                                </>
                            )}
                        </p>
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div variants={container} className="flex flex-col gap-4">
                <motion.div
                    variants={item}
                    className="glass rounded-2xl relative overflow-hidden aspect-4/3 lg:aspect-auto flex-1"
                >
                    <Image
                        src="https://avatars.githubusercontent.com/u/74554569?v=4"
                        alt="Sakshham"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <motion.a
                    variants={item}
                    href={resumeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="glass rounded-2xl p-6 flex items-center justify-between gap-4 text-tertiary"
                >
                    <span className="text-4xl font-serif italic">Resume</span>
                    <MdArrowOutward size={28} className="text-primary" />
                </motion.a>

                <motion.div variants={item}>
                    <Link
                        href="/projects"
                        className="glass rounded-2xl p-6 flex justify-between items-center text-tertiary"
                    >
                        <span className="text-4xl font-serif italic">Projects</span>
                        <MdArrowOutward size={28} className="text-primary" />
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div variants={container} className="flex flex-col gap-4">
                <motion.div variants={item} className="glass rounded-2xl flex-1 p-6 text-tertiary">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4">Experience</h3>

                    <div className="space-y-4">
                        {experience.map((area) => (
                            <div key={area.id} className="border-b border-tertiary/10 pb-3 last:border-b-0 last:pb-0">
                                <div className="flex gap-3">
                                    <div className="text-primary self-center text-xl">
                                        <Icon name={area.icon} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{area.org}</h4>
                                        <p className="text-sm">{area.role}</p>
                                        {formatRange(area.startDate, area.endDate) && (
                                            <p className="text-xs opacity-70">{formatRange(area.startDate, area.endDate)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={container} className="grid grid-cols-2 gap-4 flex-1">
                    <EmailCard email={profile.email} />
                    {socials.slice(0, 1).map((s) => (
                        <motion.a
                            variants={item}
                            key={s.id}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="glass rounded-2xl p-6 flex items-center justify-center text-2xl text-primary"
                        >
                            {socialIcon(s.id)}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div variants={item} className="lg:col-span-3 empty:hidden">
                <ContributionChart />
            </motion.div>
        </motion.div>
    );
}

