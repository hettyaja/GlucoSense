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

        // Reference to the user document
        const userDocRef = admin.firestore().collection('users').doc(uid);

        // Function to recursively delete subcollections
        const deleteSubcollections = async (docRef) => {
            const subcollections = await docRef.listCollections();
            for (const subcollection of subcollections) {
                const subcollectionDocs = await subcollection.listDocuments();
                for (const doc of subcollectionDocs) {
                    await doc.delete();
                }
            }
        };

        // Delete all subcollections
        await deleteSubcollections(userDocRef);

        // Delete the user document itself
        await userDocRef.delete();

        // Delete the user from Firebase Auth
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

// app.delete('/deleteUser/:uid', async (req, res) => {
//     const uid = req.params.uid;
//     console.log(`Attempting to delete user with uid: ${uid}`);
//     try {
//         // Check if user exists before deleting
//         const userRecord = await admin.auth().getUser(uid);
//         console.log('User record:', userRecord);

//         await admin.auth().deleteUser(uid);
//         res.status(200).send(`Successfully deleted user with uid: ${uid}`);
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         if (error.code === 'auth/user-not-found') {
//             res.status(404).send('User not found');
//         } else {
//             res.status(500).send('Error deleting user');
//         }
//     }
// });

exports.expressApi = functions.https.onRequest(app);
