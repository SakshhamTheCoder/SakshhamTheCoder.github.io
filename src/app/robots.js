export default function robots() {
    return {
        rules: { userAgent: '*', allow: '/', disallow: '/admin' },
        sitemap: 'https://sakshhamthecoder.vercel.app/sitemap.xml',
    };
}
