import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { BaseService } from '../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
declare var $: any;
@Component({
  selector: 'app-user-personal-information',
  templateUrl: './user-personal-information.component.html',
  styleUrls: ['./user-personal-information.component.css']
})
export class UserPersonalInformationComponent implements OnInit {

  model: any = {};
  errorDisplay: any = {};
  imageUrl: any;
  schoolId: any;
  course_id: any = '';
  imagePath: any = "";
  role:any;
  uploadInfo: any = {
    "image_type": "file_name",
    "url": "ei/uploaddocsfile/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }

  constructor(private router: Router,
    private loader: NgxSpinnerService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private genericFormValidationService: GenericFormValidationService) { }


  ngOnInit(): void {
    if(localStorage.getItem("role")){
      this.role=localStorage.getItem("role");
    }
     
    this.route.queryParams.subscribe(params => {
      this.schoolId = params['school_id'];
      this.model.school_id = this.schoolId;
      

    });
    
    this.imagePath = this.baseService.serverImagePath;
  }

  /**
   * get school data after student confirmation
   * 
   */

 
  uploadProfilePic(files) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    this.imageUrl = '';
  }

  addCourseData() {
    //this.router.navigate(['user/ei-confirmation'], { queryParams: { school_id: this.schoolId } });
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {

      this.loader.show();

      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      
      this.baseService.action('user/add-profile-pic-info/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.router.navigate(['user/profile-created'], { queryParams: { school_id: this.schoolId } });
            //this.router.navigate(['user/ei-confirmation'], { queryParams: { school_id: this.schoolId } });
          } else {
            this.loader.hide();
            var errorCollection = '';
            for (var key in res.error) {
              if (res.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + res.error[key][0] + '\n'
              }
            }
            this.alert.error(errorCollection, "Error")
          }
        }, (error) => {
          this.loader.hide();
          console.log(error);

        });
    } catch (err) {
      this.loader.hide();

    }

  }
  goToUserAddCoursePage() {
    this.router.navigate(['user/add-course']);
  }

  getProfilePicUrl(data: any) {
    this.model.profile_pic=data.filename;
    this.imageUrl = this.imagePath + data.filename
  }


}
