import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  model: any = {};
  errorDisplay: any = {};
  classList: any;
  standardList: any;
  leftStandardList: any;
  courseList: any;
  schoolId: any;
  isalumini: any;
  startYearMaxDate: any
  startYearMinDate: any
  params: any;
  // endYearMaxDate: any = new Date();
  // endYearMinDate: any = new Date();
  uploadInfo: any = {
    "image_type": "file_name",
    "url": "ei/uploaddocsfile/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }
  imageUrl: any;
  imagePath: any;
  courseId: any;
  constructor(
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private genericFormValidationService: GenericFormValidationService,
    private alert: NotificationService
  ) {
    // this.startYearMaxDate = new Date();
    // this.startYearMinDate = new Date();
  }

  ngOnInit(): void {
    this.model.course_id = '';
    this.model.join_standard_id = '';
    this.model.left_standard_id = '';

    this.route.queryParams.subscribe(params => {
      this.params = params
      var schoolId = params['school_id'];
      this.schoolId = params['school_id'];
      this.getCourseBySchoolId(schoolId)
      this.model.school_id = this.schoolId;
      this.isalumini = params['isalumini'];

      this.model.course_id = params['course_id'];
      this.courseId = params['course_id'];
      this.model.existing_course_id = params['course_id'];
      if (params['course_id']) {
        this.displayStandardList(this.model.course_id)
      }


    });

    this.model.school_id = this.schoolId;


    this.getEiInfo(this.model)
    this.imagePath = this.baseService.serverImagePath;
  }
  editEi(schoolId){
    this.router.navigate(["user/add-ei"],{queryParams:{
      school_id:schoolId
    }});
  }
  addAnotherCourse(schoolId){
    this.router.navigate(["user/ei-profile"],{queryParams:{
      school_id:schoolId
      
    }});
  }
  getEiInfo(model) {
    try {
      var that = this;
      this.SpinnerService.show();
      this.baseService.action("user/get-admission-number-detail-by-school/", model).subscribe((res: any) => {
        if (res.status == true) {
          this.SpinnerService.hide();
          //this.model = res.data;
          this.model.name_of_school = res.data.name_of_school;
          this.model.school_code = res.data.school_code;
           
          this.model.left_standard_id = res.data.left_standard_id;
          this.model.join_standard_id = res.data.join_standard_id;
          this.model.current_standard_id = res.data.current_standard_id;
          this.model.course_start_year = res.data.course_start_year;
          this.model.course_end_year = res.data.course_end_year;
          this.model.admission_no = res.data.admission_no;
          if (this.model.course_id) {
            this.model.existing_course_id = this.courseId;
            this.model.comment = res.data.description;
          }
          this.model.school_id = this.schoolId;
          // this.displayClassList(res.data.join_standard_id);
          
          this.displayClassList(res.data.current_standard_id);
        } else {
          this.SpinnerService.hide();
        }

      }, (error) => {
        this.SpinnerService.hide();
      })
    } catch (e) {
      this.SpinnerService.hide();
    }
  }


  getCourseBySchoolId(id) {
    try {
      this.SpinnerService.show();
      let data = {
        "school_id": id,
        "edit_course_id": this.params.edit_course ? this.params.course_id : undefined
      }
      this.baseService.getData('user/get-course-list-for-userpanel/', data).subscribe(
        (res: any) => {
          this.SpinnerService.hide();
          this.courseList = res.results;
          if (this.courseList)
            this.setCalDates(this.model.course_id)
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
      if (courseId != 'others' && courseId != '') {
        if (this.courseList)
        if (this.courseList.length > 0) {
          this.model.comment = this.courseList.find(element => element.id == courseId).description;
        }
        this.setCalDates(courseId)
        this.SpinnerService.show();
        this.standardList = []
        this.model.class_id = '';
        let data: any = {};
        data.course_id = courseId;
        this.baseService.getData('user/standard-list-by-courseid/', data).subscribe(res => {
          let response: any = {};
          response = res;
          this.standardList = response.results;
          this.leftStandardList = response.results;
          this.SpinnerService.hide();
        }, (error) => {
          this.SpinnerService.hide();
        });
      }else{
        this.model.course_id = 'others';
      }

    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  displayClassList(stId) {
    try {
      if (stId) {
        this.leftStandardList = [];
        var i = 0;
        this.standardList.forEach(element => {
          if (element.id >= stId) {
            this.leftStandardList.push(element)
          }
          i = i + 1;
        });
        this.SpinnerService.show();
        this.classList = [];
        let data: any = {};
        data.standard_id = stId;
        this.baseService.getData('user/class-list-by-standardid/', data).subscribe(res => {
          let response: any = {};
          response = res;
          this.classList = response.results;
          this.SpinnerService.hide();
        }, (error) => {
          this.SpinnerService.hide();
        });
      }

    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }

  addCourseData() {
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
      this.baseService.action('user/add-past-registered-ei-course/', this.model).subscribe(
        (res: any) => {
          this.SpinnerService.hide();
          if (res.status == true) {
            if (this.params.returnUrl)
              this.router.navigate([this.params.returnUrl],{ queryParams: {  "returnUrl": "user/my-educational-profile" } })
            else {
              if (this.isalumini) {
                this.router.navigate(['user/ei-confirmation'], { queryParams: { school_id: this.schoolId, 'isalumini': 1 } });
              } else {
                this.router.navigate(['user/ei-confirmation'], { queryParams: { school_id: this.schoolId } });
              }
            }
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
  addCourseNewData() {
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      //
      this.model.school_id = this.schoolId;
      this.model.start_date = this.baseService.getDateFormat(this.model.start_date);
      this.model.end_date = this.baseService.getDateFormat(this.model.end_date);
      this.baseService.action('user/add-course-by-user/', this.model).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.alert.success(response.message, 'Success')
          this.router.navigate(['user/ei-confirmation'], { queryParams: { 'school_id': this.schoolId } });

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
  getProfilePicUrl(data: any) {
    this.model.profile_pic = data.filename;
    this.imageUrl = this.imagePath + data.filename
  }

  setCalDates(courseId) {
    // this.model.course_id
    if (this.courseList) {
      // debugger
      let course = this.courseList.find(val => {
        return val.id == courseId
      })
      if (course) {
        this.startYearMaxDate = new Date(course.start_date)
        this.startYearMinDate = new Date(course.end_date)
      }

    }
  }

}
