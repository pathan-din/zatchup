import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../../../services/base/base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';
// import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})
export class MessagesDetailsComponent implements OnInit {
  // @ViewChild(ScrollToBottomDirective)
  // scroll: ScrollToBottomDirective;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  model: any = {};
  dataStudent: any = [];
  conversation: any = [];
  currentUser: any;
  recepintDetails: any = {};
  scrollHeight:any=300;
  constructor(
    public baseService: BaseService,
    private firestore: AngularFirestore,
    private chatService: ChatService,
    private alert: NotificationService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("receipent")) {
      this.getRecepintUserDetails(localStorage.getItem("receipent"));
      this.currentUser = localStorage.getItem('fbtoken');
    }
    this.getDocumentsChat()
  }
  ngDoCheck() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {

        
       this.scrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  getRecepintUserDetails(uuid) {
    this.firestore.collection('users').doc(uuid).ref.get().then(res => {
      this.recepintDetails = res.data();
    });
  }

  sendChat(document?: any) {
    if(!this.model.comment){
      
      return;
    }
    
    return new Promise<any>((resolve, reject) => {
      let data: any = {};
      let dataNew: any = {};
      let userData = JSON.parse(localStorage.getItem('userprofile'))
      data.user_friend_id = localStorage.getItem("friendlidt_id");
      data.user_send_by = localStorage.getItem('fbtoken');
      data.user_name = userData.user_first_name + ' ' + userData.user_last_name;
      data.profile_pic = userData.profile_pic
      data.document = document ? true : false;
      data.msg = document ? document : this.model.comment;
      data.timestamp = new Date().valueOf();
      this.dataStudent.push(data)
      dataNew.data = this.dataStudent;
      // console.log(dataNew.data);
      this.firestore.collection("chat_conversation/").doc(data.user_friend_id)
        .set(dataNew)
        .then(
          res => {

            this.getDocumentsChat()
            this.model.comment = '';


          },
          err => reject(err)
        )

    })
  }
  getDocumentsChat() {
    this.conversation = [];
    this.dataStudent = [];
    var uuid = localStorage.getItem("friendlidt_id");
    var dataSet = this.firestore.collection('chat_conversation').doc(uuid).valueChanges();
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

  getTimeAgo(time: any) {
    return this.chatService.getTimeAgo(time)
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
  getFileExtention(url){
    var exArr = url.split("/");
   // console.log(exArr[(exArr.length-1)].split(".")[1]);
    
    return exArr[(exArr.length-1)].split(".")[1];
  }
}
