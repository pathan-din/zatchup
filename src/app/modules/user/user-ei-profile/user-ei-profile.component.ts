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
  leftStandardList : any;
  objCourse:any={};
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
   
    
    
    
    this.route.queryParams.subscribe(params => {
     
      
      if(params['school_id']){
        this.schoolId = params['school_id'];
        
        this.getCourseBySchoolId(this.schoolId)
       // this.getSchollConfirmationData();
        
      }
      if(params['course_id']){
        this.model.course_id = params['course_id'];
       
      }else{
        this.model.course_id= '';
        this.model.class_id = '';
        this.model.join_standard_id="";
        this.model.current_standard_id="";
      }
      

    });
   
    this.model.school_id =this.schoolId;
    
    this.displayStandardList( this.model.course_id)
    this.getEiInfo(this.model)
    this.imagePath = this.baseService.serverImagePath;
    
  }
getEiInfo(model){
  try {
    var that = this;
    this.loader.show();
    this.baseService.action("user/get-admission-number-detail-by-school/",model).subscribe((res:any)=>{
      if(res.status==true){
        this.loader.hide();
        this.model = res.data;
        this.model.join_standard_id=res.data.join_standard_id
        this.model.current_standard_id=res.data.current_standard_id
        
       // this.displayClassList(res.data.join_standard_id);
        this.displayClassList(res.data.current_standard_id);
      }else{
        this.loader.hide();
      }
      
    },(error)=>{
      this.loader.hide();   
    })
  } catch (e) {
    this.loader.hide();
  }
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
          this.loader.hide();
          this.courseList = res.results;
          // if (res.status == true)
          //   this.courseList = res.results;
          // else
          //   this.alert.error(res.error.message[0], "Error")
          //   this.loader.hide();
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, "Error")
        });
    } catch (err) {
      this.loader.hide();

    }
  }
  displayJoinStandardBseCurrentStandard(stId){
    this.leftStandardList=[];
    var i=0;
    //var pos = this.standardList.map(function(e) { return e.id; }).indexOf(stId);
   
 
    this.standardList.forEach(element => {
      if(element.id >= stId){
        this.leftStandardList.push(element)
      }
     
      i=i+1;
    });
  }
  displayStandardList(courseId) {
    try {
      console.log("hikjkj");
      
      this.loader.show();
      this.standardList = []
      //this.model.course_id='';

      this.model.class_id = '';
      let data: any = {};
      data.course_id = courseId;
      // this.objCourse = this.courseList.find(e =>
        
        
      //    e.id === parseInt(courseId)
      //  ) ;
      
      //console.log(this.courseList);
      
      this.baseService.getData('user/standard-list-by-courseid/', data).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.standardList = response.results;
        this.leftStandardList = response.results;
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
      if(stId){
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
    }
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
