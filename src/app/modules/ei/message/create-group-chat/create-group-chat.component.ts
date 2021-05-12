import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment'

import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.css']
})
export class CreateGroupChatComponent implements OnInit {
  groupUserLists:any=[];
  model:any={};
  noOfUsers:any=0;
  serverImageUrl: any;
  
  constructor(private router:Router,private baseService :BaseService,private loader:NgxSpinnerService
    ,private alert : NotificationService,private eiService : EiServiceService) { }

  ngOnInit(): void {
    this.serverImageUrl = environment.serverImagePath
    //localStorage.setItem("groupUsers",JSON.stringify(groupReceipentUser));
    if(localStorage.getItem("groupUsers")){
      this.groupUserLists=JSON.parse(localStorage.getItem("groupUsers"));
      this.noOfUsers=this.groupUserLists.length;
      this.model.reciepent=this.groupUserLists
    }
  }
  addMoreRecepient(){
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
              this.model.group_icon = this.serverImageUrl+res.filename
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
    createGroup(){
      console.log(this.model);
      
    }
}
