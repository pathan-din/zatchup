import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { BaseService } from '../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from 'src/app/services/notification/notification.service';
declare var $: any;
@Component({
  selector: 'app-user-add-more-standard',
  templateUrl: './user-add-more-standard.component.html',
  styleUrls: ['./user-add-more-standard.component.css']
})
export class UserAddMoreStandardComponent implements OnInit {
  model:any={};
  errorDisplay:any={};
  classList: any;
  standardList: any;
  courseList: any;
  schoolId: any;
   
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public baseService:BaseService
    , private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService,
    private alert:NotificationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var schoolId = params['school_id'];
      this.schoolId = params['school_id'];
      this.getCourseBySchoolId(schoolId)
      this.model.school_id = this.schoolId;
    });
  }
  getCourseBySchoolId(id) {
    try {
      this.SpinnerService.show();
      this.baseService.getData('user/course-list-by-schoolid/', { 'school_id': id }).subscribe(
        (res: any) => {
          if (res.status == true)
            this.courseList = res.results;
          else
            this.alert.error(res.error.message[0], "Error")
            this.SpinnerService.hide();
        }, (error) => {
          this.SpinnerService.hide();
          this.alert.error(error.message, "Error")
        });
    } catch (err) {
      this.SpinnerService.hide();

    }
  }
  displayStandardList(courseId) {
    try {
      if(courseId!='others'){
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
      }
      
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
  
addCourseData(){

  this.errorDisplay = {};
  this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
  if (this.errorDisplay.valid) {
    return false;
  }
  try {

    this.SpinnerService.show();

    /***********************Mobile Number OR Email Verification Via OTP**********************************/
    this.model.is_current_course = "0"
    this.model.date_joining = this.baseService.getDateFormat(this.model.date_joining);
    this.model.course_start_year = this.baseService.getDateFormat(this.model.course_start_year);
    this.model.course_end_year = this.baseService.getDateFormat(this.model.course_end_year);
    this.model.standard_start_year = this.baseService.getDateFormat(this.model.standard_start_year);
    this.model.standard_end_year = this.baseService.getDateFormat(this.model.standard_end_year);
    this.baseService.actionForFormData('user/add-registered-ei-course/', this.model).subscribe(
      (res: any) => {
        this.SpinnerService.hide();
        if (res.status == true) {
          this.router.navigate(['user/ei-confirmation'], { queryParams: { school_id: this.schoolId } });
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in res.error) {
            if (res.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + res.error[key][0] + '\n'
            }
          }
          this.alert.error(errorCollection, "Error")
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
  } catch (err) {
    this.SpinnerService.hide();

  }
}
addCourseNewData(){
  this.errorDisplay = {};
  this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
  console.log(this.errorDisplay)
  if (this.errorDisplay.valid) {
    return false;
  }
  try {
    //
   this.model.school_id = this.schoolId;
    this.model.start_date=this.baseService.getDateFormat(this.model.start_date);
    this.model.end_date=this.baseService.getDateFormat(this.model.end_date);
    this.baseService.action('user/add-course-by-user/',this.model).subscribe(res => {
      let response: any = {}
      response = res;
      this.SpinnerService.hide();
      if (response.status == true) {
        this.alert.success(response.message, 'Success')
        this.router.navigate(['user/ei-confirmation'], {queryParams: {'school_id':this.schoolId }});
        
      } else {
        this.SpinnerService.hide();
        var errorCollection = '';
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)) {
            errorCollection = errorCollection + response.error[key][0] + '\n'

          }
        }
       this.alert.error(errorCollection, 'Error')
      }
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);

    });
  } catch (e) {
  
  }
}
}
