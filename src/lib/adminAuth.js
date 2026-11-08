import { cookies } from 'next/headers';
import { admin } from '@/lib/firebaseAdmin';

export const COOKIE = 'admin_session';
const isAdminEmail = (e) => Boolean(process.env.ADMIN_EMAIL) && String(e).toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();

export async function getAdmin() {
    const c = (await cookies()).get(COOKIE)?.value;
    if (!c || !admin.apps.length) return null;
    try {
        const d = await admin.auth().verifySessionCookie(c);
        return isAdminEmail(d.email) ? d : null;
    } catch {
        return null;
    }
}

// shortcut: in-memory limiter resets per serverless instance, upgrade to a shared store if abused.
const fails = new Map();
export const limited = (ip) => (fails.get(ip)?.until ?? 0) > Date.now();
export const noteFail = (ip) => {
    const r = fails.get(ip) || { n: 0 };
    r.n += 1;
    if (r.n >= 5) Object.assign(r, { n: 0, until: Date.now() + 15 * 60 * 1000 });
    fails.set(ip, r);
};

// Returns a session cookie string or null.
export async function signIn(email, password) {
    const key = process.env.FIREBASE_WEB_API_KEY;
    if (!key || !admin.apps.length) return null;
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    if (!res.ok) return null;
    const { idToken } = await res.json();
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!isAdminEmail(decoded.email)) return null;
    return admin.auth().createSessionCookie(idToken, { expiresIn: 7 * 24 * 3600 * 1000 });
}
