import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../../services/base/base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';
@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})
export class MessagesDetailsComponent implements OnInit {
  model: any = {};
  dataStudent: any = [];
  conversation: any = [];
  currentUser: any;
  recepintDetails: any = {};
  
  constructor(
    public baseService: BaseService,
    private firestore: AngularFirestore,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("receipent")){
      this.getRecepintUserDetails(localStorage.getItem("receipent"));
      this.currentUser = localStorage.getItem('fbtoken');    
    }
    this.getDocumentsChat()
  }
  getRecepintUserDetails(uuid) {
    
    this.firestore.collection('users').doc(uuid).ref.get().then(res => {
    this.recepintDetails = res.data();
    });
    
}
  sendChat() {
    return new Promise<any>((resolve, reject) => {

      let data: any = {};
      let dataNew: any = {};
      data.user_friend_id = localStorage.getItem("friendlidt_id");
      data.user_send_by = localStorage.getItem('fbtoken');
      data.msg = this.model.comment;
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
      
    })
  }

  getTimeAgo(time: any) {
    return this.chatService.getTimeAgo(time)
  }
}
