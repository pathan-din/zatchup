import { Component, OnInit } from '@angular/core';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-ei-student-summary',
  templateUrl: './ei-student-summary.component.html',
  styleUrls: ['./ei-student-summary.component.css']
})
export class EiStudentSummaryComponent implements OnInit {

  courseWiseStudentCount: any = {};
  courseWiseStudentCountCourse: any = [];
  standardWiseStudentCountCourse: any = [];
  classWiseStudentCountCourse: any = [];
  isShowStandardIf = false;
  isShowClassIf = false;

  constructor(private router: Router, private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getCourseWiseStudentCount();
  }
//
// 

  getCourseWiseStudentCount() {
    try {
      this.SpinnerService.show();

      this.eiService.getCourseWiseStudentCount().subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        this.courseWiseStudentCount = response.countdata;
        this.courseWiseStudentCountCourse = response.coursedata;


      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  
  getClassStandardWiseStudentCount(standardId) {
    try {
      this.SpinnerService.show();

      this.eiService.getClassStandardWiseStudentCount(standardId).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        //this.courseWiseStudentCount = response.countdata;
        this.classWiseStudentCountCourse['cs'+standardId] = response.standarddata;
		console.log(this.classWiseStudentCountCourse);

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  
  getStandardCourseWiseStudentCount(courseId) {
    try {
      this.SpinnerService.show();

      this.eiService.getStandardCourseWiseStudentCount(courseId).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        //this.courseWiseStudentCount = response.countdata;
        this.standardWiseStudentCountCourse['st'+courseId] = response.standarddata;
console.log(this.standardWiseStudentCountCourse);

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }


  toOpenStandard(courseId) {
    this.isShowStandardIf = true;
	$("#standard_"+courseId).toggle();
	this.getStandardCourseWiseStudentCount(courseId)
  }
  toOpenClass(standardId) {
    this.isShowClassIf = true;
	$("#class_"+standardId).toggle();
	this.getClassStandardWiseStudentCount(standardId)
	
  }

  goBack(): void{
    this.location.back()
  }

}
