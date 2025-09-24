import { Inter } from 'next/font/google';
import './globals.css';
import BodyLayout from './components/BodyLayout';
import ParticlesBackground from './components/ParticlesBackground';

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <meta name="theme-color" content="#DA0037" />
            <meta name="msapplication-TileColor" content="#DA0037" />
            <meta name="msapplication-navbutton-color" content="#DA0037" />
            <meta name="apple-mobile-web-app-status-bar-style" content="#DA0037" />
            <body className={inter.className + ' select-none'}>
                <ParticlesBackground>
                    <BodyLayout>{children}</BodyLayout>
                </ParticlesBackground>
            </body>
        </html>
    );
}

