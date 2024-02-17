import { FaGithub, FaInstagram, FaLinkedin, FaSoundcloud, FaTwitter } from 'react-icons/fa';
import HighlightedSpan from '../components/HighlightedSpan';
export default function Socials() {
    const socials = [
        {
            name: 'GitHub',
            icon: <FaGithub size={40} />,
            link: '',
        },
        {
            name: 'SoundCloud',
            icon: <FaSoundcloud size={40} />,
            link: '',
        },
        {
            name: 'Instagram',
            icon: <FaInstagram size={40} />,
            link: '',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin size={40} />,
            link: '',
        },
        {
            name: 'Twitter',
            icon: <FaTwitter size={40} />,
            link: '',
        },
    ];
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-8xl font-bold w-full text-center">
                Have a<HighlightedSpan>talk</HighlightedSpan>
            </h1>
            <div className="px-48 py-16 w-1/2 grid grid-cols-3 auto-rows-fr">
                {socials.map((social) => (
                    <div
                        key={social.name}
                        className="hover:border-primary hover:bg-primary m-2 flex flex-row items-center justify-center bg-transparent p-4 rounded-xl border-2 border-tertiary"
                    >
                        <a href={social.link} className="flex justify-center items-center">
                            {social.icon}
                        </a>
                    </div>
                ))}
            </div>
        </main>
    );
}
