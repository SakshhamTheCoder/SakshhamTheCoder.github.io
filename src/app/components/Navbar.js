'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdHomeFilled, MdInfo, MdContactPage, MdCode } from 'react-icons/md';
import { useState, useRef } from 'react'; // Add useState import
const links = [
    { href: '/', icon: <MdHomeFilled size={28} />, label: 'Home' },
    { href: '/about', icon: <MdInfo size={28} />, label: 'About' },
    { href: '/projects', icon: <MdCode size={28} />, label: 'Projects' },
    { href: '/socials', icon: <MdContactPage size={28} />, label: 'Socials' },
];

const Navbar = () => {
    const audioRef = useRef();
    const play = () => {
        if (audioRef.current) audioRef.current.play();
        else console.log('Audio ref not found');
    };
    const currentPath = usePathname();
    const [tooltip, setTooltip] = useState(null); // Add tooltip state

    const handleMouseEnter = (label) => {
        setTooltip(label);
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <nav
            className="transition-shadow duration-200
        xl:hover:shadow-[5px_5px_rgba(217,_0,_55,_0.4),_10px_10px_rgba(217,_0,_55,_0.3),_15px_15px_rgba(217,_0,_55,_0.2),_20px_20px_rgba(217,_0,_55,_0.1),_25px_25px_rgba(217,_0,_55,_0.05)] 
        fixed flex sm:h-auto sm:left-auto sm:bottom-auto flex-row sm:flex-col sm:right-0 sm:top-1/2 bottom-0 left-0 right-0 transform -translate-y-1/4 sm:-translate-y-1/2 bg-primary mx-8 p-4 rounded-3xl items-center justify-around sm:justify-center"
        >
            <audio ref={audioRef} src="/click.mp3" />
            {links.map(({ href, label, icon }) => (
                <Link onClick={play} key={`${href}${label}`} href={href}>
                    <div className="relative">
                        <p
                            className={`mx-2 sm:my-4 p-2 sm:p-4 rounded-xl transition-all duration-200 ${
                                currentPath === href
                                    ? 'bg-secondary hover:shadow-[0px_0px_16px_#1C1C1C]'
                                    : 'hover:bg-[#1c1c1c50]'
                            }`}
                            onMouseEnter={() => handleMouseEnter(label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {icon}
                            {tooltip === label && (
                                <div className="hidden sm:block absolute bg-gray-200 text-gray-800 px-2 py-1 rounded-md -left-24 top-1/2 transform -translate-y-1/2">
                                    {tooltip}
                                </div>
                            )}
                        </p>
                    </div>
                </Link>
            ))}
        </nav>
    );
};

export default Navbar;
