import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './User.model';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    environment = environment
    public currentUser: Observable<User | null>
    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        // private firdb: AngularFireDatabase
    ) {
        this.currentUser = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user)
                    return this.db.doc<User>(`users/${user.uid}`).valueChanges()
                else
                    return of(null)
            })
        )
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

}
