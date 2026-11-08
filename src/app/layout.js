import { Fira_Sans } from 'next/font/google';
import './globals.css';
import BodyLayout from '@/app/components/BodyLayout';
import ParticlesBackground from '@/app/components/ParticlesBackground';
import { getResumeLink, getProfile } from '@/lib/content';

const firaSans = Fira_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export async function generateMetadata() {
    const { headline } = await getProfile();
    const description = headline || 'Portfolio website for Sakshham Bhagat';
    return {
        title: {
            template: '%s | Sakshham Bhagat',
            default: 'Sakshham Bhagat',
        },
        description,
        openGraph: {
            title: 'Sakshham Bhagat',
            description,
            url: 'https://sakshhamthecoder.vercel.app',
            site_name: 'Sakshham Bhagat',
            images: [{ url: 'https://sakshhamthecoder.vercel.app/og-image.jpeg', alt: 'Sakshham Bhagat' }],
        },
    };
}

export default async function RootLayout({ children }) {
    const resumeLink = await getResumeLink();
    return (
        <html lang="en">
            <meta name="theme-color" content="#DA0037" />
            <meta name="msapplication-TileColor" content="#DA0037" />
            <meta name="msapplication-navbutton-color" content="#DA0037" />
            <body className={firaSans.className + ' select-none'}>
                <ParticlesBackground>
                    <BodyLayout resumeLink={resumeLink}>{children}</BodyLayout>
                </ParticlesBackground>
            </body>
        </html>
    );
}

