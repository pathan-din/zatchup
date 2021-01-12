import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { User, SignupUser } from './User.model';
// import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    environment = environment
    public currentUser: Observable<User | null>
    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore
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

    public firebaseSignUp(firstName: string, lastName: string, email: string, password: any) {
        let promise = new Promise((resolve, reject) => {
            this.afAuth.createUserWithEmailAndPassword(email, password).then(
                (user) => {
                    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
                    const updateUser = {
                        id: user.user.uid,
                        email: user.user.email,
                        firstName,
                        lastName,
                        photoUrl: 'gs://angularchatmaheshtriazine.appspot.com/mahesh_profile.jpg'
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


    subscribeQueryPostsByUsernameAndCategory(email: string, category: string) {
        
    }
}
