'use client';
import Transition from './Transition';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const BodyLayout = ({ children, resumeLink }) => {
    const currentPath = usePathname();
    return (
        <main className="min-h-dvh fit:h-dvh fit:overflow-hidden w-full max-w-[112.5rem] mx-auto p-4 flex flex-col gap-4">
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] glass-navbar-popup rounded-full px-4 py-2 text-sm font-bold text-accent"
            >
                Skip to content
            </a>
            <Navbar resumeLink={resumeLink} />
            <Transition key={currentPath} id="content" className="flex-1 min-h-0 flex flex-col">
                {children}
            </Transition>
        </main>
    );
};

export default BodyLayout;
