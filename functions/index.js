const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const serviceAccount = {
  type: functions.config().service_account.type,
  project_id: functions.config().service_account.project_id,
  private_key_id: functions.config().service_account.private_key_id,
  private_key: functions.config().service_account.private_key.replace(/\\n/g, '\n'),
  client_email: functions.config().service_account.client_email,
  client_id: functions.config().service_account.client_id,
  auth_uri: functions.config().service_account.auth_uri,
  token_uri: functions.config().service_account.token_uri,
  auth_provider_x509_cert_url: functions.config().service_account.auth_provider_x509_cert_url,
  client_x509_cert_url: functions.config().service_account.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.get('/active-users', async (req, res) => {
  try {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const thirtyDaysAgo = Date.now() - (30 * MS_PER_DAY);

    // Fetch all users from Firebase Authentication
    const listAllUsers = async (nextPageToken) => {
      // List batch of users, 1000 at a time.
      const usersResult = await admin.auth().listUsers(1000, nextPageToken);
      return usersResult;
    };

    let allUsers = [];
    let nextPageToken;
    do {
      const result = await listAllUsers(nextPageToken);
      allUsers = allUsers.concat(result.users);
      nextPageToken = result.pageToken;
    } while (nextPageToken);

    // Fetch users from Firestore
    const db = admin.firestore();
    const usersCollection = await db.collection('users').get();

    // Map Firestore users to a Set for quick lookup
    const firestoreUsers = new Set(usersCollection.docs.map(doc => doc.id));

    // Filter active users from Firebase Authentication
    const activeUsers = allUsers.filter(user => {
      const lastSignInTime = new Date(user.metadata.lastSignInTime).getTime();
      return lastSignInTime >= thirtyDaysAgo && firestoreUsers.has(user.uid);
    });

    res.status(200).send({ activeUsersCount: activeUsers.length });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Failed to fetch users.');
  }
});

exports.api = functions.https.onRequest(app);
