import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Observable } from 'rxjs';
// import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  // @ViewChild(ScrollToBottomDirective)
  // scroll: ScrollToBottomDirective;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  model: any = {};
  dataStudent: any = [];
  conversation: any = [];
  recepintDetails: any = {};
  currentUser: any;
  presence$: any
  uuid: any
  lastMessageData: any = [];
  ids: any = [];
  scrollHeight: any = 300;
  params: any;
  recepientGroup: any;
  recepientUsers:any;
  recepientIcon:any;
  receipentUsers: any=[];
  lastGroupChatData:any=[];
  is_admin_in_group=0;
  is_teacher_in_group=0
  groupexit: number=0;
  blockUserList:any=[];
  isblock:any=false;
  objBlock:any={};
  blockRecipant:any=false;
  blockRecipant1:any=false;
  online: any;
  is_last_seen:any
  constructor(
    private location: Location,
    private baseService: BaseService,
    private firestore: AngularFirestore,
    private chatService: ChatService,
    private alert: NotificationService,
    private firebaseService: FirebaseService,
    private route:ActivatedRoute,
    private router:Router
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      this.params=params;
    })
    if(this.params.chat){
      this.currentUser = localStorage.getItem('fbtoken');
      this.recepientUsers=[]
      let group_admin:any=[]
      let group_student:any=[]
      this.firestore.collection('group').doc(localStorage.getItem("guuid")).valueChanges().subscribe((res:any)=>{
        res.reciepent.forEach(element => {
          if(element[localStorage.getItem('fbtoken')]){
            if(element[localStorage.getItem('fbtoken')].is_remove==0 && element[localStorage.getItem('fbtoken')].is_exit==0){
              this.groupexit=0;
            }else{
              this.groupexit=1;
            }
              
            
          }
           
          //console.log(element);
          Object.keys(element).forEach(el=>{
            if(element[el].is_remove==0 && element[el].is_exit==0){
              if(element[el].is_admin==1){
                group_admin.push(element[el].is_admin)
              }
              if(element[el].is_student==1){
                group_student.push(element[el].is_student)
              }
              
              this.getRecepintUserDetails(el,'group');
             // console.log(el);
            }
           
          })
              if(group_student.length>0)
              {
                this.is_teacher_in_group=1
              }
              //
              if(group_admin.length>0){
                this.is_admin_in_group=1;
              }
        });
        if(!res.group_icon){
          this.recepientIcon=undefined;
        } 
        this.recepientGroup=res
        console.log(this.recepientUsers);
        
      })
      this. getDocumentsChat('')
    }else{
      this.uuid = '';
      if (localStorage.getItem('uuid')) {
        
        this.uuid = localStorage.getItem('uuid');
        this.getDocumentsChat(this.uuid);
      }
      this.currentUser = localStorage.getItem('fbtoken');
      this.firestore.collection('setting').doc(this.uuid).valueChanges().subscribe((res:any)=>{
        
        
        if(res){
           
          this.online=res.setting.online;
          this.is_last_seen=res.setting.is_seen;
          
        }
      })
      this.firestore.collection('block_user_list').doc(this.currentUser).valueChanges().subscribe((res:any)=>{
        // console.log("bbb",res);
         
         if(res){
           //console.log("uuuu",this.uuid);
           
            this.blockUserList=res.data;
            console.log(this.blockUserList);
            
            var objList=this.blockUserList.find(e=>{return e.uuid==this.uuid});
            console.log(objList);
            if(objList){
             this.objBlock=objList;
             this.isblock=objList.isblock;
             this.blockRecipant1=objList.isblock;
             console.log("block user",this.isblock);
            }
           
            
         }
       })
       this.firestore.collection('block_user_list').doc(this.uuid).valueChanges().subscribe((res:any)=>{
         // console.log("bbb",res);
         if(res) {
          var objB = res.data.find(e=>{return e.uuid==this.currentUser})
           this.blockRecipant=objB.isblock;
         }
       })
      this.presence$ = this.firebaseService.getPresence(this.uuid);
      setTimeout(() => {
        this.uuid = localStorage.getItem('uuid');
        this.getDocumentsChat(this.uuid);
      }, 500);
    }
    
  }

  gotToGroupDetailsPage(uuid,chat){
    console.log(uuid);
    
    this.router.navigate(['user/group-detail'],{queryParams:{chat:chat,groupId:localStorage.getItem("guuid")}})
  }

  
  ngDoCheck() {
    this.uuid = localStorage.getItem('uuid');
    this.scrollToBottom();
   
  }

  scrollToBottom(): void {
    try {


      this.scrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getDocumentsChat(uuid: any) {
   
    this.conversation = [];
    this.dataStudent = [];
   
    let chatData:any=[]
    if(this.params.chat){
      this.lastGroupChatData=[];
      var uuid1 = localStorage.getItem("guuid");
      var that =this;
      var dataSet = this.firestore.collection('chat_conversation').doc(uuid1).valueChanges();
      dataSet.subscribe((res: any) => {
        if (res) {
          res.data.forEach(element1 => {
            element1.receipentList.forEach(element => {
              console.log(element);
              if(element[localStorage.getItem('fbtoken')]){
                if(element[localStorage.getItem('fbtoken')].is_remove==0 && element[localStorage.getItem('fbtoken')].is_exit==0){
                  
                  var obj=chatData.find(el=>{return el.timestamp==element1.timestamp})
                  if(!obj)
                  chatData.push(element1)
                  this.lastGroupChatData.push(res.data[res.data.length-1]);
                }
              }
              
            });
          });
          
          
          //
          this.conversation = chatData;
          this.dataStudent = chatData;
          if(localStorage.getItem('isread')){
            localStorage.removeItem('isread')
            this.firestore.collection('chat_conversation').doc(uuid1).set({"data":this.conversation})
          }
        } else {
          this.conversation = [];
          this.dataStudent = [];
        }
  
      })
    }else{
      var uuid1 = '';
      let uid = uuid;
      if (localStorage.getItem("friendlidt_id")) {
        uuid1 = localStorage.getItem("friendlidt_id");
        
  
        var dataSet = this.firestore.collection('chat_conversation').doc(uuid1).valueChanges();
        dataSet.subscribe((res: any) => {
          if (res) {
            
  
            // this.conversation = res.data;
            // this.dataStudent = res.data;
            res.data.forEach(element => {
              element.is_read=0
            });
            
            this.conversation = res.data;
            this.dataStudent = res.data;
            if(localStorage.getItem('isread')){
              localStorage.removeItem('isread')
              this.firestore.collection('chat_conversation').doc(uuid1).set({"data":this.conversation})
            }
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
  getRecepintUserDetails(uuid: any,text:any='') {
    if(text=='group'){
      //this.receipentUsers.push(k)
      localStorage.setItem("receipent",uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
     // this.recepintDetails = res.data();
     let resp:any={}
     resp = res.data()
     if(!this.receipentUsers.find(responce=>{return responce.id==resp.id}))
      this.receipentUsers.push(resp )
      });
      //console.log(this.receipentUsers);
      
    }else{
      if (uuid) {
        this.firestore.collection('users').doc(uuid).ref.get().then(res => {
          this.recepintDetails = res.data();
          console.log('recipants details is as ::', this.recepintDetails)
        });
      }
    }
    

  }
  sendChat(document?: any) {
  
  if (this.model.comment)
    this.model.comment = this.model.comment.trim()
  if (!this.model.comment && !document) {
    return;
  }
  if(this.params.chat){
    return new Promise<any>((resolve, reject) => {
     
       this.firestore.collection('group').doc(localStorage.getItem("guuid")).valueChanges().subscribe((res:any)=>{
        
        res.uuid=localStorage.getItem("guuid");
          res.reciepent.forEach(ele => {
            console.log(ele)
           // console.log(ele[localStorage.getItem('fbtoken')].is_exit)
            if(ele[localStorage.getItem('fbtoken')] && (ele[localStorage.getItem('fbtoken')].is_remove==0 &&  ele[localStorage.getItem('fbtoken')].is_exit==0)){
             console.log("fdfdfd");
             
              let data: any = {};
              let dataNew: any = {};
              let userData = JSON.parse(localStorage.getItem('userInfo'))
              data.user_friend_id = localStorage.getItem("guuid");
              data.user_send_by = localStorage.getItem('fbtoken');
              data.user_name = userData.first_name + ' ' + userData.last_name;
              data.profile_pic = userData.profile_pic
              data.document = document ? true : false;
              data.msg = document ? document : this.model.comment;
              data.is_read = 1
              data.timestamp = new Date().valueOf();
              data.receipentList =res.reciepent
              this.dataStudent.push(data)
              dataNew.data = this.dataStudent;
              this.model.comment = '';
               // console.log(dataNew.data);
              this.firestore.collection("chat_conversation/").doc(data.user_friend_id)
              .set(dataNew)
              .then(
                res => {

                  this.getDocumentsChat("")
                  


                },
                err => reject(err)
              )
              
            } 
            
          });
          
        
        
      })
      
     
     

    })
  }else{

    if(this.blockRecipant1){
      this.alert.error("Please Unblock this receipant","Error");
      return false;
    }
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
      data.is_read = 1
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
  }

  getTimeAgo(time: any) {
    return this.chatService.getTimeAgo(time)
  }

  goBack() {
    this.location.back()
  }

  gotoChatPrivacy() {

  }
  blockPaticipant(particepantid){
    console.log(particepantid,this.currentUser);
     
     var index=this.blockUserList.findIndex(e=>{return e.uuid==particepantid})
     console.log(index);
     
     if(index>-1){
       this.blockUserList.slice(index,1)
       
     }else{
       this.blockUserList.push({isblock:true,uuid:particepantid});
     }
     var objList=this.blockUserList.find(e=>{return e.uuid==particepantid});
     if(objList){
      objList.isblock=true;
      this.objBlock=objList;
      this.isblock=objList.isblock;
     // this.blockUserList.push(objList)
      console.log( this.blockUserList);
     }
     this.firestore.collection('block_user_list').doc(this.currentUser).set({data:this.blockUserList})
    // this.router.navigate(['ei/personal-messages'])
     //this.blockUserList
     
 
   }
   unblockPaticipant(particepantid){
     var index=this.blockUserList.findIndex(e=>{return e.uuid==particepantid})
     console.log(index);
     if(index>-1){
       this.blockUserList.slice(index,1)
     }
     var objList=this.blockUserList.find(e=>{return e.uuid==particepantid});
     if(objList){
      objList.isblock=false;
      this.objBlock=objList;
      this.isblock=objList.isblock;
     // this.blockUserList.push(objList)
      console.log( this.blockUserList);
     }
     this.firestore.collection('block_user_list').doc(this.currentUser).set({data:this.blockUserList})
     //this.router.navigate(['ei/personal-messages'])
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

  getFileExtention(url) {
    var exArr = url.split("/");
    // console.log(exArr[(exArr.length-1)].split(".")[1]);

    return exArr[(exArr.length - 1)].split(".")[1];
  }

}
