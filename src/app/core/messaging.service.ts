import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';

@Injectable()
export class MessagingService {

    private userDoc: AngularFirestoreDocument<User>;
    currentMessage = new BehaviorSubject(null);

    constructor(
        private afs: AngularFirestore,
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messaging.subscribe(
            (_messaging) => {
                _messaging.onMessage = _messaging.onMessage.bind(_messaging);
                _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
            }
        );
    }

    /**
     * update token in firebase database
     *
     * @param userId userId as a key
     * @param token token as a value
     */
    updateToken(userId, token) {
        // we can change this function to request our backend service
        this.angularFireAuth.authState.pipe(take(1)).subscribe(
            () => {
                this.userDoc = this.afs.doc<User>('users/' + userId);
                this.userDoc.update({ fcmToken: token });
            });
    }

    /**
     * request permission for notification from firebase cloud messaging
     *
     * @param userId userId
     */
    requestPermission(userId) {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                this.updateToken(userId, token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    /**
     * hook method when new notification received in foreground
     */
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log('new message received. ', payload);
                this.currentMessage.next(payload);
            });
    }
}
