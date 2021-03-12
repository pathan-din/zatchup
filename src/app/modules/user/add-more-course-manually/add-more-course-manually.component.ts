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
  constructor(
    private genericFormValidationService: GenericFormValidationService,
    public baseService: BaseService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
     
      this.route.queryParams.subscribe(params => {
        this.schoolId = params['school_id'];
        this.title=params['title'];
        this.model.school_id=this.schoolId;
        this.getCourseDetails();
      });
      this.model.school_id = this.schoolId;
    this.getEiInfo(this.model);
    }


  getEiInfo(model) {
    try {
       this.SpinnerService.show();
      this.baseService.action("user/get-admission-number-detail-by-school/", model).subscribe((res: any) => {
        if (res.status == true) {
          this.SpinnerService.hide();
          this.model = res.data;
          // this.model.join_standard_id = res.data.join_standard_id
          // this.model.current_standard_id = res.data.current_standard_id
          // if (this.model.course_id) {
          //   this.model.existing_course_id = this.model.course_id;

          // }
          // this.model.comment = res.data.description;
          // this.model.school_id = this.schoolId;
          // this.displayClassList(res.data.join_standard_id);
          //this.displayClassList(res.data.current_standard_id);
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
    /**
     * Get Course Details according to added student 
     */


    editEi(schoolId){
      this.router.navigate(["user/add-ei"],{queryParams:{
        school_id:schoolId
      }});
    }
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
      }else{
        
        this.router.navigate(['user/add-personal-info'], {queryParams: {'school_id':this.schoolId }});
      }
      
    }
}

