import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment'
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunicationService } from 'src/app/services/communication/communication.service';
@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.css']
})
export class CreateGroupChatComponent implements OnInit {
  groupUserLists: any = [];
  model: any = {};
  noOfUsers: any = 0;
  serverImageUrl: any;
  params: any;
  uploadInfo: any = {
    "image_type": "profile_pic",
    "url": "ei/cover-profile-update/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }
  dataStudent: any=[];
   
  constructor(private router: Router,
    private location: Location,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,

    private firestore: AngularFirestore,
    private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params;
    })
    this.serverImageUrl = environment.serverImagePath
    if (this.params.editgroup) {
      this.firestore.collection("group").doc(this.params.groupId).valueChanges().subscribe((res:any)=>{
       res.reciepent.forEach(element => {
          console.log(element);
          
        })
      })
    } else {
      //localStorage.setItem("groupUsers",JSON.stringify(groupReceipentUser));
      if (localStorage.getItem("groupUsers")) {
        this.groupUserLists = JSON.parse(localStorage.getItem("groupUsers"));
        this.noOfUsers = this.groupUserLists.length;
        var recepient = [];
        var date = new Date();
        var fbtoken = localStorage.getItem("fbtoken");
        if (fbtoken) {
          let user_recepient: any = {};
          let objGroupData: any = {};
          objGroupData.is_read = 0;
          objGroupData.is_admin = 1;
          objGroupData.is_remove = 0;
          objGroupData.is_remove_date = "";
          objGroupData.is_exit = 0;
          objGroupData.is_exit_date = "";
          objGroupData.is_student = 1;
          user_recepient[fbtoken] = objGroupData;
          recepient.push(user_recepient)
        }
        if(localStorage.getItem("userprofile")){
          var userprofile = JSON.parse(localStorage.getItem("userprofile"));
          if (userprofile.ei_Details) {

            let user_recepient: any = {};
            let objGroupData: any = {};
            objGroupData.is_read = 0;
            objGroupData.is_admin = 1;
            objGroupData.is_remove = 0;
            objGroupData.is_remove_date = "";
            objGroupData.is_exit = 0;
            objGroupData.is_exit_date = "";
            objGroupData.is_student = 1;
            user_recepient[userprofile.ei_Details.firebase_id] = objGroupData;
            recepient.push(user_recepient)
          }
        }
        

        this.groupUserLists.forEach(element => {
          let user_recepient: any = {};
          let objGroupData: any = {};
          element.profile_pic= element.profile_pic?element.profile_pic: "assets/images/userWebsite/share-my-profile-icon.png";
          objGroupData.is_read = 0;
          objGroupData.is_admin = 0;
          objGroupData.is_remove = 0;
          objGroupData.is_remove_date = "";
          objGroupData.is_exit = 0;
          objGroupData.is_exit_date = "";
          objGroupData.is_student = element.student_id ? 0 : 1;
          if (element.firebase_id) {
            user_recepient[element.firebase_id] = objGroupData;
            recepient.push(user_recepient)
          }

        });
        this.model.reciepent = recepient
      }
    }

  }
  addMoreRecepient() {
    this.router.navigate(["ei/students-list"]);
  }
  /** 
  * Function Name : fileUploadDocument
 */
  fileUploadDocument(files) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png' && fileData.type !== 'application/pdf') {
      this.loader.hide();
      this.alert.error("File format not supported", 'Error');

      return
    }
    const formData = new FormData();
    formData.append('file_name', fileData);
    try {
      this.loader.show();
      this.eiService.uploadFile(formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.model.group_icon = this.serverImageUrl + res.filename
            return res.filename;
          } else {
            this.loader.hide();
            var collection = this.eiService.getErrorResponse(this.loader, res.error);
            this.alert.error(collection, 'Error')
            return '';
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')
          return '';
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  getProfilePicUrl(file: any) {
    this.model.group_icon = file.data[0].profile_pic_url;
    this.communicationService.setImageUrl(this.model.group_icon)
  }
  createGroup() {
    // console.log(this.model);
    if (!this.model.group_title) {
      this.alert.error("Please enter group title", "Error")
      return false
    }
    if (this.params.editgroup) {
      this.firestore.collection("group").doc(this.params.groupId).set(this.model).then((responce: any) => {
        //console.log(responce);
        this.sendChat(this.model.reciepent,this.params.groupId)
        this.router.navigate(['ei/messages-details'], { queryParams: { "chat": "group" } });

      }, (error) => {

      })
    } else {
      this.firestore.collection("group").add(this.model).then(res => {
        localStorage.setItem("group_id", res.id);
        this.sendChat(this.model.reciepent,res.id)
        this.router.navigate(["ei/personal-messages"])
      })
    }


  }
  sendChat(particepant:any,friendlidt_id:any,document?: any) {
    
       
      return new Promise<any>((resolve, reject) => {
        let data: any = {};
        let dataNew: any = {};
        let userData = JSON.parse(localStorage.getItem('userprofile'))
        data.user_friend_id = friendlidt_id;
        data.user_send_by = localStorage.getItem('fbtoken');
        data.user_name = userData.user_first_name + ' ' + userData.user_last_name;
        data.profile_pic = userData.profile_pic
        data.document = document ? true : false;
        data.msg ='You have add particepant in this group';
        data.is_read = 1;
        data.timestamp = new Date().valueOf();
        data.receipentList = particepant
        this.dataStudent.push(data)
        dataNew.data = this.dataStudent;
        // console.log(dataNew.data);
        this.firestore.collection("chat_conversation/").doc(data.user_friend_id)
          .set(dataNew)
          .then(
            res => {


              this.model.comment = '';
               

            },
            err => reject(err)
          )

      })
    


  }
}
