const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const serviceAccount = require('./glucosense-24-s2-07-firebase-adminsdk-p9t7o-01008d24cb.json');

// const serviceAccount = {
//   type: functions.config().service_account.type,
//   project_id: functions.config().service_account.project_id,
//   private_key_id: functions.config().service_account.private_key_id,
//   private_key: functions.config().service_account.private_key.replace(/\\n/g, '\n'),
//   client_email: functions.config().service_account.client_email,
//   client_id: functions.config().service_account.client_id,
//   auth_uri: functions.config().service_account.auth_uri,
//   token_uri: functions.config().service_account.token_uri,
//   auth_provider_x509_cert_url: functions.config().service_account.auth_provider_x509_cert_url,
//   client_x509_cert_url: functions.config().service_account.client_x509_cert_url,
// };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const app = express();
// app.use(cors({ origin: true }));

exports.api = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      res.status(200).send("Hello from Firebase Emulator!");
    });
  });

// app.get('/active-users', async (req, res) => {
//   try {
//     console.log('Request received to fetch active users');
//     const MS_PER_DAY = 24 * 60 * 60 * 1000;
//     const thirtyDaysAgo = Date.now() - (30 * MS_PER_DAY);

//     const listAllUsers = async (nextPageToken) => {
//       const usersResult = await admin.auth().listUsers(50, nextPageToken);
//       return usersResult;
//     };

//     let allUsers = [];
//     let nextPageToken;
//     do {
//       const result = await listAllUsers(nextPageToken);
//       allUsers = allUsers.concat(result.users);
//       nextPageToken = result.pageToken;
//     } while (nextPageToken);

//     const db = admin.firestore();
//     const usersCollection = await db.collection('users').get();
//     const firestoreUsers = new Set(usersCollection.docs.map(doc => doc.id));
//     const activeUsers = allUsers.filter(user => {
//       const lastSignInTime = new Date(user.metadata.lastSignInTime).getTime();
//       return lastSignInTime >= thirtyDaysAgo && firestoreUsers.has(user.uid);
//     });

//     console.log(`Active users count: ${activeUsers.length}`);
//     res.status(200).send({ activeUsersCount: activeUsers.length });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).send('Failed to fetch users.');
//   }
// });

// exports.api = functions.https.onRequest(app);
