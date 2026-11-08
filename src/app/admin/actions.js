'use server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { updateTag } from 'next/cache';
import { admin, db } from '@/lib/firebaseAdmin';
import { getAdmin, checkPassword, makeSession, limited, noteFail, COOKIE } from '@/lib/adminAuth';
import { SCHEMAS, clean } from '@/lib/schema';

const { FieldValue } = admin.firestore;

async function guard(name) {
    if (!(await getAdmin()) || !db) throw new Error('Unauthorized');
    if (name && !SCHEMAS[name]) throw new Error('Unknown collection');
}

const ser = (v) =>
    v && typeof v.toDate === 'function' ? v.toDate().toISOString() : Array.isArray(v) ? v.map(ser) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, ser(x)])) : v;

export async function loginAction(_prev, fd) {
    const ip = (await headers()).get('x-forwarded-for')?.split(',')[0] || 'local';
    if (limited(ip)) return { error: 'Too many attempts. Try again later.' };
    if (!checkPassword(String(fd.get('password') || ''))) {
        noteFail(ip);
        await new Promise((r) => setTimeout(r, 800));
        return { error: 'Invalid credentials.' };
    }
    (await cookies()).set(COOKIE, makeSession(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 3600,
        path: '/',
    });
    redirect('/admin');
}

export async function logoutAction() {
    (await cookies()).delete(COOKIE);
    redirect('/admin');
}

async function sorted(name) {
    const snap = await db.collection(name).get();
    return snap.docs
        .map((d) => ({ id: d.id, ...ser(d.data()) }))
        .sort((a, b) => (a.position ?? 1e9) - (b.position ?? 1e9));
}

export async function listAction(name) {
    await guard(name);
    return sorted(name);
}

export async function saveAction(name, id, data) {
    try {
        await guard(name);
        const schema = SCHEMAS[name];
        const cleaned = clean(schema, data);
        const ref = db.collection(name).doc(schema.single ? 'main' : id || db.collection(name).doc().id);
        const isNew = !(await ref.get()).exists;
        const doc = { updatedAt: FieldValue.serverTimestamp() };
        for (const [k, v] of Object.entries(cleaned)) if (v !== undefined) doc[k] = v;
        const unset = {};
        for (const [k, v] of Object.entries(cleaned)) if (v === undefined) unset[k] = FieldValue.delete();
        if (isNew) {
            if (name === 'projects') doc.createdAt = FieldValue.serverTimestamp();
            if (schema.list && doc.position === undefined) {
                const top = schema.addAt === 'top';
                const edge = await db.collection(name).orderBy('position', top ? 'asc' : 'desc').limit(1).get();
                doc.position = (edge.docs[0]?.data().position ?? 0) + (top ? -1 : 1);
            }
            await ref.set(doc);
        } else {
            await ref.update({ ...doc, ...unset });
        }
        updateTag(name);
        return { ok: true };
    } catch (e) {
        return { error: e.message };
    }
}

export async function deleteAction(name, id) {
    try {
        await guard(name);
        if (SCHEMAS[name].single) throw new Error('Cannot delete');
        await db.collection(name).doc(id).delete();
        updateTag(name);
        return { ok: true };
    } catch (e) {
        return { error: e.message };
    }
}

// ids = every doc id in the new order; positions become 1..n.
export async function reorderAction(name, ids) {
    try {
        await guard(name);
        if (!Array.isArray(ids) || ids.some((x) => typeof x !== 'string')) throw new Error('Invalid order');
        const batch = db.batch();
        ids.forEach((id, n) => batch.update(db.collection(name).doc(id), { position: n + 1 }));
        await batch.commit();
        updateTag(name);
        return { ok: true };
    } catch (e) {
        return { error: e.message };
    }
}

export async function setVisibleAction(name, id, visible) {
    try {
        await guard(name);
        await db.collection(name).doc(id).update({ visible: Boolean(visible), updatedAt: FieldValue.serverTimestamp() });
        updateTag(name);
        return { ok: true };
    } catch (e) {
        return { error: e.message };
    }
}
