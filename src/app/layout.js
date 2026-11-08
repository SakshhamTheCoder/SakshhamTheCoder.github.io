import { Fira_Sans, Newsreader } from 'next/font/google';
import './globals.css';
import BodyLayout from '@/app/components/BodyLayout';
import ParticlesBackground from '@/app/components/ParticlesBackground';
import { getResumeLink, getProfile } from '@/lib/content';

const firaSans = Fira_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
});

// Only upright files were loaded, so every italic in Fira (the "Now" line, the highlight in About) was a slant faked by
// the browser. The real 400 italic is loaded separately and applied to .italic in globals.css.
const firaItalic = Fira_Sans({
    subsets: ['latin'],
    weight: '400',
    style: 'italic',
    variable: '--font-fira-italic',
});

// The display serif (tile labels, quotes) is one real font instead of whatever serif the OS ships; --font-serif in globals.css points at it.
const newsreader = Newsreader({
    subsets: ['latin'],
    style: 'italic',
    axes: ['opsz'],
    variable: '--font-newsreader',
});

const SITE ='https://sakshhamthecoder.vercel.app';

export async function generateMetadata() {
    const { headline } = await getProfile();
    const description = headline || 'Portfolio website for Sakshham Bhagat';
    return {
        metadataBase: new URL(SITE),
        title: {
            template: '%s | Sakshham Bhagat',
            default: 'Sakshham Bhagat',
        },
        description,
        alternates: { canonical: '/' },
        openGraph: {
            title: 'Sakshham Bhagat',
            description,
            url: SITE,
            site_name: 'Sakshham Bhagat',
            images: [{ url: `${SITE}/og-image.jpeg`, alt: 'Sakshham Bhagat' }],
        },
        twitter: { card: 'summary_large_image', title: 'Sakshham Bhagat', description, images: [`${SITE}/og-image.jpeg`] },
    };
}

export default async function RootLayout({ children }) {
    const [resumeLink, profile] = await Promise.all([getResumeLink(), getProfile()]);
    // Only facts that are already on the site: the name, the address and the social links.
    const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Sakshham Bhagat',
        url: SITE,
        ...(profile.socials?.length && { sameAs: profile.socials.map((s) => s.href).filter((h) => h.startsWith('http')) }),
    };
    return (
        <html lang="en" className={`${firaItalic.variable} ${newsreader.variable}`}>
            <meta name="theme-color" content="#DA0037" />
            <meta name="msapplication-TileColor" content="#DA0037" />
            <meta name="msapplication-navbutton-color" content="#DA0037" />
            <body className={firaSans.className}>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
                <ParticlesBackground>
                    <BodyLayout resumeLink={resumeLink}>{children}</BodyLayout>
                </ParticlesBackground>
            </body>
        </html>
    );
}
