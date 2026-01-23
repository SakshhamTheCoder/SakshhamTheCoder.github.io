'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';

const NAV_LINKS = [
    { href: '/projects', label: 'PROJECTS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/resume.pdf', label: 'RESUME', target: '_blank' },
];

const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="sticky top-4 z-50">
            {/* NAV BAR */}
            <div className="glass-navbar rounded-2xl px-6 py-4 relative">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Sakshham Bhagat
                    </Link>

                    <div className="hidden md:flex gap-6 text-xs font-bold tracking-widest uppercase">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                target={link.target}
                                className={`transition-colors ${
                                    isActive(link.href) ? 'text-primary' : 'text-tertiary hover:text-primary'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <button className="md:hidden text-primary text-2xl" onClick={() => setOpen(!open)}>
                        {open ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
            </div>

            {/* POPUP — OUTSIDE */}
            {open && (
                <div className="absolute left-0 right-0 top-full mt-3 glass-navbar-popup rounded-2xl p-4 md:hidden">
                    <div className="flex flex-col gap-4 text-xs font-bold tracking-widest uppercase">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                target={link.target}
                                onClick={() => setOpen(false)}
                                className={`transition-colors ${
                                    isActive(link.href) ? 'text-primary' : 'text-tertiary hover:text-primary'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
