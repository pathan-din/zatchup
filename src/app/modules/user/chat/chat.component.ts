import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Observable } from 'rxjs';
// import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  // @ViewChild(ScrollToBottomDirective)
  // scroll: ScrollToBottomDirective;

  model: any = {};
  dataStudent: any = [];
  conversation: any = [];
  recepintDetails: any = {};
  currentUser: any;
  presence$: any
  uuid: any

  constructor(
    private location: Location,
    private baseService: BaseService,
    private firestore: AngularFirestore,
    private chatService: ChatService,
    private alert: NotificationService,
    private firebaseService: FirebaseService
  ) { }


  ngOnInit(): void {
    if (localStorage.getItem('uuid')) {
      this.uuid = localStorage.getItem('uuid');
      this.getDocumentsChat(this.uuid);
    }
    this.currentUser = localStorage.getItem('fbtoken');
    this.presence$ = this.firebaseService.getPresence(this.uuid);
  }

  getDocumentsChat(uuid: any) {
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
          // console.log('conversation data is as ::',this.conversation);
          // console.log('dataStudent is as ::',this.dataStudent);

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
  sendChat(document?: any) {
    return new Promise<any>((resolve, reject) => {
      let data: any = {};
      let dataNew: any = {};
      let userData = JSON.parse(localStorage.getItem('userInfo'))
      data.user_friend_id = localStorage.getItem("friendlidt_id")
      data.user_send_by = localStorage.getItem('fbtoken');
      data.timestamp = new Date().valueOf();
      data.user_name = userData.first_name + ' ' + userData.last_name;
      data.profile_pic = userData.profile_pic
      data.document = document ? true : false;
      data.msg = document ? document : this.model.comment;
      console.log('send chat data is as ::',data)
      this.dataStudent.push(data)
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

  goBack() {
    this.location.back()
  }

  gotoChatPrivacy() {

  }


  uploadDoc(file: any) {
    try {
      // var file = this.dataURLtoFile(this.croppedImage, this.fileData.name)
      let fileList: FileList = file.target.files;
      let fileData = fileList[0];
      const formData = new FormData();
      formData.append('file_name', fileData);
      this.baseService.action('chat/uploaddocschatfile/', formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.sendChat(res.file_url)
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          // this.loader.hide();
        }, (error) => {
          // this.loader.hide();
          console.log(error);

        });
    } catch (err) {
      // this.loader.hide();
      console.log("exception", err);
    }
  }

}
