'use client';
import {
    FaEnvelope,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaSoundcloud,
    FaSpotify,
    FaTwitter,
    FaRedditAlien,
    FaSteam,
} from 'react-icons/fa';
import HighlightedSpan from '../components/HighlightedSpan';
import { useState } from 'react';

export default function Socials() {
    const socials = [
        {
            name: 'GitHub',
            icon: <FaGithub size={40} />,
            link: 'https://github.com/sakshhamthecoder',
        },
        {
            name: 'SoundCloud',
            icon: <FaSoundcloud size={40} />,
            link: 'https://soundcloud.com/skshhm',
        },
        {
            name: 'Instagram',
            icon: <FaInstagram size={40} />,
            link: 'https://instagram.com/iamsakshham_28',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin size={40} />,
            link: 'https://linkedin.com/in/sakshhamthecoder',
        },
        {
            name: 'Twitter',
            icon: <FaTwitter size={40} />,
            link: 'https://twitter.com/iamsakshham_28',
        },
        {
            name: 'Spotify',
            icon: <FaSpotify size={40} />,
            link: 'https://open.spotify.com/artist/7nCJcYHdNQNrZA7Px7TbZG',
        },
        {
            name: 'Reddit',
            icon: <FaRedditAlien size={40} />,
            link: 'https://www.reddit.com/user/sakshhamthegamer',
        },
        {
            name: 'Steam',
            icon: <FaSteam size={40} />,
            link: 'https://steamcommunity.com/id/stg28',
        },
        {
            name: 'Email',
            icon: <FaEnvelope size={40} />,
            link: 'mailto:sakshhamtg@gmail.com',
        },
    ];

    const [tooltip, setTooltip] = useState('');

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-5xl sm:text-8xl font-bold w-full text-center">
                Have a <HighlightedSpan>talk</HighlightedSpan>
            </h1>
            <div className="sm:w-1/4 grid grid-cols-3 auto-rows-fr">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        className="sm:hover:border-primary sm:hover:bg-primary m-2 flex flex-row items-center justify-center bg-transparent p-4 rounded-xl border-2 border-tertiary"
                        onMouseEnter={() => setTooltip(social.name)}
                        onMouseLeave={() => setTooltip('')}
                    >
                        <div className="flex justify-center items-center">{tooltip !== social.name && social.icon}</div>
                        {tooltip === social.name && (
                            <div className="absolute bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm">
                                {social.name}
                            </div>
                        )}
                    </a>
                ))}
            </div>
        </main>
    );
}
