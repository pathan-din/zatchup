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
  recepintDetails:any={};
  conversation:any=[];
  dataStudent:any=[];
  objStudent:any={};
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
  goToChatScreen(fbid) {
    this.conversation = [];
    this.dataStudent =[];
    
    this.getRecepintUserDetails(fbid)
    return new Promise<any>((resolve, reject) => {
      let data: any = {};
      var date = new Date();

      var uuid =fbid;
      data.user_request_id = localStorage.getItem('fbtoken');
      data.user_accept_id = uuid;
      data.is_block = 0
      data.is_seen = 0
      data.is_active = 1
      data.is_read = 0
      data.created_on = this.baseService.getDateFormat(date);
      this.getFriendListBySender(localStorage.getItem('fbtoken'), uuid, data)
    })


  }
  getFriendListBySender(loginfirebase_id: any, user_accept_id: any, data) {
    this.conversation = [];
    this.dataStudent = [];
    this.firestore.collection('user_friend_list').valueChanges().subscribe((res:any)=>{
      let dataEle = res.find(elem=>{
                      return ((elem.user_request_id===loginfirebase_id && elem.user_accept_id===user_accept_id) || (elem.user_request_id===user_accept_id && elem.user_accept_id===loginfirebase_id))  
                    })
           
      if(dataEle){
        
        this.firestore.collection('user_friend_list').get()
         
        .subscribe(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.map(doc => {
            
              let res:any=[]
              res=doc.data();
             if(dataEle.user_request_id==res.user_request_id && dataEle.user_accept_id== res.user_accept_id)
             {
              localStorage.setItem("friendlidt_id", doc.id)
              this. getDocumentsChat();
              
             }
              
            });
          }
  
        });
      } else{
        this.firestore.collection("user_friend_list").add(data).then(res => {
          localStorage.setItem("friendlidt_id",res.id)
           this. getDocumentsChat();
          
         })
      }             
     
      
    })
     
       
       }

       
  getDocumentsChat() {
    this.conversation = [];
    this.dataStudent =[];
    var uuid= localStorage.getItem("friendlidt_id");
    var dataSet=this.firestore.collection('chat_conversation').doc(uuid).valueChanges();
    dataSet.subscribe((res:any)=>{
      if(res){
        this.conversation = res.data;
        this.dataStudent = res.data;
      }else{
        this.conversation = [];
        this.dataStudent = [];
      }
      this.router.navigate(["ei/messages-details"]);
    })
    
    
    
  }

  getRecepintUserDetails(uuid) {
    localStorage.setItem("receipent",uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
      this.recepintDetails = res.data();
      });
      
  }
  messageDetails(uid){
    localStorage.setItem('uuid', uid);
    this.router.navigate(["ei/messages-details"]);
  }

}
