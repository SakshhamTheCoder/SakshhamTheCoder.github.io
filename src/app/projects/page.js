import { MdArrowOutward } from 'react-icons/md';
import HighlightedSpan from '../components/HighlightedSpan';
import { getProjects } from '@/lib/content';
import { getStars } from '@/lib/github';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';

export default async function Projects() {
    const projects = await getProjects();
    const liveStars = await getStars(projects.map((p) => p.githubRepo).filter(Boolean));
    const stars = Object.fromEntries(projects.map((p) => [p.id, liveStars[p.githubRepo] ?? p.stars ?? null]));

    return (
        <motion.div variants={container} initial="hidden" animate="visible" className="flex-1 flex flex-col gap-4">
            <motion.div variants={item} className="text-center my-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    Project <HighlightedSpan>Portfolio</HighlightedSpan>
                </h1>
            </motion.div>

            <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <motion.div
                        variants={item}
                        key={project.id || project.name}
                        className="glass rounded-2xl p-6 group flex flex-col justify-between transition-all relative"
                    >
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute inset-0 z-10"
                                aria-label={`View source for ${project.name}`}
                            />
                        )}

                        <div className="relative z-10 pointer-events-none">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h2 className="text-xl font-bold text-primary">{project.name}</h2>
                                <div className="flex items-center gap-2 shrink-0 text-xs">
                                    {stars[project.id] != null && <span>★ {stars[project.id]}</span>}
                                    {project.status && (
                                        <span className="px-2 py-0.5 rounded-full border border-primary/40 text-primary">
                                            {project.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-tertiary line-clamp-4">{project.description}</p>
                            {project.techStack?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {project.techStack.map((t) => (
                                        <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-tertiary/20">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className="relative z-20 mt-4 flex items-center justify-between
                opacity-100 translate-y-0
                md:opacity-0 md:translate-y-2
                md:group-hover:opacity-100 md:group-hover:translate-y-0
                transition-all duration-200"
                        >
                            {project.liveLink ? (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="pointer-events-auto text-xs px-3 py-1 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition"
                                >
                                    View Live Site
                                </a>
                            ) : (
                                <span />
                            )}

                            {project.link && (
                                <div className="pointer-events-none flex items-center gap-2 text-primary">
                                    <span className="text-sm italic">View Source</span>
                                    <MdArrowOutward size={22} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

