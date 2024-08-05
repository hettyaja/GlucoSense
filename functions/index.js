const admin = require('firebase-admin');
const functions = require("firebase-functions")
const express = require("express")
const cors = require('cors')

const app = express()
app.use(cors({ origin: true}))

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.delete('/deleteUser/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        await admin.auth().deleteUser(uid);
        res.status(200).send(`Successfully deleted user with uid: ${uid}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});

exports.expressApi = functions.https.onRequest(app);