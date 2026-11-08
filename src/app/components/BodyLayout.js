'use client';
import Transition from './Transition';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const BodyLayout = ({ children, resumeLink }) => {
    const currentPath = usePathname();
    return (
        <main className="min-h-dvh fit:h-dvh fit:overflow-hidden w-full max-w-[1800px] mx-auto p-4 flex flex-col gap-4">
            <Navbar resumeLink={resumeLink} />
            <Transition key={currentPath} className="flex-1 min-h-0 flex flex-col">
                {children}
            </Transition>
        </main>
    );
};

export default BodyLayout;
