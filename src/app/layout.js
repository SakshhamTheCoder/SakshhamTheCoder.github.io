import { Inter, Fira_Sans, Ubuntu, Lexend } from 'next/font/google';
import './globals.css';
import BodyLayout from '@/app/components/BodyLayout';
import ParticlesBackground from '@/app/components/ParticlesBackground';
import { getResumeLink } from '@/lib/getResumeLink';
import { getProjects } from '@/lib/getProjects';
import DataProvider from './context/DataContext';
('@/app/context/DataContext');

const inter = Inter({ subsets: ['latin'] });
const firaSans = Fira_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '700'] });
const lexend = Lexend({ subsets: ['latin'], weight: 'variable' });

export const metadata = {
    title: {
        template: '%s | Sakshham Bhagat',
        default: 'Sakshham Bhagat',
    },
    description: 'Portfolio website for Sakshham Bhagat',
    openGraph: {
        title: 'Sakshham Bhagat',
        description: 'Portfolio website for Sakshham Bhagat',
        url: 'https://sakshham.tech',
        site_name: 'Sakshham Bhagat',
        images: [
            {
                url: 'https://sakshham.tech/og-image.jpeg',
                alt: 'Sakshham Bhagat',
            },
        ],
    },
};

export default async function RootLayout({ children }) {
    const [projects, resumeLink] = await Promise.all([getProjects(), getResumeLink()]);
    return (
        <html lang="en">
            <meta name="theme-color" content="#DA0037" />
            <meta name="msapplication-TileColor" content="#DA0037" />
            <meta name="msapplication-navbutton-color" content="#DA0037" />
            <meta name="apple-mobile-web-app-status-bar-style" content="#DA0037" />
            <body className={firaSans.className + ' select-none'}>
                <DataProvider value={{ projects, resumeLink }}>
                    <ParticlesBackground>
                        <BodyLayout>{children}</BodyLayout>
                    </ParticlesBackground>
                </DataProvider>
            </body>
        </html>
    );
}

