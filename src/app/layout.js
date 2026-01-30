import { Fira_Sans } from 'next/font/google';
import './globals.css';
import BodyLayout from '@/app/components/BodyLayout';
import ParticlesBackground from '@/app/components/ParticlesBackground';
import { getResumeLink } from '@/lib/getResumeLink';

const firaSans = Fira_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

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
    const resumeLink = await getResumeLink();
    return (
        <html lang="en">
            <meta name="theme-color" content="#DA0037" />
            <meta name="msapplication-TileColor" content="#DA0037" />
            <meta name="msapplication-navbutton-color" content="#DA0037" />
            <meta name="apple-mobile-web-app-status-bar-style" content="#DA0037" />
            <body className={firaSans.className + ' select-none'}>
                <ParticlesBackground>
                    <BodyLayout resumeLink={resumeLink}>{children}</BodyLayout>
                </ParticlesBackground>
            </body>
        </html>
    );
}

