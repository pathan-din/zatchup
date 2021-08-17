import { KeyValue, Location } from '@angular/common';
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
  lastMessageData: any = [];
  ids: any = [];
  groupList: any;
  lastGroupmsg: any;
  setting_user:any={'online':true,'is_seen':true,'is_read':true}
  messageData: any[];
  lastGroupmsgCount: any=[];
  recentMesg:any=[];
  receipentUsers: any = [];
  isblock: any;
  objBlock: any;
  blockUserList : any = [];
  totalChatData:any=[];
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
    if (localStorage.getItem('fbtoken')) {
      this.currentUser = localStorage.getItem('fbtoken');
      if(this.currentUser){
        this.firestore.collection('setting').doc(this.currentUser).valueChanges().subscribe((res:any)=>{
          if(res){
            this.setting_user=res.setting;
          }
        })
      }
      this.getUsersWithModeratorRole(this.currentUser)
      this.getGroupDetails(localStorage.getItem('fbtoken'))
     }

    
  }
  setUserSettingOnFirebase(event,type){
    
    if(event){
     if(type=='online'){
       this.setting_user.online=event;
     }else if(type=='last_seen'){
       this.setting_user.is_seen=event;
     }else if(type=='is_read'){
       this.setting_user.is_read=event;
     }
    }else{
     if(type=='online'){
       this.setting_user.online=event;
     }else if(type=='last_seen'){
       this.setting_user.is_seen=event;
     }else if(type=='is_read'){
       this.setting_user.is_read=event;
     }
    }
    this.firestore.collection('setting').doc(this.currentUser).set({
       setting: this.setting_user 
      })
   } 


 
   blockUsersList(){
    this.firestore.collection('block_user_list').doc(this.currentUser).valueChanges().subscribe((res:any)=>{
     if(res.data){
    
      res.data.forEach(element => {
        if(element.isblock == true){
          this.getRecepintUserDetails(element.uuid, '', element.isblock)
        }
      });
       
      
     }

    })
    
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
  getGroupDetails(uuid){
    this.groupList=[];
    this.lastGroupmsg=[];
    this.lastGroupmsgCount=[];
    this.firestore.collection('group').snapshotChanges().subscribe((res:any)=>{
      res.forEach(element => {
         
        this.firestore.collection('group').doc(element.payload.doc.id).valueChanges().subscribe((res:any)=>{
           
          res.uuid=element.payload.doc.id;
          res.group=1
          res.timestamp = 0;
          if(!res.group_icon){
            res.group_icon="assets/images/userWebsite/users.png";
          }
          this.lastGroupmsgCount[element.payload.doc.id]=[]
          this.firestore.collection('chat_conversation').doc(element.payload.doc.id).valueChanges().subscribe((res1: any) => {
           if(res1){
            res1.data.forEach(elements => {
              if(elements.is_read==1 && !elements.is_creatted && elements.user_send_by!==localStorage.getItem('fbtoken')){
                if(!this.lastGroupmsgCount[element.payload.doc.id].find(el=>{return el.timestamp==elements.timestamp})){
                  this.lastGroupmsgCount[element.payload.doc.id].push(elements);
                }
                
                
              }
            });
           }
           
            
           });
          
            res.reciepent.forEach(ele => {
              
              if(ele[uuid] && (ele[uuid].is_remove==0 &&  ele[uuid].is_exit==0)){
                var index=this.groupList.find((e)=>{return e.group_title==res.group_title})
                if(!index){
                  
                  
                  this.firestore.collection('chat_conversation').doc(element.payload.doc.id).valueChanges().subscribe((res1: any) => {
                    this.lastGroupmsg[element.payload.doc.id]=[]
                    if(!this.lastGroupmsg[element.payload.doc.id].find(el=>{return el.timestamp==res1.data[res1.data.length-1].timestamp}))
                    if(res1 ){
                      if(res1.data[res1.data.length-1].is_delete!=1){
                        
                        
                        this.lastGroupmsg[element.payload.doc.id].push(res1.data[res1.data.length-1])
                       
                      }
                      if(res1.data[res1.data.length-1]){
                        res.timestamp = res1.data[res1.data.length-1].timestamp;
                      }else{
                        res.timestamp = 0;
                      }
                      
                    }
                    
                    
                    res.group=1
                   })
                   this.groupList.push(res)
                   this.lastMessageData.push(res)
                   this.groupList.sort(function(x, y){
                    return  y.timestamp -  x.timestamp;
                  }) 
                }
              }
              
            });
            
            
           })
           
      });
      
    })
    
    
    
  }
  goToChat(uuid, userFriendId) {
    localStorage.setItem('uuid', uuid);
    localStorage.setItem('friendlidt_id', userFriendId)
    localStorage.setItem('isread1', "1");
    this.router.navigate(["user/chat"]);
  }
  messageDetails(uid,chatConversion){
    console.log(uid);
    
    localStorage.setItem('guuid', uid);
    if(this.lastGroupmsgCount[uid].length>0){
      localStorage.setItem('isread1', "1");
    }
    this.router.navigate(["user/chat"],{queryParams:{"chat":chatConversion}});
  }
  getMessageList() {
    this.lastMessageData = [];
    this.messageData = [];
    this.ids.forEach(element => {
      element.then((res: any) => {
        res.forEach(element1 => {
          var user_friend = "";
          this.firestore.collection('chat_conversation').doc(element1).valueChanges().subscribe((res1: any) => {

            if (res1) {
              if (user_friend != element1) {
                if(res1.data)
                {
                  this.messageData[element1]=[]
                  res1.data.forEach(ele => {
                    if(ele.is_read==1 && ele.user_send_by!=this.currentUser){
                      if(!this.messageData.find(e=>{return e.timestamp==ele.timestamp})){
                        this.messageData[ele.user_friend_id].push(ele)
                      }
                    }
                  });
                  
                }
                this.firestore.collection('user_friend_list').doc(element1).get().toPromise().then((resRecepent: any) => {
                  var uuid = ''
                  if (resRecepent.data().user_request_id == this.currentUser && resRecepent.data().user_accept_id != this.currentUser) {
                    uuid = resRecepent.data().user_accept_id;
                  }
                  if (resRecepent.data().user_accept_id == this.currentUser && resRecepent.data().user_request_id != this.currentUser) {
                    uuid = resRecepent.data().user_request_id;
                  }
                  this.firestore.collection('users').doc(uuid).ref.get().then(res => {
                    this.recepintDetails = res.data();
                    res1.data[res1.data.length - 1].uuid = uuid;
                    res1.data[res1.data.length-1].user_friend_id = element1;
                    if(!this.recepintDetails){

                    }else{
                      res1.data[res1.data.length - 1].profile_pic = this.recepintDetails.photoUrl;
                      res1.data[res1.data.length - 1].user_name = this.recepintDetails.firstName + ' ' + (!this.recepintDetails.lastName ? '' : this.recepintDetails.lastName);
                    }
                    
                    res1.data[res1.data.length - 1].group=0
                    this.lastMessageData.push(res1.data[res1.data.length - 1]);
                    this.lastMessageData.sort(function(x, y){
                      return  y.timestamp -  x.timestamp;
                    }) 
                    
                  });
                })
                user_friend = element1;
              }
            }
          })
        });
      })
    });
    
    
  
  
    
  }

  goBack() {
    this.location.back();
  }

  getExtenion(fileName: any) {
    if (this.isValidHttpUrl(fileName)) {
      let extension = fileName.split('.').pop();
      if (extension == 'pdf')
        return 'Attachment'
      return 'Attachment'
    }
    return fileName
  }

  isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }


  getRecepintUserDetails(uuid: any,text:any='', isblock?: any) {
    if(text=='group'){
       
      localStorage.setItem("receipent",uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
      
     let resp:any={}
     resp = res.data()
     if(!this.receipentUsers.find(responce=>{return responce.id==resp.id}))
      this.receipentUsers.push(resp )
      });
      
      
    }else{
      if (uuid) {
        this.firestore.collection('users').doc(uuid).ref.get().then(res => {
          this.recepintDetails = res.data();
          let resp:any={}
          this.recepintDetails.isblock = isblock
          if(!this.receipentUsers.find(responce=>{return responce.id==this.recepintDetails.id}))
           this.receipentUsers.push(this.recepintDetails )
       
        });
      }
    }
    

  }

  blockPaticipant(particepantid, isblock){ 
     
     var index=this.blockUserList.findIndex(e=>{return e.uuid==particepantid})
      
     
     if(index>-1){
       this.blockUserList.slice(index,1)
       
     }else{
       this.blockUserList.push({isblock:isblock,uuid:particepantid});
     }
     var objList=this.blockUserList.find(e=>{return e.uuid==particepantid});
     if(objList){
      objList.isblock=isblock;
      this.objBlock=objList;
      this.isblock=objList.isblock;
      
     }
     this.firestore.collection('block_user_list').doc(this.currentUser).set({data:this.blockUserList})
     
     
 
   }
   unblockPaticipant(particepantid){
     var index=this.blockUserList.findIndex(e=>{return e.uuid==particepantid})
      
     if(index>-1){
       this.blockUserList.slice(index,1)
     }
     var objList=this.blockUserList.find(e=>{return e.uuid==particepantid});
     if(objList){
      objList.isblock=false;
      this.objBlock=objList;
      this.isblock=objList.isblock;
      
     }
     this.firestore.collection('block_user_list').doc(this.currentUser).set({data:this.blockUserList})
      
       }

}
