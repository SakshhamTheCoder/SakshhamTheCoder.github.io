'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MdMenu, MdClose } from 'react-icons/md';
import { ease } from './Transition';

const NAV_LINKS = [
    { href: '/projects', label: 'PROJECTS' },
    { href: '/about', label: 'ABOUT' },
];

const linkBase = 'relative rounded-full px-3 py-1.5 transition-colors duration-200';

const Navbar = ({ resumeLink }) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const nav = useRef(null);
    const toggle = useRef(null);

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    // The phone menu closes on Escape (focus returns to its button) and on a press outside it.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key !== 'Escape') return;
            setOpen(false);
            toggle.current?.focus();
        };
        const onPress = (e) => {
            if (!nav.current?.contains(e.target)) setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        window.addEventListener('pointerdown', onPress);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('pointerdown', onPress);
        };
    }, [open]);

    return (
        <nav ref={nav} aria-label="Main" className="sticky top-0 z-50">
            <div className="glass rounded-2xl px-6 py-3 relative">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Sakshham Bhagat
                    </Link>

                    <div className="hidden md:flex gap-3 text-sm font-bold tracking-[0.16em] uppercase -mr-3">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`${linkBase} ${active ? 'text-accent' : 'text-tertiary hover:text-accent'}`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full border border-primary/40 bg-primary/10"
                                            transition={{ duration: 0.4, ease }}
                                        />
                                    )}
                                    <span className="relative">{link.label}</span>
                                </Link>
                            );
                        })}

                        {resumeLink && (
                            <a href={resumeLink} target="_blank" rel="noreferrer" className={`${linkBase} text-tertiary hover:text-accent`}>
                                RESUME
                            </a>
                        )}
                    </div>

                    <button
                        ref={toggle}
                        className="md:hidden text-accent text-3xl p-1 -mr-1"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.3, ease }}
                        className="absolute left-0 right-0 top-full mt-3 glass-navbar-popup rounded-2xl p-4 md:hidden origin-top"
                    >
                        <div className="flex flex-col gap-4 text-sm font-bold tracking-[0.16em] uppercase">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={isActive(link.href) ? 'page' : undefined}
                                    onClick={() => setOpen(false)}
                                    className={`transition-colors ${isActive(link.href) ? 'text-accent' : 'text-tertiary hover:text-accent'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {resumeLink && (
                                <a
                                    href={resumeLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="text-tertiary hover:text-accent transition-colors"
                                >
                                    RESUME
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
