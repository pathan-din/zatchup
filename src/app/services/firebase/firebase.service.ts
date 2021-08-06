import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './User.model';
import { AngularFireMessaging } from '@angular/fire/messaging';
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
        })
    }

    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                // console.log(token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                this.currentMessage.next(payload);
            })
    }

    public firebaseSignUp(firstName: string, lastName: string, email: string, password: any, photoUrl: string, isActive: string, class_name: any = '', roll_no: any = '') {
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
                        class_name: class_name,
                        roll_no: roll_no,
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

    updatePhotoOnChatUser(photoUrl) {
       // console.log(photoUrl.profile_pic);
        
        var uuid = localStorage.getItem('fbtoken');
        //const userRef1 = this.db.doc(`users/${uuid}`);
        console.log("sddsd",uuid);
        this.db.collection('users').doc(uuid).get().toPromise().then((resp: any) => {
            let res = resp.data();
            
            
            const userRef = this.db.doc(`users/${uuid}`);
            const updateUser = {
                id: uuid,
                email: res.email,
                firstName: res.firstName,
                lastName: res.lastName,
                photoUrl: photoUrl.profile_pic,
                class_name: res.class_name,
                roll_no: res.roll_no,
                isActive: res.isActive
            }
            console.log(updateUser);
            
            userRef.set(updateUser)
        });

    }
    updateClassAndRollChatUser(data) {
        // console.log(photoUrl.profile_pic);
         
         var uuid = '';
         if(data.firebase_id){
            uuid = data.firebase_id;
         }else{
            uuid = localStorage.getItem('fbtoken');
         }
         //const userRef1 = this.db.doc(`users/${uuid}`);
         //console.log("sddsd",uuid);
         this.db.collection('users').doc(uuid).get().toPromise().then((resp: any) => {
             let res = resp.data();
             
            
             const userRef = this.db.doc(`users/${uuid}`);
             console.log(data);
            let class_alias:any='';
             if(data.class_alias){
                class_alias=data.class_alias
            }else{
                class_alias=data.alias_class
            }
             const updateUser = {
                 id: uuid,
                 email: res.email,
                 firstName: res.firstName,
                 lastName: res.lastName,
                 photoUrl: res.photoUrl,
                 class_name: class_alias,
                 roll_no: data.roll_no,
                 isActive: res.isActive
             }
             //console.log(updateUser);
             
             userRef.set(updateUser)
         });
 
     }
    updateFirebasePassword(email, oldP, password) {
        var result = this.afAuth.signInWithEmailAndPassword(email, oldP);
        result.then((res: any) => {
            localStorage.setItem('fbtoken', res.user.uid);
            this.updatePassword(email, password)
        }, (error) => {
            console.log(error);
            //this.updatePassword(email,password)
        })


    }

    updatePassword(email, newPassword) {
        this.afAuth.currentUser.then((res) => {
            res.updatePassword(newPassword).then(update => {
                localStorage.removeItem('hash');
            }, (error) => {
                console.log(error);
            })
        })
    }
}
