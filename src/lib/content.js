import { cacheTag, cacheLife } from 'next/cache';
import { db } from '@/lib/firebaseAdmin';

const ser = (v) =>
    v && typeof v.toDate === 'function'
        ? v.toDate().toISOString()
        : Array.isArray(v)
          ? v.map(ser)
          : v && typeof v === 'object'
            ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, ser(x)]))
            : v;

// Cached ~1 day; admin saves clear the tag. Throwing here keeps a failed read out of the cache.
async function readList(name) {
    'use cache';
    cacheTag(name);
    cacheLife('days');
    if (!db) throw new Error('no db');
    const snap = await db.collection(name).get();
    return snap.docs.map((d) => ({ id: d.id, ...ser(d.data()) }));
}

const safe = async (name, fallback = []) => {
    try {
        return await readList(name);
    } catch (e) {
        console.error(`[content] ${name} read failed`);
        return fallback;
    }
};

const byPos = (a, b) => (a.position ?? 1e9) - (b.position ?? 1e9);
const visible = (x) => x.visible !== false;

export async function getProjects() {
    return (await safe('projects'))
        .filter(visible)
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || byPos(a, b));
}

export async function getExperience() {
    return (await safe('experience'))
        .filter(visible)
        .sort((a, b) => (b.startDate || '').localeCompare(a.startDate || '') || byPos(a, b));
}

export async function getSkills() {
    return (await safe('skills')).sort(byPos);
}

export async function getAchievements() {
    return (await safe('achievements')).filter(visible).sort(byPos);
}

export async function getProfile() {
    return (await safe('profile')).find((d) => d.id === 'main') || {};
}

export async function getNow() {
    return (await safe('now')).find((d) => d.id === 'main')?.text || '';
}

export async function getResumeLink() {
    const profile = await getProfile();
    if (profile.resumeLink) return profile.resumeLink;
    return (await safe('resume'))[0]?.link || null;
}
