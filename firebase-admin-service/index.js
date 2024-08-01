const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../glucosense-24-s2-07-firebase-adminsdk-p9t7o-01008d24cb.json'); // Adjust the path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
