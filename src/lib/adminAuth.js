import { cookies } from 'next/headers';
import { createHash, createHmac, timingSafeEqual } from 'crypto';

export const COOKIE = 'admin_session';
const TTL_MS = 7 * 24 * 3600 * 1000;

// Signing key derives from the service account + password: no extra secret to manage; changing the password logs everyone out.
const mac = (s) =>
    createHmac('sha256', createHash('sha256').update(`${process.env.FIREBASE_CONFIG}|${process.env.ADMIN_PASSWORD}`).digest())
        .update(s)
        .digest('hex');
const same = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const sha = (s) => createHash('sha256').update(s).digest('hex');

export const checkPassword = (p) => Boolean(process.env.ADMIN_PASSWORD) && same(sha(p), sha(process.env.ADMIN_PASSWORD));

export function makeSession() {
    const exp = String(Date.now() + TTL_MS);
    return `${exp}.${mac(exp)}`;
}

export async function getAdmin() {
    const c = (await cookies()).get(COOKIE)?.value;
    if (!c || !process.env.ADMIN_PASSWORD) return false;
    const [exp, sig] = c.split('.');
    return Boolean(sig) && Number(exp) > Date.now() && same(sig, mac(exp));
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
