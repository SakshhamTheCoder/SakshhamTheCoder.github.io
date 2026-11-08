const SITE = 'https://sakshhamthecoder.vercel.app';

export default function sitemap() {
    return ['', '/projects', '/about'].map((path) => ({ url: `${SITE}${path}`, changeFrequency: 'monthly' }));
}
