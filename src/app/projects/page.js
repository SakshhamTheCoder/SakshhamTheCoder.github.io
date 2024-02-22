import HighlightedSpan from '../components/HighlightedSpan';

export default function Projects() {
    const projects = [
        {
            name: 'Cowin Certificate Downloader',
            description:
                'An app made in Flutter to easily view and download vaccination certificates generated at official Cowin website.',
            link: 'cowin_certificate_downloader_app',
        },
        {
            name: 'Flutter Youtube Downloade',
            description: 'A Windows App made in Flutter to download mp3 or mp4 from a Youtube video.',
            link: 'flutter_youtube_downloader',
        },
        {
            name: "GDMUN'22 Website",
            description:
                "Website made for posting updates and information about GDMUN'22, a MUN event organised by G.D. Goenka Public School, Jammu.",
            link: 'gdmun2022-website',
        },
        {
            name: 'SabreBOT',
            description: 'A multipurpose Discord bot with various moderation and utility commands.',
            link: 'SABRE-BOT-2.0',
        },

        {
            name: 'Sbotify',
            description: 'A Discord bot for your musical journey.',
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
            link: 'Portanote-App',
        },
        {
            name: 'Canvasify',
            description: 'A website made with NextJS to view your currently playing Spotify song in a beautiful frame.',
            link: 'canvasify',
        },
    ];
    return (
        <main className="px-8 py-24 sm:px-48 sm:py-8 flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-2xl sm:text-8xl font-bold w-full text-center">
                Projects
                <HighlightedSpan>I've worked on</HighlightedSpan>
            </h1>
            <div className="w-full grid grid-rows-1 sm:grid-cols-2 auto-rows-fr">
                {projects.map((project) => (
                    <div
                        key={project.name}
                        className="m-2 flex flex-col sm:flex-row items-center justify-between bg-transparent p-4 rounded-xl border-2 hover:border-primary border-tertiary"
                    >
                        <div className="sm:w-3/4 px-2">
                            <h2 className="font-bold my-2 text-xl">{project.name}</h2>
                            <p className="my-4 sm:my-2 sm:mr-1">{project.description}</p>
                        </div>
                        <div className="flex justify-center items-center sm:w-1/4">
                            <a
                                href={'https://github.com/SakshhamTheCoder/' + project.link}
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
