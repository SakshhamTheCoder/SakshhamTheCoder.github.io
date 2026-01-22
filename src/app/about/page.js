'use client';
import { MdPerson, MdLocationPin, MdSchool, MdMilitaryTech, MdMiscellaneousServices, MdEvent } from 'react-icons/md';
import HighlightedSpan from '../components/HighlightedSpan';

export default function About() {
    const bday = new Date('2005-03-28');
    const ageDifMs = Date.now() - bday.getTime();
    const years = Math.abs(new Date(ageDifMs).getFullYear() - 1970);
    const months = new Date(ageDifMs).getMonth();
    const days = new Date(ageDifMs).getDate();

    const aboutCards = [
        { title: 'Full Name', description: 'Sakshham Bhagat', icon: <MdPerson size={48} /> },
        { title: 'Age', description: `${years} years, ${months} months, ${days} days`, icon: <MdEvent size={48} /> },
        { title: 'Location', description: 'Jammu, Jammu & Kashmir, India', icon: <MdLocationPin size={48} /> },
        {
            title: 'Education',
            description: 'B.Tech. in COE from Thapar Institute of Engineering & Technology, Patiala, Punjab, India',
            icon: <MdSchool size={48} />,
        },
        {
            title: 'Hobbies',
            description: 'Music Production, Gaming, Designing, Photography',
            icon: <MdMilitaryTech size={48} />,
        },
        {
            title: 'Skills',
            description:
                'React, Next.js, TailwindCSS, Python, Flutter, Firebase, SQL, MongoDB, APIs, Java, Canva, FL Studio',
            icon: <MdMiscellaneousServices size={48} />,
        },
    ];

    return (
        <div className="flex-1 flex flex-col gap-4">
            {/* HEADER */}
            <h1 className="text-5xl sm:text-8xl font-bold w-full text-center">
                About <HighlightedSpan>me</HighlightedSpan>
            </h1>

            {/* CONTENT AREA — fills remaining height */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aboutCards.map((card) => (
                    <div
                        key={card.title}
                        className="flex items-center p-4 rounded-xl border-2 border-tertiary sm:hover:border-primary sm:hover:bg-primary"
                    >
                        <div className="w-1/3 flex justify-center">{card.icon}</div>
                        <div className="w-2/3 mx-4">
                            <h2 className="font-bold text-xl">{card.title}</h2>
                            <p className="mt-2">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

