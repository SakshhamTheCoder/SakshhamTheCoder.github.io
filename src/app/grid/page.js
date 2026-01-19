'use client';

import { motion } from 'motion/react';
import { FaGithub, FaMusic } from 'react-icons/fa';
import { Code2, User, Layers, GraduationCap, Sparkles, Link2 } from 'lucide-react';

const Tile = ({ icon: Icon, title, children, className }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className={`bg-[#DA003730] backdrop-blur-xl rounded-2xl p-4 shadow-md flex flex-col justify-between ${className}`}
    >
        <div className="flex items-center gap-2 text-primary mb-1">
            <Icon size={16} />
            <span className="text-[11px] uppercase tracking-widest text-primary/80">{title}</span>
        </div>
        <div className="text-white/85 text-[13px] leading-snug font-light">{children}</div>
    </motion.div>
);

export default function Home() {
    return (
        <main className="h-screen px-8 py-20 sm:px-48 sm:py-10 bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a]">
            <div className="grid h-full grid-cols-2 sm:grid-cols-6 auto-rows-fr gap-4">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="col-span-2 sm:col-span-6 rounded-3xl bg-[#DA003750] backdrop-blur-xl p-6 text-center shadow-lg"
                >
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                        Hi 👋 I’m <span className="text-primary">Sakshham</span>
                    </h1>
                    <p className="mt-1 text-white/70 text-sm sm:text-base">Developer • Designer • Music Producer</p>
                </motion.div>

                <Tile icon={User} title="About" className="col-span-2 sm:col-span-3">
                    Computer science student focused on building elegant software & creative experiences.
                </Tile>

                <Tile icon={Code2} title="Skills" className="col-span-1 sm:col-span-2">
                    React, Next.js, Tailwind, Flutter, Firebase, SQL, MongoDB, APIs, Java.
                </Tile>

                <Tile icon={Layers} title="Projects" className="col-span-1 sm:col-span-1">
                    CCS Merch Store, GoSnap, PortaNote, Canvasify, SabreBOT & more.
                </Tile>

                <Tile icon={GraduationCap} title="Education" className="col-span-2 sm:col-span-2">
                    B.Tech in COE — Thapar Institute of Engineering & Technology.
                </Tile>

                <Tile icon={Sparkles} title="Hobbies" className="col-span-1 sm:col-span-2">
                    Music, Gaming, Designing, Photography.
                </Tile>

                <Tile icon={Link2} title="Connect" className="col-span-1 sm:col-span-2">
                    <div className="flex flex-col gap-2 mt-1">
                        <a
                            href="https://github.com/sakshhamthecoder"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary text-sm hover:underline"
                        >
                            <FaGithub /> GitHub
                        </a>
                        <a
                            href="https://music.sakshham.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary text-sm hover:underline"
                        >
                            <FaMusic /> Music Portfolio
                        </a>
                    </div>
                </Tile>
            </div>
        </main>
    );
}

