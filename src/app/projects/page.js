import { MdArrowOutward } from 'react-icons/md';
import Link from 'next/link';
import HighlightedSpan from '../components/HighlightedSpan';
import { getProjects } from '@/lib/getProjects';

export default async function Projects() {
    const projects = await getProjects();
    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="text-center my-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    Project <HighlightedSpan>Portfolio</HighlightedSpan>
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <Link
                        key={project.id || project.name}
                        href={project.link}
                        target="_blank"
                        className="glass rounded-2xl p-6 group flex flex-col justify-between transition-all"
                    >
                        <div>
                            <h2 className="text-xl font-bold text-primary mb-2">{project.name}</h2>
                            <p className="text-sm text-tertiary line-clamp-4">{project.description}</p>
                        </div>

                        <div className="flex items-center gap-2 text-primary mt-4 self-end">
                            <span className="text-sm italic opacity-0 group-hover:opacity-100 transition-opacity">
                                View
                            </span>
                            <MdArrowOutward size={22} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

