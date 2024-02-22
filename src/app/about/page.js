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
        { title: 'Full Name', description: 'Sakshham Bhagat', icon: <MdPerson size={50} /> },
        {
            title: 'Age',
            description: `${years} years, ${months} months, ${days} days`,
            icon: <MdEvent size={50} />,
        },
        { title: 'Location', description: 'Jammu, Jammu & Kashmir, India', icon: <MdLocationPin size={50} /> },
        {
            title: 'Education',
            description: 'B.Tech. in CSE from Thapar Institute of Engineering & Technology, Patiala, Punjab, India',
            icon: <MdSchool size={50} />,
        },
        {
            title: 'Hobbies',
            description: 'Music Production, Gaming, Designing, Photography',
            icon: <MdMilitaryTech size={50} />,
        },
        {
            title: 'Skills',
            description:
                'React, Next.js, TailwindCSS, Python, Flutter, Firebase, MySQL, MongoDB, APIs, Java, Canva, FL Studio',
            icon: <MdMiscellaneousServices size={50} />,
        },
    ];
    return (
        <main className="px-8 py-24 sm:px-48 sm:py-8 flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-5xl sm:text-8xl font-bold w-full text-center">
                About <HighlightedSpan>me</HighlightedSpan>
            </h1>
            <div className="w-full grid grid-rows-1 sm:grid-cols-3 auto-rows-fr">
                {aboutCards.map((card) => (
                    <div
                        key={card.title}
                        className="sm:hover:border-primary sm:hover:bg-primary m-2 flex flex-row items-center justify-start bg-transparent p-4 rounded-xl border-2 border-tertiary"
                    >
                        <div className="w-1/3 flex justify-center">{card.icon}</div>
                        <div className="w-2/3 mx-4">
                            <h2 className="font-bold my-2 text-xl">{card.title}</h2>
                            <p className="my-2">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
