import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-subadminprofile',
  templateUrl: './subadminprofile.component.html',
  styleUrls: ['./subadminprofile.component.css']
})
export class SubadminprofileComponent implements OnInit {

  model: any = {};
  errorDisplay: any = {};
  imageUrl: any;
  courseList: any;
  standardList: any;
  classList: any;
  schoolId: any;
  course_id: any = '';
  standard: any = '';
  imagePath:any="";
  subadminProfile: any ={};
  uploadInfo: any = {
    "image_type": "file_name",
    "url": "ei/uploaddocsfile/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }

  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService
    , private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private genericFormValidationService: GenericFormValidationService,
    private alert:NotificationService) { }


  ngOnInit(): void {
    this.model.class_id = '';
    this.route.queryParams.subscribe(params => {
      this.schoolId = params['school_id'];
      this.model.school_id=this.schoolId;
     

    });
    this.getEiNumber();
    this.imagePath=this.baseService.serverImagePath;
  }
 
  /** 
* Function Name : fileUploadDocument
*/
  fileUploadDocument(files) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    const formData = new FormData();
    formData.append('file_name', fileData);
    try {
      this.SpinnerService.show();

   

      this.eiService.uploadFile(formData).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.imageUrl=this.imagePath+response.filename
          this.model.profile_pic=response.filename;
          return
        } else {
          this.SpinnerService.hide();
          this.imageUrl='';
          console.log("Error:Data not update");
          return '';
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        return '';

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
    }


  }
getEiNumber(){
  try {
   this.baseService.getData("subadmin/get-employe-num-of-subadmin/").subscribe(res=>{
    let response:any=res;
    if(response.status==true){
      this.model.employee_num=response.employee_num;
    }else{
      this.alert.error("Id Number Not Fetched","Error")
    }
   },(error=>{
     console.log("Error",error);
     
   }))
  } catch (e) {
  
  }
}
 
  uploadProfilePic(files) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    
    this.imageUrl = '';
  }

  subAdminProfile(){
    this.errorDisplay = {};
    if(!this.model.profile_pic)
    {
      this.alert.warning("Please upload image","Warning");
     return false; 
    }
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      
      this.SpinnerService.show();
      this.baseService.action('subadmin/additional-info/',this.model).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.router.navigate(['ei/thankyou'], { queryParams: { school_id: this.schoolId } });
        } else {
          this.SpinnerService.hide();
          
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        return '';

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
    }
  }

  getProfilePicUrl(data: any) {
    this.model.profile_pic=data.filename;
    this.imageUrl = this.imagePath + data.filename
  }

}
