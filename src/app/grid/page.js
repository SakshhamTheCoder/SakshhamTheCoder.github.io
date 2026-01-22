'use client';

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaBehance, FaSpotify, FaMusic } from 'react-icons/fa';
import { MdArrowOutward } from 'react-icons/md';
import Image from 'next/image';

const FOCUS_AREAS = [
    { id: 1, title: 'Full Stack Dev', desc: 'Building scalable web apps', icon: <MdArrowOutward /> },
    { id: 2, title: 'Music Production', desc: 'Creating sonic experiences', icon: <FaSpotify /> },
    { id: 3, title: 'UI/UX Design', desc: 'Crafting intuitive interfaces', icon: <MdArrowOutward /> },
];

const SOCIALS = [
    { id: 'linkedin', href: 'https://linkedin.com', icon: <FaLinkedin /> },
    { id: 'email', href: 'mailto:sakshham.bg@gmail.com', icon: <FaEnvelope /> },
    { id: 'behance', href: 'https://behance.com', icon: <FaBehance /> },
    { id: 'instagram', href: 'https://instagram.com', icon: <FaInstagram /> },
    { id: 'github', href: 'https://github.com', icon: <FaGithub /> },
    { id: 'music_portfolio', href: 'https://music.sakshham.tech', icon: <FaMusic /> },
];

export default function Home() {
    return (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* LEFT */}
            <div className="flex flex-col gap-4">
                <div className="glass rounded-2xl p-6 flex flex-1 items-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-balance font-bold md:text-end text-primary leading-tight">
                        Developer & Music Producer
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {SOCIALS.slice(4, 6).map((s) => (
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
                        <span className="italic text-xl mr-1 text-primary">Hi there! </span>I build software systems and
                        developer tools across web, mobile, and system-level domains, focusing on performance,
                        reliability, and usability. I enjoy building products end-to-end, from implementation to
                        deployment and real-world iteration.
                    </p>
                </div>
            </div>

            {/* MIDDLE */}
            <div className="flex-col gap-4 hidden md:flex">
                <div className="glass rounded-2xl relative overflow-hidden aspect-auto flex-1">
                    <Image src="/og-image.jpeg" alt="Sakshham" fill className="object-cover" priority />
                </div>

                <div className="glass rounded-2xl p-5 flex items-center gap-4 text-tertiary">
                    <div className="text-primary">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium">
                        Currently open to work <br />
                        <strong>& collaborations.</strong>
                    </p>
                </div>

                <a
                    href="mailto:sakshham.bg@gmail.com"
                    className="glass rounded-2xl p-6 flex justify-between items-end text-tertiary"
                >
                    <h3 className="text-4xl font-serif italic">Say Hi</h3>
                    <MdArrowOutward size={28} className="text-primary" />
                </a>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4">
                <div className="glass rounded-2xl flex-1 p-6 text-tertiary">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4">Focus Areas</h3>

                    <div className="space-y-4">
                        {FOCUS_AREAS.map((area) => (
                            <div key={area.id} className="border-b border-white/30 pb-3">
                                <div className="flex gap-3">
                                    <div className="text-primary">{area.icon}</div>
                                    <div>
                                        <h4 className="font-bold">{area.title}</h4>
                                        <p className="text-sm">{area.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {SOCIALS.slice(0, 4).map((s) => (
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

