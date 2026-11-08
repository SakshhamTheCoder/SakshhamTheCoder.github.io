import { MdArrowOutward } from 'react-icons/md';
import { getProjects } from '@/lib/content';
import { getStars } from '@/lib/github';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';
import { PROJECT_SLOTS } from '@/lib/schema';

// Grid placement per slot (9-column x 3.4-row grid on lg+). Sizes come from PROJECT_SLOTS, which admin shows too.
const SIZE = PROJECT_SLOTS;
const CLS = ['lg:col-span-5 lg:row-span-2', 'lg:col-span-4', 'lg:col-span-4', ...Array(6).fill('lg:col-span-3')];

const MAX_TECH = { large: 8, medium: 4, small: 0 };
const DESC_CLAMP = { large: 'line-clamp-6 font-serif italic text-2xl leading-snug', medium: 'line-clamp-3 text-sm', small: 'line-clamp-2 text-sm' };

function Card({ project, stars, size, cls }) {
    const tech = (project.techStack || []).slice(0, MAX_TECH[size]);
    const more = (project.techStack || []).length - tech.length;
    return (
        <motion.article
            variants={item}
            className={`glass rounded-2xl ${size === 'small' ? 'p-4' : 'p-5'} flex flex-col justify-between gap-2 relative min-h-0 overflow-hidden ${project.link ? 'glass-link' : ''} ${cls}`}
        >
            {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-10 rounded-2xl" aria-label={`View source for ${project.name}`} />
            )}

            <div className="pointer-events-none min-h-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h2 className={`font-bold leading-snug text-primary ${size === 'large' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-base line-clamp-1'}`}>
                        {project.name}
                    </h2>
                    <div className="flex items-center gap-2 shrink-0 text-xs pt-1">
                        {stars > 0 && <span aria-label={`${stars} stars`}>★ {stars}</span>}
                        {project.status && size !== 'small' && (
                            <span className="px-2 py-0.5 rounded-full border border-primary/50 text-accent">{project.status}</span>
                        )}
                    </div>
                </div>
                <p className={`text-tertiary ${DESC_CLAMP[size]}`}>{project.description}</p>
            </div>

            <div className="flex items-end justify-between gap-3 pointer-events-none">
                {tech.length > 0 ? (
                    <ul className="flex flex-wrap gap-1.5">
                        {tech.map((t) => (
                            <li key={t} className="text-[0.6875rem] leading-5 px-2 rounded-full border border-tertiary/20">
                                {t}
                            </li>
                        ))}
                        {more > 0 && <li className="text-[0.6875rem] leading-5 px-1 text-tertiary/80">+{more}</li>}
                    </ul>
                ) : (
                    <span />
                )}
                <div className="relative z-20 flex items-center gap-3 shrink-0">
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="pointer-events-auto text-xs px-3 py-1 rounded-full border border-primary/50 text-accent hover:bg-primary/10 transition"
                        >
                            Live
                        </a>
                    )}
                    {project.link && <MdArrowOutward size={size === 'large' ? '1.625rem' : '1.25rem'} className="text-accent" aria-hidden="true" />}
                </div>
            </div>
        </motion.article>
    );
}

export default async function Projects() {
    const projects = await getProjects();
    const liveStars = await getStars(projects.map((p) => p.githubRepo).filter(Boolean));
    const stars = Object.fromEntries(projects.map((p) => [p.id, liveStars[p.githubRepo] ?? p.stars ?? null]));

    // Order is the admin list order (position), nothing automatic.
    const ranked = projects;
    const shown = ranked.slice(0, SIZE.length);
    const archive = ranked.slice(SIZE.length);

    return (
        <motion.div variants={container} initial="hidden" animate="visible" className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <h1 className="sr-only">Projects</h1>
            <motion.div
                variants={container}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 lg:grid-rows-[1fr_1fr_0.7fr_0.7fr] gap-4 min-h-0 ${archive.length ? 'lg:col-span-9' : 'lg:col-span-12'}`}
            >
                {shown.map((p, i) => (
                    <Card key={p.id || p.name} project={p} stars={stars[p.id]} size={SIZE[i]} cls={`${CLS[i]} ${i === 0 ? 'sm:col-span-2' : ''}`} />
                ))}
            </motion.div>

            {archive.length > 0 && (
                <motion.section variants={item} aria-labelledby="archive-title" className="glass rounded-2xl p-5 lg:col-span-3 min-h-0 flex flex-col gap-3">
                    <h2 id="archive-title" className="tile-title">
                        More projects · {archive.length}
                    </h2>
                    <ul className="flex flex-1 flex-col justify-between gap-1 min-h-0 overflow-y-auto -mx-2">
                        {archive.map((p) => {
                            const Row = p.link ? 'a' : 'div';
                            const tech = (p.techStack || []).slice(0, 3);
                            return (
                                <li key={p.id || p.name}>
                                    <Row
                                        {...(p.link && { href: p.link, target: '_blank', rel: 'noreferrer' })}
                                        className="flex items-start justify-between gap-3 rounded-lg px-2 py-2 hover:bg-tertiary/10 transition-colors"
                                    >
                                        <span className="min-w-0">
                                            <span className="block text-sm font-bold text-tertiary truncate">{p.name}</span>
                                            <span className="text-xs text-tertiary/80 line-clamp-1">{p.description}</span>
                                            {(tech.length > 0 || p.status) && (
                                                <span className="block text-[0.6875rem] text-accent truncate mt-0.5">{[...tech, p.status].filter(Boolean).join(' · ')}</span>
                                            )}
                                        </span>
                                        {p.link && <MdArrowOutward className="text-accent shrink-0 mt-0.5" aria-hidden="true" />}
                                    </Row>
                                </li>
                            );
                        })}
                    </ul>
                </motion.section>
            )}
        </motion.div>
    );
}
