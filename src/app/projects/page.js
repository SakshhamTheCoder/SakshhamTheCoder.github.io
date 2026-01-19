import HighlightedSpan from '../components/HighlightedSpan';

// Fetch on server at build / revalidation time
async function getProjects() {
    const res = await fetch(`http://localhost:3000/api/projects`, { next: { revalidate: 300 } });

    if (!res.ok) {
        console.error('Failed to fetch projects at build/server');
        return [];
    }

    const json = await res.json();
    return json.projects || [];
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <main className="px-8 py-24 sm:px-48 sm:py-8 flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-4xl sm:text-8xl font-bold w-full text-center">
                Projects <HighlightedSpan>I've worked on</HighlightedSpan>
            </h1>

            <div className="w-full grid grid-rows-1 sm:grid-cols-2 auto-rows-fr">
                {projects.map((project) => (
                    <div
                        key={project.id || project.name}
                        className="m-2 flex flex-col sm:flex-row items-center justify-between bg-transparent p-4 rounded-xl border-2 sm:hover:border-primary border-tertiary"
                    >
                        <div className="sm:w-3/4 px-2">
                            <h2 className="font-bold my-2 text-xl">{project.name}</h2>
                            <p className="my-4 sm:my-2 sm:mr-1">{project.description}</p>
                        </div>
                        <div className="flex justify-center items-center sm:w-1/4">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary hover:bg-[#DA003790] font-bold py-2 px-4 rounded-xl w-full text-center"
                            >
                                View Source
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

