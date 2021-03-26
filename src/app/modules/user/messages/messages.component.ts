import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Observable } from 'rxjs';
// import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  model: any = {};
  dataStudent: any = [];
  conversation: any = [];
  recepintDetails: any = {};
  currentUser: any;
  presence$: any
  uuid: any
  lastMessageData:any=[];
  ids:any=[];
  constructor(
    private location: Location,
    private baseService: BaseService,
    private firestore: AngularFirestore,
    private chatService: ChatService,
    private alert: NotificationService,
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    if(localStorage.getItem('fbtoken')){
      this.currentUser = localStorage.getItem('fbtoken');
      this.getUsersWithModeratorRole(this.currentUser )
    }
    
  }
  getUsersWithModeratorRole(loginfirebase_id) {
    var that = this;
    that.ids.push(this.firestore.collection('user_friend_list').ref.where('user_accept_id', '==', loginfirebase_id).get().then(res => {
      return res.docChanges().map(doc => {
        return doc.doc.id;
      })
    }))
    that.ids.push(this.firestore.collection('user_friend_list').ref.where('user_request_id', '==', loginfirebase_id).get().then(res => {
      return res.docChanges().map(doc => {
        return doc.doc.id;
      })
    }))

    this.getMessageList()
  }
  goToChat(uuid, userFriendId) {
    localStorage.setItem('uuid', uuid);
    localStorage.setItem('friendlidt_id', userFriendId)
    this.router.navigate(["user/chat"]);
  }
  getMessageList() {
    
    this.lastMessageData = [];
    
    this.ids.forEach(element => {
      element.then((res: any) => {
        res.forEach(element1 => {
          var user_friend = "";
          this.firestore.collection('chat_conversation').doc(element1).valueChanges().subscribe((res1:any)=>{
            
            if(res1){
              if(user_friend!=element1){
                  this.firestore.collection('user_friend_list').doc(element1).get().toPromise().then((resRecepent:any)=>{
                    var uuid = ''
                    if(resRecepent.data().user_request_id==this.currentUser && resRecepent.data().user_accept_id!=this.currentUser){
                      uuid = resRecepent.data().user_accept_id;
                    }
                    if(resRecepent.data().user_accept_id==this.currentUser && resRecepent.data().user_request_id!=this.currentUser){
                      uuid = resRecepent.data().user_request_id;
                    }
                    this.firestore.collection('users').doc(uuid).ref.get().then(res => {
                      this.recepintDetails = res.data();
                      res1.data[res1.data.length-1].uuid = uuid;
                      res1.data[res1.data.length-1].profile_pic = this.recepintDetails.profile_pic;
                      res1.data[res1.data.length-1].user_name = this.recepintDetails.firstName+' '+(!this.recepintDetails.lastName?'':this.recepintDetails.lastName);
                      this.lastMessageData.push(res1.data[res1.data.length-1]); 
                    });
                 })
                  user_friend=element1;
                }
                
              }
          })
          
        });
      })
    });
   
     
  }

}
