import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../services/notification/notification.service';

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
  
  constructor(
    public baseService: BaseService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
     
      this.route.queryParams.subscribe(params => {
        this.schoolId = params['school_id'];
        this.title=params['title'];
        this.model.school_id=this.schoolId;
        this.onboarded = params['check_school_info_on_zatchup']
        this.getCourseDetails();
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
        this.router.navigate(['user/ei-confirmation'], {queryParams: {'school_id':this.schoolId,'title':this.title }});
      }else{
        this.router.navigate(['user/add-new-course'], {queryParams: {'school_id':this.schoolId,'title':this.title }});
      }

      
    }
    goToUserAddMoreEiPage(){
      if(this.title=='past'){
        this.router.navigate(['user/ei-confirmation'], {queryParams: {'school_id':this.schoolId }});
      }
      else if(this.onboarded == '2'){
        this.router.navigate(['user/profile-created'])
      }
      else{
        if( localStorage.getItem("res.reg_step")=='7'){
          this.router.navigate(['user/my-school']);
        }else
        this.router.navigate(['user/profile-created'], {queryParams: {'school_id':this.schoolId }});
      }
      
    }
}

