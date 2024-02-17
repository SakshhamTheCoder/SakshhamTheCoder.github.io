import HighlightedSpan from '../components/HighlightedSpan';

export default function Projects() {
    const projects = [
        {
            name: 'Cowin Certificate Downloader',
            description:
                'An app made in Flutter to easily view and download vaccination certificates generated at official Cowin website.',
            link: '',
        },
        {
            name: 'Sbotify',
            description: 'A Discord bot for your musical journey.',
            link: '',
        },
        {
            name: "GDMUN'22 Website",
            description:
                "Website made for posting updates and information about GDMUN'22, a MUN event organised by G.D. Goenka Public School, Jammu.",
            link: '',
        },
        {
            name: 'SabreBOT',
            description: 'A multipurpose Discord bot with various moderation and utility commands.',
            link: '',
        },
        {
            name: 'Flutter Youtube Downloade',
            description: 'A Windows App made in Flutter to download mp3 or mp4 from a Youtube video.',
            link: '',
        },
        {
            name: 'SabreChat',
            description: 'A chat app made with Flutter as frontend and Firebase as backend.',
            link: '',
        },
        {
            name: 'PortaNote',
            description:
                'A website and an app made with NextJS, Flutter and Firebase to take notes and store them online.',
            link: '',
        },
        {
            name: 'Canvasify',
            description: 'A website made with NextJS to view your currently playing Spotify song in a beautiful frame.',
            link: '',
        },
    ];
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-8xl font-bold w-full text-center">
                Projects
                <HighlightedSpan>I've worked on</HighlightedSpan>
            </h1>
            <div className="px-48 py-16 w-full grid grid-cols-2 auto-rows-fr">
                {projects.map((project) => (
                    <div
                        key={project.name}
                        className="m-2 flex flex-row items-center justify-between bg-transparent p-4 rounded-xl border border-tertiary"
                    >
                        <div className="w-3/4 px-2">
                            <h2 className="font-bold my-2 text-xl">{project.name}</h2>
                            <p className="my-2">{project.description}</p>
                        </div>
                        <div className="flex justify-center items-center w-1/4">
                            <a
                                href={project.link}
                                target="_blank"
                                className="bg-primary hover:bg-[#DA003790] font-bold py-2 px-4 rounded-xl w-full text-center"
                            >
                                View Project
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
