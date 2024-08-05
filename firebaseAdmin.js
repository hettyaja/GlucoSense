import admin from 'firebase-admin';

const serviceAccount = require('./glucosense-24-s2-07-firebase-adminsdk-p9t7o-01008d24cb.json'); // Adjust the path accordingly

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };