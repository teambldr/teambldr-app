const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.fcmSend = functions.firestore
    .document('messages/{messageId}')
    .onCreate((snap, context) => {
        const message = snap.data();
        const payload = {
            notification: {
                title: message.title,
                body: message.body
            }
        };

        return admin.messaging().sendToDevice(message.fcmToken, payload)
    });
