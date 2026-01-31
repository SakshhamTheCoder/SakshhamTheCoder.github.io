import {
    MdCode,
    MdSchool,
    MdLocationPin,
    MdTerminal,
    MdCloud,
    MdDevices,
    MdMusicNote,
    MdBuild,
    MdAutoGraph,
} from 'react-icons/md';
import HighlightedSpan from '../components/HighlightedSpan';
import * as motion from 'motion/react-client';
import { container, item } from '@/app/components/Transition';

const SKILLS = [
    {
        title: 'Languages',
        icon: <MdTerminal />,
        items: ['Python', 'JavaScript', 'Go', 'C/C++', 'Dart', 'SQL', 'Shell', 'HTML/CSS'],
    },
    {
        title: 'Frameworks & Libraries',
        icon: <MdCode />,
        items: [
            'React',
            'Next.js',
            'Flutter',
            'Express',
            'Django REST',
            'FastAPI',
            'Flask',
            'TailwindCSS',
            'React Native',
        ],
    },
    {
        title: 'Systems & Tooling',
        icon: <MdAutoGraph />,
        items: [
            'Linux',
            'Git & GitHub',
            'Docker',
            'NGINX',
            'WebSockets',
            'REST APIs',
            'CLI / TUI',
            'Android Debug Bridge',
        ],
    },
    {
        title: 'Databases',
        icon: <MdDevices />,
        items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Cloudinary'],
    },
    {
        title: 'Cloud & Deployment',
        icon: <MdCloud />,
        items: ['Google Cloud Platform', 'Azure', 'Vercel', 'Netlify', 'Cloudflare'],
    },
    {
        title: 'ML & Computer Vision',
        icon: <MdAutoGraph />,
        items: ['Generative AI', 'Scikit-Learn', 'MediaPipe', 'OpenCV', 'Pillow'],
    },
    {
        title: 'Web APIs & Automation',
        icon: <MdBuild />,
        items: ['Postman', 'Insomnia', 'Selenium', 'BeautifulSoup', 'Payment Gateways', 'Discord Bots'],
    },
    {
        title: 'Developer Environment',
        icon: <MdTerminal />,
        items: ['VS Code', 'Android Studio', 'PyCharm', 'IntelliJ', 'DataGrip', 'Jupyter Notebook', 'Google Colab'],
    },
    {
        title: 'Creative Tools',
        icon: <MdMusicNote />,
        items: ['FL Studio', 'Figma', 'Canva', 'Clipchamp', 'LMMS', 'Audacity'],
    },
];

export default function About() {
    return (
        <motion.div variants={container} initial="hidden" animate="visible" className="flex-1 flex flex-col gap-6">
            <motion.div variants={item} className="px-2 text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    About <HighlightedSpan>Me</HighlightedSpan>
                </h1>
            </motion.div>

            <motion.div variants={container} className="flex flex-col lg:flex-row gap-6">
                <motion.div variants={container} className="flex flex-col gap-4 flex-1">
                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdSchool />
                            <h4 className="font-bold">Education</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            B.E. in Computer Engineering from Thapar Institute of Engineering & Technology
                        </p>
                    </motion.div>

                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdLocationPin />
                            <h4 className="font-bold">Location</h4>
                        </div>
                        <p className="text-sm">Patiala, Punjab, India</p>
                    </motion.div>

                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdCode />
                            <h4 className="font-bold">Primary Focus</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            I build web and mobile applications, along with the backend systems, APIs, databases, and
                            tooling behind them
                        </p>
                    </motion.div>

                    <motion.div variants={item} className="glass rounded-2xl p-5 text-tertiary">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                            <MdAutoGraph />
                            <h4 className="font-bold">Technical Interests</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            I am interested in frontend architecture and user interface design, as well as backend
                            systems, APIs, performance, and developer tooling
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div variants={item} className="glass-navbar rounded-2xl p-6 text-tertiary flex-2">
                    <h2 className="text-lg font-bold text-primary mb-5">Technical Skillset</h2>

                    <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {SKILLS.map((group) => (
                            <motion.div key={group.title} variants={item}>
                                <div className="flex items-center gap-2 mb-3 text-primary">
                                    <span className="text-lg">{group.icon}</span>
                                    <h3 className="font-bold text-sm uppercase tracking-wide">{group.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs px-3 py-1 rounded-full border border-tertiary/20 hover:border-primary/40 transition"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

