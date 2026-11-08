'use client';

// Shown when a page throws while rendering. Content reads already fall back to empty lists, so this is rare.
export default function Error({ reset }) {
    return (
        <div className="flex-1 min-h-0 grid place-items-center">
            <div role="alert" className="glass rounded-2xl p-8 max-w-md w-full flex flex-col items-center gap-4 text-center">
                <p className="tile-title">Something broke</p>
                <h1 className="tile-label">This page did not load</h1>
                <p>It is probably a short hiccup. Try again.</p>
                <button type="button" onClick={reset} className="glass glass-link rounded-2xl px-5 py-2 text-accent font-bold cursor-pointer">
                    Try again
                </button>
            </div>
        </div>
    );
}
