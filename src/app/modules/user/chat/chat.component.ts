import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('closeModal') closeModal: any;
  epData: any;
  model: any = {};
  editModel: any = {};
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any = [];
  requestChangeDetails: any;
  params: any;
  courseList: any;
  filename: string;
  uploadedContent: File;
  postOption: string = "matrix";
  postOptionActiveImage: string = 'dead';
  postOptionActiveMatrix: string = 'active';
  profile_pic: any = '';
  uploadInfo: any = {
    "image_type": "file_name",
    "url": "ei/uploaddocsfile/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }
  imageUrl: any;
  imagePath: any;
  dataStudent: any = [];
  conversation: any = [];
  recepintDetails: any = {};
  currentUser: any;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private firestore: AngularFirestore,
    private chatService: ChatService
  ) { }


  ngOnInit(): void {
    if (localStorage.getItem('uuid')) {
      var uuid = localStorage.getItem('uuid');
      this.getDocumentsChat(uuid);
    }
    this.currentUser = localStorage.getItem('fbtoken');
  }
  getDocumentsChat(uuid) {
    let uid = uuid;
    this.conversation = [];
    this.dataStudent = [];
    if (localStorage.getItem("friendlidt_id")) {
      var uuid1 = localStorage.getItem("friendlidt_id");
      var dataSet = this.firestore.collection('chat_conversation').doc(uuid1).valueChanges();
      dataSet.subscribe((res: any) => {
        if (res) {
          this.conversation = res.data;
          this.dataStudent = res.data;
        } else {
          this.conversation = [];
          this.dataStudent = [];
        }

      })
    }
    if (uid) {
      this.getRecepintUserDetails(uid)
      return new Promise<any>((resolve, reject) => {
        let data: any = {};
        var date = new Date();

        var uuid = uid;
        data.user_request_id = localStorage.getItem('fbtoken');
        data.user_accept_id = uuid;
        data.is_block = 0
        data.is_seen = 0
        data.is_active = 1
        data.is_read = 0
        data.created_on = this.baseService.getDateFormat(date);

        this.getFriendListBySender(localStorage.getItem('fbtoken'), uid, data)



      })
    }
  }
  getFriendListBySender(loginfirebase_id: any, user_accept_id: any, data) {
    this.conversation = [];
    this.dataStudent = [];
    this.firestore.collection('user_friend_list').valueChanges().subscribe((res: any) => {
      let dataEle = res.find(elem => {
        return ((elem.user_request_id === loginfirebase_id && elem.user_accept_id === user_accept_id) || (elem.user_request_id === user_accept_id && elem.user_accept_id === loginfirebase_id))
      })
      console.log(dataEle);

      if (dataEle) {

        this.firestore.collection('user_friend_list').get()

          .subscribe(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.docs.map(doc => {

                let res: any = []
                res = doc.data();
                if (dataEle.user_request_id == res.user_request_id && dataEle.user_accept_id == res.user_accept_id) {

                  localStorage.setItem("friendlidt_id", doc.id)
                }

              });
            }

          });
      } else {
        this.firestore.collection("user_friend_list").add(data).then(res => {
          localStorage.setItem("friendlidt_id", res.id)


        })
      }


    })


  }
  getRecepintUserDetails(uuid: any) {
    if (uuid) {
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
        this.recepintDetails = res.data();
        console.log('recipants details is as ::', this.recepintDetails)
      });
    }

  }
  sendChat() {
    return new Promise<any>((resolve, reject) => {
      let data: any = {};
      let dataNew: any = {};
      data.user_friend_id = localStorage.getItem("friendlidt_id");;
      data.user_send_by = localStorage.getItem('fbtoken');
      data.msg = this.model.comment;
      data.timestamp = new Date().valueOf();
      this.dataStudent.push(data)
      // console.log(this.dataStudent);
      dataNew.data = this.dataStudent;
      this.firestore.collection("chat_conversation/").doc(data.user_friend_id)
        .set(dataNew).then(res => {
          this.model.comment = '';
          this.getDocumentsChat('')
        },
          err => reject(err)
        )

    })
  }

  getTimeAgo(time: any) {
    return this.chatService.getTimeAgo(time)
  }

  goBack(){
    this.location.back()
  }

}
