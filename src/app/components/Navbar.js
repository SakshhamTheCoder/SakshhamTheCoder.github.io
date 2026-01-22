'use client';

import Link from 'next/link';

const NAV_LINKS = [
    { href: '/projects', label: 'PROJECTS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/resume.pdf', label: 'RESUME', target: '_blank' },
];

const Navbar = () => {
    return (
        <nav className="sticky top-4 z-50">
            <div className="glass rounded-2xl px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-primary">Sakshham Bhagat</h1>

                    <div className="flex gap-6 text-xs font-bold tracking-widest text-tertiary uppercase">
                        {NAV_LINKS.map((link) =>
                            link.target ? (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-orange-600 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-orange-600 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
