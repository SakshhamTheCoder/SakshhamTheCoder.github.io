import { cacheLife } from 'next/cache';

async function fetchLatest() {
    'use cache';
    cacheLife({ stale: 3600, revalidate: 3600, expire: 86400 });
    const res = await fetch('https://skshhm-music-backend.vercel.app/api/artist-releases', { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`releases ${res.status}`);
    const list = await res.json();
    // Newest release of my own, not a feature on someone else's.
    const r = list.find((x) => x.album_group !== 'appears_on') ?? list[0];
    if (!r?.id) throw new Error('no releases');
    return {
        id: r.id,
        name: r.name,
        kind: r.album_type === 'single' ? 'Single' : 'Album',
        year: r.release_date?.slice(0, 4) ?? '',
        cover: r.images?.[0]?.url ?? null,
    };
}

// null on any failure: the Music tile is then hidden and the row falls back to two tiles.
export async function getLatestRelease() {
    try {
        return await fetchLatest();
    } catch {
        return null;
    }
}
