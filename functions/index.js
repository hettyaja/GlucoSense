const admin = require('firebase-admin');
const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Create Express app
const app = express();
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.delete('/deleteUser/:uid', async (req, res) => {
    const uid = req.params.uid;
    console.log(`Attempting to delete user with uid: ${uid}`);
    try {
        // Check if user exists before deleting
        const userRecord = await admin.auth().getUser(uid);
        console.log('User record:', userRecord);

        await admin.auth().deleteUser(uid);
        res.status(200).send(`Successfully deleted user with uid: ${uid}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        if (error.code === 'auth/user-not-found') {
            res.status(404).send('User not found');
        } else {
            res.status(500).send('Error deleting user');
        }
    }
});

exports.expressApi = functions.https.onRequest(app);
