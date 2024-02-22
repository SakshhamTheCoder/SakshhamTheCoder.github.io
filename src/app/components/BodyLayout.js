'use client';
import Transition from './Transition';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';
import ParticlesBackrgound from './ParticlesBackground';

const BodyLayout = ({ children }) => {
    const currentPath = usePathname();

    return (
        <ParticlesBackrgound>
            <Transition key={currentPath}>{children}</Transition>
            <Navbar />
        </ParticlesBackrgound>
    );
};

export default BodyLayout;
