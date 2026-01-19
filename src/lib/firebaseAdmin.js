import admin from 'firebase-admin';

let db = null;

try {
    if (!admin.apps.length) {
        if (process.env.FIREBASE_CONFIG) {
            const firebase_private_key_b64 = Buffer.from(process.env.FIREBASE_CONFIG, 'base64');
            const firebase_private_key = firebase_private_key_b64.toString('utf8');
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(firebase_private_key)),
            });
        }
    }

    if (admin.apps.length) {
        db = admin.firestore();
    }
} catch (e) {
    console.error('[firebaseAdmin] Init failed');
}

export { admin, db };
