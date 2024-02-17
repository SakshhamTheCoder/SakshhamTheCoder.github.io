'use client';
import Transition from './Transition';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const BodyLayout = ({ children }) => {
    const currentPath = usePathname();

    return (
        <>
            <Transition key={currentPath}>{children}</Transition>
            <Navbar />
        </>
    );
};

export default BodyLayout;
