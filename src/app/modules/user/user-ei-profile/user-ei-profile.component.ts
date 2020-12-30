import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { BaseService } from '../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-user-ei-profile',
  templateUrl: './user-ei-profile.component.html',
  styleUrls: ['./user-ei-profile.component.css']
})
export class UserEiProfileComponent implements OnInit {

  model: any = {};
  errorDisplay: any = {};
  imageUrl: any;
  courseList: any;
  standardList: any;
  classList: any;
  schoolId: any;
  course_id: any = '';
  standard: any = '';
  imagePath: any = "";
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
    this.model.class_id = '';
    this.route.queryParams.subscribe(params => {
      this.schoolId = params['school_id'];
      this.model.school_id = this.schoolId;
      this.getCourseBySchoolId(this.schoolId)

    });
    if (this.schoolId) {
      this.getSchollConfirmationData();
    }
    this.imagePath = this.baseService.serverImagePath;
  }

  /**
   * get school data after student confirmation
   * 
   */

  getSchollConfirmationData() {
    try {
      delete this.model.class_id;
      this.loader.show();
      this.baseService.action('user/confirm-school-by-students/', this.model).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.loader.hide();
          this.model = response.data;
          this.course_id = response.data.course_id;
          this.displayStandardList(this.course_id)
          this.standard = response.data.standard_id;
          this.displayClassList(response.data.standard_id);
          this.model.class_id = response.data.class_id
          this.model.school_id = this.schoolId;
        } else {
          this.loader.hide();

        }

      }, (error) => {
        this.loader.hide();
        console.log(error);
        return '';

      });
    } catch (err) {
      this.loader.hide();
    }

  }
  

  getCourseBySchoolId(id) {
    try {
      this.loader.show();
      this.baseService.getData('user/course-list-by-schoolid/', { 'school_id': id }).subscribe(
        (res: any) => {
          if (res.status == true)
            this.courseList = res.results;
          else
            this.alert.error(res.error.message[0], "Error")
            this.loader.hide();
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, "Error")
        });
    } catch (err) {
      this.loader.hide();

    }
  }
  displayStandardList(courseId) {
    try {
      this.loader.show();
      this.standardList = []
      //this.model.course_id='';

      this.model.class_id = '';
      let data: any = {};
      data.course_id = courseId;
      this.baseService.getData('user/standard-list-by-courseid/', data).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.standardList = response.results;

      }, (error) => {
        this.loader.hide();
        //console.log(error);

      });
    } catch (err) {
      this.loader.hide();
      //console.log(err);
    }
  }
  displayClassList(stId) {
    try {
      this.loader.show();
      this.classList = [];
      let data: any = {};
      data.standard_id = stId;
      this.baseService.getData('user/class-list-by-standardid/', data).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.loader.hide();
        this.classList = response.results;

      }, (error) => {
        this.loader.hide();
        //console.log(error);

      });
    } catch (err) {
      this.loader.hide();
      //console.log(err);
    }
  }
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
      this.model.is_current_course = 1
      this.model.date_joining = this.baseService.getDateFormat(this.model.date_joining);
      this.model.course_start_year = this.baseService.getDateFormat(this.model.course_start_year);
      this.model.course_end_year = this.baseService.getDateFormat(this.model.course_end_year);
      this.model.standard_start_year = this.baseService.getDateFormat(this.model.standard_start_year);
      this.model.standard_end_year = this.baseService.getDateFormat(this.model.standard_end_year);
      this.baseService.action('user/add-registered-ei-course/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.router.navigate(['user/ei-confirmation'], { queryParams: { school_id: this.schoolId } });
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
