import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';

@Component({
  selector: 'app-add-more-course-manually',
  templateUrl: './add-more-course-manually.component.html',
  styleUrls: ['./add-more-course-manually.component.css']
})
export class AddMoreCourseManuallyComponent implements OnInit {
  model: any = {}
  courseList:any;
  schoolId:any;
  title:any;
  onboarded: any
 params:any={}
  constructor(
    public baseService: BaseService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    private route: ActivatedRoute,
    
     
     
     
    public eiService: EiServiceService,
    private genericFormValidationService: GenericFormValidationService,
    public formBuilder: FormBuilder,
    private confirmDialogService: ConfirmDialogService,
    public alert: NotificationService) { }

    ngOnInit(): void {
     
      this.route.queryParams.subscribe(params => {
        this.schoolId = params['school_id'];
        this.title=params['title'];
        this.model.school_id=this.schoolId;
        this.params=params
        this.onboarded = params['check_school_info_on_zatchup']
        this.getCourseDetails();
      });
     
    }
    deleteCourse(id: any): any {
      this.confirmDialogService.confirmThis('Are you sure you want delete this course.', () => {
        this.SpinnerService.show()
        let model: any = {};
        model.course_id = id;
        this.baseService.action('user/delete-course-standard-detail-by-student/', model).subscribe(
          (res: any) => {
            if (res.status == true) {
              this.alert.success(res.message, "Success")
              this.getCourseDetails();
            } else {
              this.alert.error(res.error.message[0], 'Error')
            }
            this.SpinnerService.hide();
          }
        ), err => {
          this.alert.error(err.error, 'Error')
          this.SpinnerService.hide();
        }
      }, () => {
      });
    }
  
    deleteEi(id: any): any {
      this.confirmDialogService.confirmThis('Are you sure you want delete this School.', () => {
        this.SpinnerService.show()
        let model: any = {};
        model.school_id = id;
        this.baseService.action('user/delete-school-course-detail-by-student/', model).subscribe(
          (res: any) => {
            if (res.status == true) {
              this.alert.success(res.message, "Success")
              this.getCourseDetails();
            } else {
              this.alert.error(res.error.message[0], 'Error')
            }
            this.SpinnerService.hide();
          }
        ), err => {
          this.alert.error(err.error, 'Error')
          this.SpinnerService.hide();
        }
      }, () => {
      });
    }
    /**
     * Get Course Details according to added student 
     */
    getCourseDetails(){
      try {
        this.baseService.getData('user/get-usercourse-list/',this.model).subscribe(res => {
          let response: any = {}
          response = res;
          this.SpinnerService.hide();
            this.courseList = response.results;
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
  
        });
      } catch (e) {
        this.SpinnerService.hide();
      }
    }
    addMoreCourse(){
      if(this.title=='past'){
        this.router.navigate(['user/ei-confirmation'], {queryParams: {'school_id':this.schoolId,'title':this.title, 'check_school_info_on_zatchup':this.params.check_school_info_on_zatchup }});
      }else{
        this.router.navigate(['user/add-new-course'], {queryParams: {'school_id':this.schoolId,'title':this.title, 'check_school_info_on_zatchup':this.params.check_school_info_on_zatchup }});
      }

      
    }
    goToUserAddMoreEiPage(){
      this.router.navigate(['user/ei-confirmation'], {queryParams: {'school_id':this.schoolId, 'check_school_info_on_zatchup':this.params.check_school_info_on_zatchup }});
      // if(this.title=='past'){
      //   this.router.navigate(['user/ei-confirmation'], {queryParams: {'school_id':this.schoolId }});
      // }
      // else if(this.onboarded == '2'){
      //   this.router.navigate(['user/profile-created'])
      // }
      // else{
      //   if( localStorage.getItem("res.reg_step")=='7'){
      //     this.router.navigate(['user/my-school']);
      //   }else
      //   this.router.navigate(['user/profile-created'], {queryParams: {'school_id':this.schoolId }});
      // }
      
    }

    editCourse(school_id,courseid){

      this.router.navigate(['user/add-new-course'], { queryParams: { "school_id": school_id, "course_id": courseid, "edit_course": true, 'check_school_info_on_zatchup':this.params.check_school_info_on_zatchup } });

    }
}

