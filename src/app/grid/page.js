'use client';

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaBehance, FaMusic, FaGoogle } from 'react-icons/fa';
import { MdArrowOutward, MdWork, MdSchool, MdGroups } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

const EXPERIENCE = [
    {
        id: 1,
        title: 'Samsung R&D',
        desc: 'PRISM Intern · Agentic AI Research',
        icon: <MdWork />,
    },
    {
        id: 2,
        title: 'Thapar University',
        desc: 'Student Research Intern · GA Based Timetable Frontend',
        icon: <MdSchool />,
    },
    {
        id: 3,
        title: 'Open Source',
        desc: 'Maintainer of ADBT · 70+ GitHub Stars',
        icon: <FaGithub />,
    },
    {
        id: 4,
        title: 'Creative Computing Society',
        desc: 'Core Member',
        icon: <MdGroups />,
    },
    {
        id: 5,
        title: 'Google Developer Student Clubs',
        desc: 'Associate App Dev Mentor',
        icon: <FaGoogle />,
    },
    {
        id: 6,
        title: 'Music Producer',
        desc: 'EDM Producer',
        icon: <FaMusic />,
    },
];

const SOCIALS = [
    { id: 'linkedin', href: 'https://linkedin.com', icon: <FaLinkedin /> },
    { id: 'email', href: 'mailto:sakshham.bg@gmail.com', icon: <FaEnvelope /> },
    { id: 'github', href: 'https://github.com', icon: <FaGithub /> },
    { id: 'music', href: 'https://music.sakshham.tech', icon: <FaMusic /> },
];

export default function Home() {
    return (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* LEFT */}
            <div className="flex flex-col gap-4">
                <div className="glass rounded-2xl p-6 flex flex-1 items-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-balance font-bold md:text-end text-primary leading-tight">
                        <span className="text-tertiary"> I am a </span>
                        Developer
                        <span className="text-tertiary"> & </span>
                        Music Producer
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {SOCIALS.slice(2, 4).map((s) => (
                        <a
                            key={s.id}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="glass rounded-2xl p-6 flex items-center justify-center text-2xl text-primary"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                <div className="glass rounded-2xl p-6 text-tertiary">
                    <div className="text-primary text-3xl mb-3">
                        <MdArrowOutward />
                    </div>
                    <p className="text-md">
                        I build software systems and
                        <span className="italic ml-1 mr-1 text-primary">
                            developer tools across web, mobile, and system-level domains
                        </span>
                        , focusing on performance, reliability, and usability. I enjoy building products end-to-end,
                        from implementation to deployment and real-world iteration.
                    </p>
                </div>
            </div>

            {/* MIDDLE */}
            <div className="flex-col gap-4 hidden md:flex">
                <div className="glass rounded-2xl relative overflow-hidden aspect-auto flex-1">
                    <Image
                        src="https://avatars.githubusercontent.com/u/74554569?v=4"
                        alt="Sakshham"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="glass rounded-2xl p-6 flex items-center justify-between gap-4 text-tertiary"
                >
                    <span className="text-4xl font-serif italic">Resume</span>
                    <MdArrowOutward size={28} className="text-primary" />
                </a>

                <Link
                    href="/projects"
                    className="glass rounded-2xl p-6 flex justify-between items-center text-tertiary"
                >
                    <span className="text-4xl font-serif italic">Projects</span>
                    <MdArrowOutward size={28} className="text-primary" />
                </Link>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4">
                <div className="glass rounded-2xl flex-1 p-6 text-tertiary">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4">Experience</h3>

                    <div className="space-y-4">
                        {EXPERIENCE.map((area) => (
                            <div key={area.id} className="border-b border-tertiary/10 pb-3 last:border-b-0 last:pb-0">
                                <div className="flex gap-3">
                                    <div className="text-primary self-center text-xl">{area.icon}</div>
                                    <div>
                                        <h4 className="font-bold">{area.title}</h4>
                                        <p className="text-sm">{area.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1">
                    {SOCIALS.slice(0, 2).map((s) => (
                        <a
                            key={s.id}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="glass rounded-2xl p-6 flex items-center justify-center text-2xl text-primary"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

