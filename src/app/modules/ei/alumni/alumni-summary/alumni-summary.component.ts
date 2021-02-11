import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common'
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
declare var $ : any;
@Component({
  selector: 'app-alumni-summary',
  templateUrl: './alumni-summary.component.html',
  styleUrls: ['./alumni-summary.component.css']
})
export class AlumniSummaryComponent implements OnInit {
  courseWiseAlumniCount: any = {};
  courseWiseAlumniCountCourse: any = [];
  classWiseAlumniCountCourse: any = [];
  standardWiseAlumniCountCourse: any = [];
  isShowStandardIf: boolean;
  isShowClassIf: boolean;

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    public baseService: BaseService,
    public formBuilder: FormBuilder,
    private location: Location,
    private alert : NotificationService
  ) { }

  ngOnInit(): void {
    this.getCourseWiseAlumniCount();
  }

  getCourseWiseAlumniCount(){
    this.loader.show();
    let data = {}

    this.baseService.action('ei/coursewisestudentcount/', data).subscribe(
      (res:any) => {
        if (res.status == true) {
        this.courseWiseAlumniCount = res.countdata;
        this.courseWiseAlumniCountCourse = res.coursedata;
      }
    else{
      this.loader.hide();
      this.alert.error(res.error.message, 'Error')
    }}
    ), 
    err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  getStandardCourseWiseAlumniCount(courseId){
    this.loader.show();
     let data = {
      'course_id': courseId
     }
    this.baseService.action('ei/standardwisestudentcount/', data).subscribe(
      (res: any) => {
        if(res.status == true){
          this.standardWiseAlumniCountCourse['st'+courseId] = res.standarddata;
        }
        else{
          this.loader.hide();
          this.alert.error(res.error.message, 'Error')
        }}
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  getClassStandardWiseAlumniCount(standardId){
    this.loader.show();
    let data = {
      'standard_id': standardId
     }
     this.baseService.action('ei/classwisestudentcount/', data).subscribe(
       (res: any) =>{
         if(res.status == true){
          this.classWiseAlumniCountCourse['cs'+standardId] = res.standarddata;
         }
         else{
           this.loader.hide();
           this.alert.error(res.error.message, 'Error')
         } }
     ),
     err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
     }
  }

  toOpenStandard(courseId) {
    this.isShowStandardIf = true;
	$("#standard_"+courseId).toggle();
	this.getStandardCourseWiseAlumniCount(courseId)
  }
  toOpenClass(standardId) {
    this.isShowClassIf = true;
	$("#class_"+standardId).toggle();
	this.getClassStandardWiseAlumniCount(standardId)
  }

  goBack(){
    this.location.back()
  }
}
