import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { BaseService } from '../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
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
  imagePath:any="";

  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService
    , private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private genericFormValidationService: GenericFormValidationService) { }


  ngOnInit(): void {
    this.model.class_id = '';
    this.route.queryParams.subscribe(params => {
      this.schoolId = params['school_id'];
      this.model.school_id=this.schoolId;
      this.getCourseBySchoolId(this.schoolId)

    });
    if(this.schoolId)
    {
      this.getSchollConfirmationData();
    }
    this.imagePath=this.baseService.serverImagePath;
  }

  /**
   * get school data after student confirmation
   * 
   */

   getSchollConfirmationData(){
    try {
      delete this.model.class_id;
      this.SpinnerService.show();
      this.baseService.action('user/confirm-school-by-students/',this.model).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.model = response.data;
          this.course_id = response.data.course_id;
          this.displayStandardList(this.course_id)
          this.standard = response.data.standard_id;
          this.displayClassList(response.data.standard_id);
          this.model.class_id  = response.data.class_id
          this.model.school_id=this.schoolId;
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

  getCourseBySchoolId(id) {
    try {


      this.SpinnerService.show();

      /***********************Mobile Number OR Email Verification Via OTP**********************************/

      this.baseService.getData('user/course-list-by-schoolid/', { 'school_id': id }).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        this.courseList = response.results;

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();

    }
  }
  displayStandardList(courseId) {
    try {
      this.SpinnerService.show();
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
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  displayClassList(stId) {
    try {
      this.SpinnerService.show();
      this.classList = [];
      let data: any = {};
      data.standard_id = stId;
      this.baseService.getData('user/class-list-by-standardid/', data).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.classList = response.results;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  uploadProfilePic(files) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    console.log(fileList);

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

      this.SpinnerService.show();

      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.model.is_current_course=1
      this.model.date_joining = this.baseService.getDateFormat(this.model.date_joining);
      this.baseService.actionForFormData('user/add-registered-ei-course/', this.model).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.router.navigate(['user/ei-confirmation'], { queryParams: { school_id: this.schoolId } });

        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          alert(errorCollection);
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();

    }

  }
  goToUserAddCoursePage() {
    this.router.navigate(['user/add-course']);
  }

}
