import { db } from '@/lib/firebaseAdmin';

export async function getProjects() {
    if (!db) return [];

    const snap = await db.collection('projects').get();

    return snap.docs.map((d) => {
        const data = d.data();

        return {
            id: d.id,
            name: data.name ?? '',
            description: data.description ?? '',
            link: data.link ?? '',
        };
    });
}

