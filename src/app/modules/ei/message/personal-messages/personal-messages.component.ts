import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base/base.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personal-messages',
  templateUrl: './personal-messages.component.html',
  styleUrls: ['./personal-messages.component.css']
})
export class PersonalMessagesComponent implements OnInit {
  @ViewChild('closeButton') closeButton: any;
  isLoggedIn: boolean;
  messageData: any = [];
  currentUser: any = "";
  ids: Array<any> = [];
  recepintDetails: any = {};
  conversation: any = [];
  dataStudent: any = [];
  objStudent: any = {};
  lastMessageData: any = [];
  groupList: any = [];
  lastGroupmsg: any = [];
  groupexit: number = 0;
  setting_user: any = { 'online': true, 'is_seen': true, 'is_read': true }
  lastGroupmsgCount: any[];
  groupListNew: any[];
  receipentUsers: any = [];
  blockUserList: any = [];
  objBlock: any;
  isblock: any;
  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private notifypush: FirebaseService,
    private location: Location,
    private baseService: BaseService

  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.baseService.isLoggedIn();
    this.currentUser = localStorage.getItem("fbtoken");
    if (this.currentUser) {
      this.firestore.collection('setting').doc(this.currentUser).valueChanges().subscribe((res: any) => {
        if (res) {
          // console.log(res.setting);

          this.setting_user = res.setting;
        }
      })
    }
    this.getGroupDetails(this.currentUser)
    if (this.isLoggedIn) {
      this.lastMessageData = []
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
    that.ids.push(this.firestore.collection('user_friend_list').ref.where('user_request_id', '==', loginfirebase_id).get().then(res => {
      return res.docChanges().map(doc => {
        return doc.doc.id;
      })
    }))

    that.ids.push(this.firestore.collection('user_friend_list').ref.where('user_accept_id', '==', loginfirebase_id).get().then(res => {
      return res.docChanges().map(doc => {
        return doc.doc.id;
      })
    }))
    this.getMessageList()
  }
  createChatGroup() {
    localStorage.removeItem("groupclasscheck")
    localStorage.removeItem("sections")
    localStorage.removeItem("standardIds")
    localStorage.removeItem("courseIds")
    localStorage.removeItem("teachers")
    localStorage.removeItem("alreadyGroupMember")
    localStorage.removeItem("groupUsers")

    this.router.navigate(["ei/group-chat"], { queryParams: { "newgrp": "C" } });
  }
  getMessageList() {

    this.messageData = [];
    this.ids.forEach(elem => {
      elem.then((res: any) => {
        res.forEach(element => {
          var user_friend = "";
          this.firestore.collection('chat_conversation').doc(element).valueChanges().subscribe((res1: any) => {

            if (res1) {
              this.messageData[element] = [];
              if (user_friend != element) {
                if (res1.data) {
                  res1.data.forEach(ele => {
                     
                    if (ele.is_read == 1 && ele.user_send_by != this.currentUser) {
                      if (!this.messageData.find(e => { return e.timestamp == ele.timestamp })) {
                        this.messageData[ele.user_friend_id].push(ele)
                        console.log(this.messageData);
                        
                      }
                    }
                  });

                }

                this.firestore.collection('user_friend_list').doc(element).get().toPromise().then((resRecepent: any) => {
                  var uuid = ''
                  if (resRecepent.data().user_request_id == this.currentUser && resRecepent.data().user_accept_id != this.currentUser) {
                    uuid = resRecepent.data().user_accept_id;
                  }
                  if (resRecepent.data().user_accept_id == this.currentUser && resRecepent.data().user_request_id != this.currentUser) {
                    uuid = resRecepent.data().user_request_id;
                  }
                  if (uuid && res1.data) {
                    this.firestore.collection('users').doc(uuid).ref.get().then(res => {
                      this.recepintDetails = res.data();
                      res1.data[res1.data.length - 1].uuid = uuid;
                      res1.data[res1.data.length - 1].user_friend_id = element;
                      res1.data[res1.data.length - 1].class_name = this.recepintDetails.class_name;
                      res1.data[res1.data.length - 1].roll_no = this.recepintDetails.roll_no;
                      res1.data[res1.data.length - 1].profile_pic = this.recepintDetails.photoUrl;
                      res1.data[res1.data.length - 1].user_name = this.recepintDetails.firstName + ' ' + (!this.recepintDetails.lastName ? '' : this.recepintDetails.lastName);
                      res1.data[res1.data.length - 1].group = 0
                      this.lastMessageData.push(res1.data[res1.data.length - 1]);
                      this.lastMessageData.sort(function (x, y) {
                        return y.timestamp - x.timestamp;
                      })
                    });
                  }

                })
                user_friend = element;
              }

            }
          })


        });
      })
    })

  }
  goToChatScreen(fbid, frndListId, chatConversion: any, click) {
    this.conversation = [];
    this.dataStudent = [];
    localStorage.setItem('friendlidt_id', frndListId);
    this.getRecepintUserDetails(fbid)
    return new Promise<any>((resolve, reject) => {
      let data: any = {};
      var date = new Date();
      var uuid = fbid;
      data.user_request_id = localStorage.getItem('fbtoken');
      data.user_accept_id = uuid;
      data.is_block = 0
      data.is_seen = 0
      data.is_active = 1
      data.is_read = 0
      data.created_on = this.baseService.getDateFormat(date);
      this.getFriendListBySender(localStorage.getItem('fbtoken'), uuid, data, chatConversion, click)
    })


  }
  getFriendListBySender(loginfirebase_id: any, user_accept_id: any, data, chatConversion: any, click?: any) {
    this.conversation = [];
    this.dataStudent = [];
    this.firestore.collection('user_friend_list').valueChanges().subscribe((res: any) => {
      let dataEle = res.find(elem => {
        return ((elem.user_request_id === loginfirebase_id && elem.user_accept_id === user_accept_id) || (elem.user_request_id === user_accept_id && elem.user_accept_id === loginfirebase_id))
      })

      if (dataEle) {

        this.firestore.collection('user_friend_list').get()

          .subscribe(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.docs.map(doc => {
                let res: any = []
                res = doc.data();
                if (dataEle.user_request_id == res.user_request_id && dataEle.user_accept_id == res.user_accept_id) {
                  localStorage.setItem("friendlidt_id", doc.id)
                  this.getDocumentsChat(chatConversion, click);
                }
              });
            }

          });
      } else {
        this.firestore.collection("user_friend_list").add(data).then(res => {
          localStorage.setItem("friendlidt_id", res.id)
          this.getDocumentsChat(chatConversion);

        })
      }


    })


  }

  setUserSettingOnFirebase(event, type) {

    if (event) {
      if (type == 'online') {
        this.setting_user.online = event;
      } else if (type == 'last_seen') {
        this.setting_user.is_seen = event;
      } else if (type == 'is_read') {
        this.setting_user.is_read = event;
      }
    } else {
      if (type == 'online') {
        this.setting_user.online = event;
      } else if (type == 'last_seen') {
        this.setting_user.is_seen = event;
      } else if (type == 'is_read') {
        this.setting_user.is_read = event;
      }
    }


    this.firestore.collection('setting').doc(this.currentUser).set({
      setting: this.setting_user
    })
  }
  getDocumentsChat(chatConversion, click?: any) {


    this.conversation = [];
    this.dataStudent = [];
    var uuid = localStorage.getItem("friendlidt_id");
    localStorage.setItem('isread', "1");
    if (click) {
      this.router.navigate(["ei/messages-details"], { queryParams: { "chat": chatConversion } });
    }
  }
  getGroupDetails(uuid) {
    console.log(uuid);
    
    this.groupList = [];
    this.groupListNew = [];
    this.lastGroupmsgCount = []
    this.firestore.collection('group').snapshotChanges().subscribe((res: any) => {
      res.forEach(element => {

        this.firestore.collection('group').doc(element.payload.doc.id).valueChanges().subscribe((res: any) => {
          //console.log(res);
          res.uuid = element.payload.doc.id;
          res.group = 1
          res.timestamp = 0;
          if (!res.group_icon) {
            res.group_icon = "assets/images/userWebsite/users.png";
          }
          this.lastGroupmsgCount[element.payload.doc.id] = []
          
          
          this.firestore.collection('chat_conversation').doc(element.payload.doc.id).valueChanges().subscribe((res1: any) => {
            if (res1) {
               
              
              res1.data.forEach(elements => {
                if (elements.is_read == 1 && !elements.is_creatted && elements.user_send_by !== localStorage.getItem('fbtoken')) {
                  if (!this.lastGroupmsgCount[element.payload.doc.id].find(el => { return el.timestamp == elements.timestamp })) {
                    this.lastGroupmsgCount[element.payload.doc.id].push(elements);
                    
                    
                    
                  }
                }
              });
            }
          })
          res.reciepent.forEach(ele => {
            console.log("res1",ele[uuid]);
            if (ele[uuid] && (ele[uuid].is_remove == 0 && ele[uuid].is_exit == 0)) {
              
              var index = this.groupList.find((e) => { return e.group_title == res.group_title })
              
              if (!index) {
                
                // this.groupList.push(res)
                this.firestore.collection('chat_conversation').doc(element.payload.doc.id).valueChanges().subscribe((res1: any) => {
                  //console.log(res1.data[res1.data.length-1]);
                  this.lastGroupmsg[element.payload.doc.id] = []
                  if (!this.lastGroupmsg[element.payload.doc.id].find(el => { return el.timestamp == res1.data[res1.data.length - 1].timestamp })) {
                    if (res1) {
                      this.lastGroupmsg[element.payload.doc.id].push(res1.data[res1.data.length - 1])
                     
                      
                     if(res1.data[res1.data.length - 1]){
                      res.timestamp = res1.data[res1.data.length - 1].timestamp;
                      res.group = 1
                     }else{
                      res.timestamp = 0
                     }
                    }
                  }

                })

                this.groupList.push(res)
                this.lastMessageData.push(res)
                this.lastMessageData.sort(function (x, y) {
                  return y.timestamp - x.timestamp;
                })
                //console.log(this.lastMessageData);
                
              }

            } else {
              this.groupexit = 1;
            }

          });
        
          //console.log( this.lastMessageData);
          


        })
      });

    })


  }
  getRecepintUserDetails(uuid) {
    localStorage.setItem("receipent", uuid);
    this.firestore.collection('users').doc(uuid).ref.get().then(res => {
      this.recepintDetails = res.data();
    });

  }
  messageDetails(uid, chatConversion) {
    localStorage.setItem('guuid', uid);
    if (this.lastGroupmsgCount[uid].length > 0) {
      localStorage.setItem('isread', "1");
    }

    this.router.navigate(["ei/messages-details"], { queryParams: { "chat": chatConversion, "isread": 1 } });
  }
  goToStudentList() {
    this.closeButton.nativeElement.click();
    this.router.navigate(["ei/student-verified-list"], { queryParams: { "approved": 1, "title": 'Verified' } });
  }
  goToTeacherList() {
    this.closeButton.nativeElement.click();
    this.router.navigate(["ei/subadmin-completed-request"]);
  }
  goBack(): void {
    this.location.back();
  }

  blockUsersList() {
    this.firestore.collection('block_user_list').doc(this.currentUser).valueChanges().subscribe((res: any) => {
      if (res.data) {

        res.data.forEach(element => {
          if (element.isblock == true) {
            this.getUserRecepintDetails(element.uuid, '', element.isblock)
          }
        });

       // console.log(this.receipentUsers);

      }

    })

  }


  getUserRecepintDetails(uuid: any, text: any = '', isblock?: any) {
    if (text == 'group') {
      //this.receipentUsers.push(k)
      localStorage.setItem("receipent", uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
        // this.recepintDetails = res.data();
        let resp: any = {}
        resp = res.data()
        if (!this.receipentUsers.find(responce => { return responce.id == resp.id }))
          this.receipentUsers.push(resp)
      });
      //console.log(this.receipentUsers);

    } else {
      if (uuid) {
        this.firestore.collection('users').doc(uuid).ref.get().then(res => {
          this.recepintDetails = res.data();
          let resp: any = {}
          this.recepintDetails.isblock = isblock
          if (!this.receipentUsers.find(responce => { return responce.id == this.recepintDetails.id }))
            this.receipentUsers.push(this.recepintDetails)
         // console.log(this.receipentUsers);
          //console.log('recipants details is as ::', this.recepintDetails)
        });
      }
    }


  }

  blockPaticipant(particepantid, isblock) {

    // console.log(particepantid,this.currentUser);

    var index = this.blockUserList.findIndex(e => { return e.uuid == particepantid })
    //console.log(index);

    if (index > -1) {
      this.blockUserList.slice(index, 1)

    } else {
      this.blockUserList.push({ isblock: isblock, uuid: particepantid });
    }
    var objList = this.blockUserList.find(e => { return e.uuid == particepantid });
    if (objList) {
      objList.isblock = isblock;
      this.objBlock = objList;
      this.isblock = objList.isblock;
      // this.blockUserList.push(objList)
      //console.log(this.blockUserList);
    }
    this.firestore.collection('block_user_list').doc(this.currentUser).set({ data: this.blockUserList })
    // this.router.navigate(['ei/personal-messages'])
    //this.blockUserList


  }
  unblockPaticipant(particepantid) {
    var index = this.blockUserList.findIndex(e => { return e.uuid == particepantid })
    //console.log(index);
    if (index > -1) {
      this.blockUserList.slice(index, 1)
    }
    var objList = this.blockUserList.find(e => { return e.uuid == particepantid });
    if (objList) {
      objList.isblock = false;
      this.objBlock = objList;
      this.isblock = objList.isblock;
      // this.blockUserList.push(objList)
     // console.log(this.blockUserList);
    }
    this.firestore.collection('block_user_list').doc(this.currentUser).set({ data: this.blockUserList })
    //this.router.navigate(['ei/personal-messages'])
  }

}
