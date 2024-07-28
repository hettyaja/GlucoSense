const admin = require('firebase-admin');
const serviceAccount = require('./glucosense-24-s2-07-firebase-adminsdk-p9t7o-01008d24cb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;