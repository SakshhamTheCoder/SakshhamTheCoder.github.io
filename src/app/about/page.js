import { MdLocationPin, MdEmojiEvents, MdVerified, MdSchool } from 'react-icons/md';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';
import { getProfile, getSkills, getExperience, getAchievements } from '@/lib/content';
import { formatRange } from '@/lib/format';
import { Icon } from '@/lib/icons';

// Tiles scroll inside themselves if content outgrows them; the page never scrolls on lg.
const tile = 'glass rounded-2xl p-5 text-tertiary min-h-0 overflow-y-auto';

// Achievement: "Title · detail · year".
function Award({ a }) {
    return (
        <>
            <span className="font-bold">{a.title}</span>
            {a.detail && <span> · {a.detail}</span>}
            {a.date && <span className="text-tertiary/80"> · {a.date}</span>}
        </>
    );
}

// Certification: "Org: Certificate name · year". Write the title as "Org: Name" in admin and put the year in Date.
function Cert({ a }) {
    const i = a.title.indexOf(': ');
    const org = i > 0 ? a.title.slice(0, i + 1) : '';
    const name = i > 0 ? a.title.slice(i + 2) : a.title;
    return (
        <>
            {org && <span className="font-bold">{org} </span>}
            <span>{name}</span>
            {a.date && <span className="text-tertiary/80"> · {a.date}</span>}
        </>
    );
}

function Group({ id, title, entries, className }) {
    if (!entries.length) return null;
    return (
        <motion.section variants={item} style={{ flexGrow: entries.length }} className={`${tile} flex flex-col ${className}`} aria-labelledby={id}>
            <h2 id={id} className="tile-title mb-3">
                {title}
            </h2>
            <ul className="flex flex-1 flex-col justify-between gap-3">
                {entries.map((t) => (
                    <li key={t.id} className="flex items-center gap-3">
                        <span className="text-primary text-xl shrink-0" aria-hidden="true">
                            <Icon name={t.icon} />
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-3">
                                <h3 className="font-bold text-sm">{t.title}</h3>
                                {t.range && <span className={`text-xs tabular-nums whitespace-nowrap ${t.now ? 'text-accent' : 'text-tertiary/80'}`}>{t.range}</span>}
                            </div>
                            <p className="text-xs leading-snug">{t.sub}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.section>
    );
}

export default async function About() {
    const [profile, SKILLS, experience, achievements] = await Promise.all([
        getProfile(),
        getSkills(),
        getExperience(),
        getAchievements(),
    ]);

    const entry = (e) => ({ id: e.id, icon: e.icon, title: e.org, sub: e.role, range: formatRange(e.startDate, e.endDate), now: Boolean(e.startDate && !e.endDate) });
    // Not one timeline: paid/research roles are dated and sequential, the rest run in parallel.
    const work = experience.filter((e) => ['work', 'research'].includes(e.kind)).map(entry);
    const beyond = experience.filter((e) => !['work', 'research'].includes(e.kind)).map(entry);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1.7fr)_minmax(0,1fr)] gap-4"
        >
            <h1 className="sr-only">About Sakshham Bhagat</h1>

            <motion.div variants={container} className="lg:col-span-4 lg:row-span-2 flex flex-col gap-4 min-h-0 order-3 lg:order-none">
                {/* Tiles grow in proportion to their entries, so a short list is not stretched into a tall, empty tile. */}
                <Group id="work-title" title="Work & research" entries={work} className="lg:basis-auto" />
                <Group id="beyond-title" title="Community, open source & music" entries={beyond} className="lg:basis-auto" />
                {profile.educationSchool && (
                    // Same anatomy as the lists above: title on top, then an icon beside the entry.
                    <motion.section variants={item} className={`${tile} flex flex-col`} aria-labelledby="edu-title">
                        <h2 id="edu-title" className="tile-title mb-3">
                            Education
                        </h2>
                        <div className="flex items-center gap-3">
                            <MdSchool className="text-primary text-xl shrink-0" aria-hidden="true" />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline justify-between gap-3">
                                    <h3 className="font-bold text-sm">{profile.educationSchool}</h3>
                                    <span className="text-xs tabular-nums text-tertiary/80 whitespace-nowrap">{profile.educationDates}</span>
                                </div>
                                <p className="text-xs leading-snug">
                                    {[profile.educationDegree, profile.educationCgpa && `CGPA ${profile.educationCgpa}`].filter(Boolean).join(' · ')}
                                </p>
                            </div>
                        </div>
                    </motion.section>
                )}
            </motion.div>

            <motion.section variants={item} className={`${tile} lg:col-span-8 order-2 lg:order-none`} aria-labelledby="skills-title">
                <h2 id="skills-title" className="tile-title mb-3">
                    Technical skillset
                </h2>
                <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-2">
                    {SKILLS.map((group) => (
                        <motion.div key={group.id} variants={item}>
                            <h3 className="flex items-center gap-2 mb-1 text-sm font-bold text-tertiary">
                                <span className="text-primary text-base" aria-hidden="true">
                                    <Icon name={group.icon} />
                                </span>
                                {group.title}
                            </h3>
                            <ul className="flex flex-wrap gap-1">
                                {group.items.map((skill) => (
                                    <li key={skill} className="text-xs leading-5 px-2 rounded-full border border-tertiary/20 hover:border-primary/50 hover:text-accent transition-colors">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            <motion.section variants={item} className={`${tile} lg:col-span-4 flex flex-col justify-between gap-2 order-1 lg:order-none`} aria-label="Focus">
                <p className="font-serif italic text-2xl leading-tight text-tertiary">{profile.focus}</p>
                <div className="flex flex-col gap-1.5">
                    <p className="text-sm leading-snug">{profile.interests}</p>
                    {profile.location && (
                        <p className="flex items-center gap-1.5 text-xs text-accent">
                            <MdLocationPin aria-hidden="true" /> {profile.location}
                        </p>
                    )}
                </div>
            </motion.section>

            {achievements.length > 0 && (
                <motion.section variants={item} className={`${tile} lg:col-span-4 order-4 lg:order-none flex flex-col lg:justify-between gap-3`} aria-labelledby="ach-title">
                    <h2 id="ach-title" className="tile-title">
                        Recognition
                    </h2>
                    {[
                        { id: 'award', label: 'Achievements', Mark: MdEmojiEvents, items: achievements.filter((a) => a.kind !== 'certification') },
                        { id: 'certification', label: 'Certifications', Mark: MdVerified, items: achievements.filter((a) => a.kind === 'certification') },
                    ]
                        .filter((g) => g.items.length)
                        .map((g) => (
                            <div key={g.id}>
                                <h3 className="tile-subtitle flex items-center gap-1.5 mb-1.5">
                                    <g.Mark className="text-primary text-base" aria-hidden="true" />
                                    {g.label}
                                </h3>
                                <ul className="flex flex-col gap-1.5 text-sm leading-snug">
                                    {g.items.map((a) => (
                                        <li key={a.id}>{g.id === 'certification' ? <Cert a={a} /> : <Award a={a} />}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </motion.section>
            )}
        </motion.div>
    );
}
