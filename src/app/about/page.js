'use client';

import {
    MdCode,
    MdSchool,
    MdLocationPin,
    MdTerminal,
    MdCloud,
    MdDevices,
    MdMusicNote,
    MdAutoGraph,
} from 'react-icons/md';
import HighlightedSpan from '../components/HighlightedSpan';

const SKILLS = [
    {
        title: 'Languages',
        icon: <MdTerminal />,
        items: ['Python', 'JavaScript', 'Go', 'C/C++', 'Dart', 'SQL', 'Shell'],
    },
    {
        title: 'Frameworks & Libraries',
        icon: <MdCode />,
        items: ['React', 'Next.js', 'Flutter', 'Express', 'Django REST', 'FastAPI', 'TailwindCSS', 'React Native'],
    },
    {
        title: 'Systems & Tooling',
        icon: <MdAutoGraph />,
        items: ['Linux', 'Git & GitHub', 'Docker', 'NGINX', 'WebSockets', 'CLI / TUI', 'ADB'],
    },
    {
        title: 'Databases & Backend',
        icon: <MdDevices />,
        items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Redis (basic)'],
    },
    {
        title: 'Cloud & Deployment',
        icon: <MdCloud />,
        items: ['GCP', 'Firebase', 'Azure', 'Vercel', 'Netlify', 'Cloudflare'],
    },
    {
        title: 'Creative & Other',
        icon: <MdMusicNote />,
        items: ['FL Studio', 'UI/UX Design', 'Canva', 'MediaPipe', 'OpenCV'],
    },
];

export default function About() {
    return (
        <div className="flex-1 flex flex-col gap-8">
            {/* HEADER */}
            <div className="text-center my-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    About <HighlightedSpan>Me</HighlightedSpan>
                </h1>
            </div>

            {/* TOP SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* QUICK FACTS */}
                <div className="flex flex-col gap-4">
                    <div className="glass rounded-2xl p-5 text-tertiary flex-1">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdSchool />
                            <h4 className="font-bold">Education</h4>
                        </div>
                        <p className="text-sm">
                            B.E. Computer Engineering
                            <br />
                            Thapar Institute of Engineering & Technology
                        </p>
                    </div>

                    <div className="glass rounded-2xl p-5 text-tertiary flex-1">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdLocationPin />
                            <h4 className="font-bold">Based In</h4>
                        </div>
                        <p className="text-sm">India</p>
                    </div>

                    <div className="glass rounded-2xl p-5 text-tertiary flex-1">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdCode />
                            <h4 className="font-bold">Focus</h4>
                        </div>
                        <p className="text-sm">Systems, developer tools, full-stack products, applied research</p>
                    </div>
                </div>

                {/* SKILLSET (PRIMARY CONTENT) */}
                <div className="lg:col-span-2">
                    <div className="glass rounded-2xl p-6 text-tertiary h-full">
                        <h2 className="text-lg font-bold text-primary mb-4 tracking-wide">Technical Skillset</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {SKILLS.map((group) => (
                                <div key={group.title}>
                                    <div className="flex items-center gap-2 mb-2 text-primary">
                                        <span className="text-lg">{group.icon}</span>
                                        <h3 className="font-bold text-sm">{group.title}</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs px-3 py-1 rounded-full border border-tertiary/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

