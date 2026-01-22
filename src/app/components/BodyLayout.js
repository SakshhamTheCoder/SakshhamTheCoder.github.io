'use client';
import Transition from './Transition';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const BodyLayout = ({ children }) => {
    const currentPath = usePathname();

    return (
        <>
            <Transition key={currentPath}>
                <main className="min-h-screen w-full max-w-8xl mx-auto p-4 flex flex-col gap-4">
                    <Navbar />
                    {children}
                </main>
            </Transition>
        </>
    );
};

export default BodyLayout;

