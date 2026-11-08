import { MdCode, MdSchool, MdLocationPin, MdAutoGraph } from 'react-icons/md';
import HighlightedSpan from '../components/HighlightedSpan';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';
import { getProfile, getSkills, getExperience, getAchievements } from '@/lib/content';
import { formatRange } from '@/lib/format';
import { Icon } from '@/lib/icons';

export default async function About() {
    const [profile, SKILLS, experience, achievements] = await Promise.all([
        getProfile(),
        getSkills(),
        getExperience(),
        getAchievements(),
    ]);
    return (
        <motion.div variants={container} initial="hidden" animate="visible" className="flex-1 flex flex-col gap-6">
            <motion.div variants={item} className="px-2 text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    About <HighlightedSpan>Me</HighlightedSpan>
                </h1>
            </motion.div>

            <motion.div variants={container} className="flex flex-col lg:flex-row gap-6">
                <motion.div variants={container} className="flex flex-col gap-4 flex-1">
                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdSchool />
                            <h4 className="font-bold">Education</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            {profile.educationDegree} from {profile.educationSchool}
                        </p>
                        {(profile.educationDates || profile.educationCgpa) && (
                            <p className="text-xs opacity-70 mt-1">
                                {[profile.educationDates, profile.educationCgpa && `CGPA ${profile.educationCgpa}`]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                        )}
                    </motion.div>

                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdLocationPin />
                            <h4 className="font-bold">Location</h4>
                        </div>
                        <p className="text-sm">{profile.location}</p>
                    </motion.div>

                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdCode />
                            <h4 className="font-bold">Primary Focus</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            {profile.focus}
                        </p>
                    </motion.div>

                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdAutoGraph />
                            <h4 className="font-bold">Technical Interests</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            {profile.interests}
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div variants={item} className="glass-navbar rounded-2xl p-6 text-tertiary flex-2">
                    <h2 className="text-lg font-bold text-primary mb-5">Technical Skillset</h2>

                    <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {SKILLS.map((group) => (
                            <motion.div key={group.id} variants={item}>
                                <div className="flex items-center gap-2 mb-3 text-primary">
                                    <span className="text-lg">
                                        <Icon name={group.icon} />
                                    </span>
                                    <h3 className="font-bold text-sm uppercase tracking-wide">{group.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs px-3 py-1 rounded-full border border-tertiary/20 hover:border-primary/40 transition"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {experience.length > 0 && (
                <motion.div variants={item} className="glass-navbar rounded-2xl p-6 text-tertiary">
                    <h2 className="text-lg font-bold text-primary mb-5">Experience</h2>
                    <div className="flex flex-col gap-5">
                        {experience.map((e) => (
                            <div key={e.id} className="border-b border-tertiary/10 pb-4 last:border-b-0 last:pb-0">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                                    <h3 className="font-bold">
                                        {e.org} <span className="font-normal text-sm">· {e.role}</span>
                                    </h3>
                                    <span className="text-xs opacity-70">{formatRange(e.startDate, e.endDate)}</span>
                                </div>
                                {e.bullets?.length > 0 && (
                                    <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                                        {e.bullets.map((b) => (
                                            <li key={b}>{b}</li>
                                        ))}
                                    </ul>
                                )}
                                {e.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {e.skills.map((k) => (
                                            <span key={k} className="text-xs px-3 py-1 rounded-full border border-tertiary/20">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {achievements.length > 0 && (
                <motion.div variants={item} className="glass-navbar rounded-2xl p-6 text-tertiary">
                    <h2 className="text-lg font-bold text-primary mb-5">Achievements & Certifications</h2>
                    <ul className="space-y-2 text-sm">
                        {achievements.map((a) => (
                            <li key={a.id}>
                                <span className="font-bold">{a.title}</span>
                                {a.detail && <span> · {a.detail}</span>}
                                {a.date && <span className="opacity-70"> · {a.date}</span>}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.div>
    );
}
