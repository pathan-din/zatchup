import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../../../../services/base/base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';
// import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Location } from '@angular/common';

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
  scrollHeight: any = 300;
  params:any={};
  chatRecepient:any=[]
  recepientGroup={};
  receipentUsers: any=[];
  groupexit: number=0;
  presence$: any;
  uuid: string;
  online: any;
  blockUserList:any=[];
  isblock:any=false;
  objBlock:any={};
  blockRecipant:any=false;
  blockRecipant1:any=false;
  is_last_seen:any;
  constructor(
    public baseService: BaseService,
    private firestore: AngularFirestore,
    private chatService: ChatService,
    private alert: NotificationService,
    private location: Location,
    private route:ActivatedRoute,
    private firebaseService: FirebaseService,
    private router:Router
  ) { }

  ngOnInit(): void {
   
    this.route.queryParams.subscribe((params:any)=>{
      this.params=params;
    })
    this.currentUser = localStorage.getItem('fbtoken');
    if(this.params.chat){
      
      this.firestore.collection('group').doc(localStorage.getItem("guuid")).valueChanges().subscribe((res:any)=>{
        this.recepientGroup=res
        
        res.reciepent.forEach(element => {
          if(element[localStorage.getItem('fbtoken')]){
            if(element[localStorage.getItem('fbtoken')].is_remove==0 && element[localStorage.getItem('fbtoken')].is_exit==0){
              this.groupexit=0;
            }else{
              this.groupexit=1;
            }
              
            
          }
          
        })
        
        res.reciepent.forEach(element => {
          //console.log(element);
          Object.keys(element).forEach(el=>{
            if(element[el].is_remove==0 && element[el].is_exit==0){
            
              this.getRecepintUserDetails(el,'group');
             // console.log(el);
            }
           
          })
          
        });
       // console.log(this.recepientGroup);
        
      })
      this. getDocumentsChat()
    }else{
      this.uuid = '';
      if (localStorage.getItem('receipent')) {
        
        this.uuid = localStorage.getItem('receipent');
        this.firestore.collection('setting').doc(this.uuid).valueChanges().subscribe((res:any)=>{
          if(res){
             
            
            this.online=res.setting.online;
            this.is_last_seen=res.setting.is_seen;

            
          }else{
            this.online=true;
          }
        })
        //console.log(this.currentUser);
        
        this.firestore.collection('block_user_list').doc(this.currentUser).valueChanges().subscribe((res:any)=>{
         // console.log("bbb",res);
          
          if(res){
            //console.log("uuuu",this.uuid);
            
             this.blockUserList=res.data;
             console.log(this.blockUserList);
             
             var objList=this.blockUserList.find(e=>{return e.uuid==this.uuid});
             
             if(objList){
              this.objBlock=objList;
              this.isblock=objList.isblock;
              this.blockRecipant1=objList.isblock;
            
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
        //this.blockRecipant
        this.presence$ = this.firebaseService.getPresence(this.uuid);
       // console.log(this.presence$);
        
      }
      if (localStorage.getItem("receipent")) {
        this.getRecepintUserDetails(localStorage.getItem("receipent"));
        this.currentUser = localStorage.getItem('fbtoken');
       
      }
      this.getDocumentsChat()
    }
    
  }
  blockPaticipant(particepantid){
   
    
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
     
    }
    this.firestore.collection('block_user_list').doc(this.currentUser).set({data:this.blockUserList})
    this.router.navigate(['ei/personal-messages'])
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
     
    }
    this.firestore.collection('block_user_list').doc(this.currentUser).set({data:this.blockUserList})
    this.router.navigate(['ei/personal-messages'])
      }
  ngDoCheck() {
    this.scrollToBottom();
  }
  gotToGroupDetailsPage(uuid,chat){
    console.log(uuid);
    
    this.router.navigate(['ei/ei-group-detail'],{queryParams:{chat:chat,groupId:localStorage.getItem("guuid")}})
  }
  scrollToBottom(): void {
    try {


      this.scrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  getRecepintUserDetails(uuid,text:any='') {
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
     // localStorage.setItem("receipent",uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
        this.recepintDetails = res.data();
        if(this.recepintDetails.photoUrl==null){
          this.recepintDetails.photoUrl=undefined;
        }
        console.log(this.recepintDetails);
      });
      
      
    }
   
  }

  sendChat(document?: any) {
  
    
    
    if(this.params.chat){
      if (this.model.comment)
      this.model.comment = this.model.comment.trim()
    if (!this.model.comment && !document) {
      return;
    }
      return new Promise<any>((resolve, reject) => {
       
         this.firestore.collection('group').doc(localStorage.getItem("guuid")).valueChanges().subscribe((res:any)=>{
          
          res.uuid=localStorage.getItem("guuid");
          //console.log(res.reciepent);
          
            res.reciepent.forEach(ele => {
              //console.log(this.dataStudent);
              if(ele[localStorage.getItem('fbtoken')] && (ele[localStorage.getItem('fbtoken')].is_remove==0 &&  ele[localStorage.getItem('fbtoken')].is_exit==0)){
                let data: any = {};
                let dataNew: any = {};
                let userData = JSON.parse(localStorage.getItem('userprofile'))
                data.user_friend_id = localStorage.getItem("guuid");
                data.user_send_by = localStorage.getItem('fbtoken');
                data.user_name = userData.user_first_name + ' ' + userData.user_last_name;
                data.profile_pic = userData.profile_pic
                data.document = document ? true : false;
                data.msg = document ? document : this.model.comment;
                data.is_read = 1;
                data.timestamp = new Date().valueOf();
                data.receipentList =res.reciepent
                
                this.dataStudent.push(data)
                dataNew.data = this.dataStudent;
                  
                this.firestore.collection("chat_conversation/").doc(data.user_friend_id)
                .set(dataNew)
                .then(
                  res => {

                    this.getDocumentsChat()
                    this.model.comment = '';


                  },
                  err => reject(err)
                )
                
              }
              
            });
            
          
          
        })
        
       
       
  
      })
    }else{
      if (this.model.comment)
      this.model.comment = this.model.comment.trim()
      if (!this.model.comment && !document) {
        return;
      }
      if(this.blockRecipant1){
        this.alert.error("Please Unblock this receipant","Error");
        return false;
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
        data.is_read = 1;
        data.timestamp = new Date().valueOf();
        this.dataStudent.push(data)
        dataNew.data = this.dataStudent;
        // console.log(dataNew.data);
        this.firestore.collection("chat_conversation/").doc(data.user_friend_id)
          .set(dataNew)
          .then(
            res => {
  
             
              this.model.comment = '';
              this.getDocumentsChat()
  
            },
            err => reject(err)
          )
  
      })
    }

   
  }
  getDocumentsChat() {
    this.conversation = [];
    this.dataStudent = [];
    let chatData:any=[]
    if(this.params.chat){
      var uuid = localStorage.getItem("guuid");
      var that =this;
      var dataSet = this.firestore.collection('chat_conversation').doc(uuid).valueChanges();
      dataSet.subscribe((res: any) => {
        if (res) {
          
          res.data.forEach(element1 => {
            element1.is_read=0
            element1.receipentList.forEach(element => {
             // console.log(element);
              if(element[localStorage.getItem('fbtoken')]){
                if(element[localStorage.getItem('fbtoken')].is_remove==0 && element[localStorage.getItem('fbtoken')].is_exit==0){
                  
                  var obj=chatData.find(el=>{return el.timestamp==element1.timestamp})
                  if(!obj)
                  chatData.push(element1)
                }
              }
              
            });
          });
          
          
          //
          this.conversation = chatData;
          if(localStorage.getItem('isread')){
            localStorage.removeItem('isread')
            this.firestore.collection('chat_conversation').doc(uuid).set({"data":this.conversation})
          }
          
          this.dataStudent = chatData;
        } else {
          this.conversation = [];
          this.dataStudent = [];
        }
  
      })
    }else{
      var uuid = localStorage.getItem("friendlidt_id");
      var dataSet = this.firestore.collection('chat_conversation').doc(uuid).valueChanges();
      dataSet.subscribe((res: any) => {
        if (res) {
          if(res.data){
              res.data.forEach(element => {
            element.is_read=0
          });
          }
        
          
          this.conversation = res.data;
          this.dataStudent = res.data;
          if(localStorage.getItem('isread')){
            localStorage.removeItem('isread')
            this.firestore.collection('chat_conversation').doc(uuid).set({"data":this.conversation})
          }
        } else {
          this.conversation = [];
          this.dataStudent = [];
        }
  
      })
     
    }

    
   
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
  getFileExtention(url) {
    var exArr = url.split("/");
    // console.log(exArr[(exArr.length-1)].split(".")[1]);

    return exArr[(exArr.length - 1)].split(".")[1];
  }
  goBack(): void{
    this.location.back();
  }
}
