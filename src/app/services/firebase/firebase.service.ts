import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './User.model';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'


@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    environment = environment
    public currentUser: Observable<User | null>
    currentMessage = new BehaviorSubject(null);

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private angularFireMessaging: AngularFireMessaging
    ) {
        this.currentUser = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user)
                    return this.db.doc<User>(`users/${user.uid}`).valueChanges()
                else
                    return of(null)
            })
        )
        this.angularFireMessaging.messages.subscribe((msg: any) => {
            msg.onMessage = msg.onMessage.bind(msg);

            msg.onTokenRefresh = msg.onTokenRefresh.bind(msg);
            console.log(msg);

        })
        // this.angularFireMessaging.messaging.subscribe(
        //     (_messaging) => {
        //     _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        //     _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        //     }
        //     )
    }
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {

                console.log(token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log("new message received. ", payload);
                this.currentMessage.next(payload);
            })
    }
    public firebaseSignUp(firstName: string, lastName: string, email: string, password: any, photoUrl: string, isActive: string) {
        let promise = new Promise((resolve, reject) => {
            this.afAuth.createUserWithEmailAndPassword(email, password).then(
                (user) => {
                    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
                    const updateUser = {
                        id: user.user.uid,
                        email: user.user.email,
                        firstName: firstName,
                        lastName: lastName,
                        photoUrl: photoUrl,
                        isActive: isActive
                    }
                    userRef.set(updateUser)
                    resolve(user);
                },
                err => {
                    reject(err)

                }
            )
        });
        return promise;
    }





    getChatRooms(collectionName): Observable<any> {
        let chatRooms = this.db.collection(collectionName).valueChanges();
        // let chatRooms = this.firdb.object('/users').valueChanges();
        return chatRooms
    }

    getUsers(): Observable<any> {
        let users = this.db.collection(`users`).valueChanges();
        return users
    }

    getUser() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    getPresence(uid: string) {
        // return this.db.collection('status').doc(uid).valueChanges();
        return this.db.collection('status').doc(uid).valueChanges();
    }

    async setPresence(status: string) {
        const user = await this.getUser();
        if (user) {
            return this.db.collection('status').doc(user.uid).set({
                status: status,
                timestamp: new Date().valueOf()
            })
        }
    }
}
