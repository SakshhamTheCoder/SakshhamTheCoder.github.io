import { getResumeLink } from '@/lib/content';

// /resume always points at whatever link is set in admin (Profile > Resume link).
// The CDN caches the redirect, so most hits skip the serverless run and the Firestore read.
// shortcut: a changed link can take up to a minute to show, shorten s-maxage if that matters.
export async function GET(req) {
    const to = (await getResumeLink()) || new URL('/', req.url).href;
    return new Response(null, {
        status: 307,
        headers: { Location: to, 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400' },
    });
}
