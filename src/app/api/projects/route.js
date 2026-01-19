import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET() {
    if (!db) {
        return NextResponse.json({ error: 'Firestore not initialized' }, { status: 500 });
    }

    try {
        const snap = await db.collection('projects').get();
        const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ projects });
    } catch (e) {
        console.error('[GET /api/projects] Firestore error');
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
