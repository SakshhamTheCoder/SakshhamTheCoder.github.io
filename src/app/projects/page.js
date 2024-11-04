import HighlightedSpan from '../components/HighlightedSpan';

export default function Projects() {
    const projects = [
        {
            name: 'CCS Merch Store',
            description:
                'A merch store website made for Creative Computing Society.',
            link: 'https://github.com/creative-computing-society/merch-store/',
        },
        {
            name: 'GoSnap',
            description: 'A website for editing images with various filters, effects and tools',
            link: 'https://github.com/SakshhamTheCoder/GoSnap',
        },
        {
            name: 'PortaNote App',
            description:
                'An app made with Flutter and Firebase to take notes and store them online.',
            link: 'https://github.com/SakshhamTheCoder/Portanote-App',
        },
        {
            name: 'PortaNote Web',
            description:
                'A website made with NextJS and Firebase to take notes and store them online.',
            link: 'https://github.com/SakshhamTheCoder/Portanote-Web',
        },
        {
            name: 'Cowin Certificate Downloader',
            description:
                'An app made in Flutter to easily view and download vaccination certificates generated at official Cowin website.',
            link: 'https://github.com/SakshhamTheCoder/cowin_certificate_downloader_app',
        },
        {
            name: 'SKSHHM Music Portfolio Website',
            description:
                'A website I made to showcase my music portfolio.',
            link: 'https://github.com/SakshhamTheCoder/SKSHHM-Music',
        },
        {
            name: 'Thapar Class Checker (broken/old)',
            description:
                'An app made in Flutter to view your class schedule at a glance even when offline',
            link: 'https://github.com/SakshhamTheCoder/thapar_class_checker',
        },
        {
            name: 'Flutter Youtube Downloader',
            description: 'A Windows App made in Flutter to download mp3 or mp4 from a Youtube video.',
            link: 'https://github.com/SakshhamTheCoder/flutter_youtube_downloader',
        },
        {
            name: "GDMUN'22 Website",
            description:
                "Website made for posting updates and information about GDMUN'22, a MUN event organised by G.D. Goenka Public School, Jammu.",
            link: 'https://github.com/SakshhamTheCoder/gdmun2022-website',
        },
        {
            name: 'Canvasify',
            description: 'A website made with NextJS to view your currently playing Spotify song in a beautiful frame.',
            link: 'https://github.com/SakshhamTheCoder/canvasify',
        },
        {
            name: 'SabreBOT',
            description: 'A multipurpose Discord bot with various moderation and utility commands.',
            link: 'https://github.com/SakshhamTheCoder/SABRE-BOT-2.0',
        },
        {
            name: 'SabreChat (private)',
            description: 'A chat app made with Flutter as frontend and Firebase as backend.',
            link: '',
        },
    ];
    return (
        <main className="px-8 py-24 sm:px-48 sm:py-8 flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-4xl sm:text-8xl font-bold w-full text-center">
                Projects <HighlightedSpan>I've worked on</HighlightedSpan>
            </h1>
            <div className="w-full grid grid-rows-1 sm:grid-cols-2 auto-rows-fr">
                {projects.map((project) => (
                    <div
                        key={project.name}
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
