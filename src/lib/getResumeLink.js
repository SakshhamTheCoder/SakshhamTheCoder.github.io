import { cacheTag } from 'next/cache';
import { db } from '@/lib/firebaseAdmin';

export async function getResumeLink() {
    'use cache';
    cacheTag('resume');

    if (!db) return null;

    const snap = await db.collection('resume').limit(1).get();
    const doc = snap.docs[0];
    return doc ? doc.data().link : null;
}
