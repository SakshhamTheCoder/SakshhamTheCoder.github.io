import { cacheTag } from 'next/cache';
import { db } from '@/lib/firebaseAdmin';

export async function getProjects() {
    'use cache';
    cacheTag('projects');

    if (!db) return [];

    const snap = await db.collection('projects').get();

    return snap.docs.map((d) => {
        const data = d.data();

        return {
            id: d.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
        };
    });
}

