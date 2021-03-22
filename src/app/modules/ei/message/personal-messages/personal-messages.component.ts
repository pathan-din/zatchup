import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-personal-messages',
  templateUrl: './personal-messages.component.html',
  styleUrls: ['./personal-messages.component.css']
})
export class PersonalMessagesComponent implements OnInit {
  isLoggedIn: boolean;
  messageData: any = [];
  currentUser: any = "";
  ids: Array<any> = [];

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private notifypush: FirebaseService,
    private baseService: BaseService

  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.baseService.isLoggedIn();
    this.currentUser = localStorage.getItem("fbtoken");
    if (this.isLoggedIn) {
      this.notifypush.receiveMessage();
      this.notifypush.requestPermission();
      if (localStorage.getItem("fbtoken")) {
        this.currentUser = localStorage.getItem("fbtoken");
        this.getUsersWithModeratorRole(localStorage.getItem("fbtoken"));
      }
    }

  }

  getUsersWithModeratorRole(loginfirebase_id) {
    var that = this;
    //.where('user_accept_id', '==', loginfirebase_id)
    that.ids.push(this.firestore.collection('user_friend_list').ref.where('user_request_id', '==', loginfirebase_id ).get().then(res => {
      return res.docChanges().map(doc => {
        
        return doc.doc.id;
      })
    }))

    that.ids.push(this.firestore.collection('user_friend_list').ref.where('user_accept_id', '==', loginfirebase_id ).get().then(res => {
      return res.docChanges().map(doc => {
      console.log('asdaswawa    ',doc.doc.id);
        
        return doc.doc.id;
      })
    }))
    console.log('ids....',that.ids)
    this.getMessageList()
  }

  getMessageList() {
    
    //this.messageData = [];
    this.ids.forEach(elem =>{
      elem.then((res: any) => {
        res.forEach(element => {
          this.firestore.collection('chat_conversation').valueChanges().subscribe((res: any) => {
          })
          console.log('element.....',element)
          var data = this.firestore.collection('chat_conversation').doc(element).get().toPromise().then((res: any) => {
            if (res.data())
              return res.data()
          });
          data.then(res => {
            if (res)
              this.messageData.push(res.data);
            console.log('message data is as ::', this.messageData)
          })
        });
      })
    })
    
  }

  messageDetails(uid){
    localStorage.setItem('uuid', uid);
    this.router.navigate(["user/chat"]);
  }

}
