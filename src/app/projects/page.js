import { getProjects } from '@/lib/content';
import { getStars } from '@/lib/github';
import { PROJECT_SLOTS } from '@/lib/schema';
import ProjectsBoard from '@/app/components/ProjectsBoard';

export default async function Projects() {
    const projects = await getProjects();
    const liveStars = await getStars(projects.map((p) => p.githubRepo).filter(Boolean));
    const stars = Object.fromEntries(projects.map((p) => [p.id, liveStars[p.githubRepo] ?? p.stars ?? null]));

    // Order is the admin list order (position), nothing automatic. The board slots them into sizes and can filter by tech.
    return <ProjectsBoard projects={projects} stars={stars} sizes={PROJECT_SLOTS} />;
}
