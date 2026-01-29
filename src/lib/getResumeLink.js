import { db } from '@/lib/firebaseAdmin';

export async function getResumeLink() {
    if (!db) return null;

    const snap = await db.collection('resume').limit(1).get();
    if (snap.empty) return null;

    const data = snap.docs[0].data();
    return typeof data.link === 'string' ? data.link : null;
}

