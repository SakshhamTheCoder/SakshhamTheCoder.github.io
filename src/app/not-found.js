import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
    return (
        <div className="flex-1 min-h-0 grid place-items-center">
            <div className="glass rounded-2xl p-8 max-w-md w-full flex flex-col items-center gap-4 text-center">
                <p className="tile-title">404</p>
                <h1 className="tile-label">Page not found</h1>
                <p>That address does not lead anywhere on this site.</p>
                <Link href="/" className="glass glass-link rounded-2xl px-5 py-2 text-accent font-bold">
                    Back home
                </Link>
            </div>
        </div>
    );
}
