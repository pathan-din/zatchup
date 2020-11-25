import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
declare var $: any;

export interface PeriodicElement {
  position: number;
  zatchUpID: string;
  name: string;
  userID: string;
  class: string;
  Field_of_change: string;
  existing_data: string;
  new_data: string;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-ei-student-list',
  templateUrl: './ei-student-list.component.html',
  styleUrls: ['./ei-student-list.component.css']
})
export class EiStudentListComponent implements OnInit {
  model: any = {};
  arrAge: any = [];
  studentList: any = [];
  displayedColumns: string[] = ['position', 'zatchUpID', 'name', 'userID', 'class', 'Field_of_change',
    'existing_data', 'new_data', 'Action'];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };
  dataSource = ELEMENT_DATA;
  courseList: any = [];
  standardList: any = [];
  classList: any = [];
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router, 
    private SpinnerService: NgxSpinnerService, 
    public eiService: BaseService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService
    ) { }

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    for (var i = 5; i < 70; i++) {
      this.arrAge.push(i);
    }
    this.model.gender = '';
    this.model.age = '';
    this.getStudentList('', '')
    this.displayCourseList();
  }
  displayCourseList() {
    try {
      this.SpinnerService.show();
      this.model.course = '';
      this.model.standard = '';
      this.model.teaching_class = '';
      this.eiService.getData('ei/course-list/').subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.courseList = response.results;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  displayStandardList(courseId) {
    try {
      this.SpinnerService.show();
      this.standardList = []
      //this.model.course_id='';


      this.model.standard = '';
      this.model.teaching_class = '';
      this.eiService.getData('ei/standard-list/', { 'course_id': courseId }).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.standardList = response.standarddata;

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
      this.model.teaching_class = '';
      this.eiService.getData('ei/class-list/', { 'standard_id': stId }).subscribe(res => {
        this.SpinnerService.hide();

        let response: any = {};
        response = res;
        this.classList = response.classdata;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  getStudentList(page, strFilter) {

    try {

      this.SpinnerService.show();

      this.eiService.getData('ei/student-list/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        this.studentList = response.results;
        this.pageSize = response.page_size;
        this.totalNumberOfPage = response.count;
        let arrStudentList: any = [];
        
        if (!page) { page = 1 }
        var i = (this.pageSize * (page - 1)) + 1;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage

        this.studentList.forEach(objData => {
          let objStudentList: any = {};
          objStudentList.position = i;
          objStudentList.zatchUpID = objData.zatchup_id;
          objStudentList.name = objData.first_name + ' ' + objData.last_name;
          objStudentList.userID = objData.admission_no;
          objStudentList.class = objData.class_name;
          //objStudentList.Gender = objData.gender;
          //objStudentList.Age = objData.dob;
          
          objStudentList.studentID = objData.user_id;
          objStudentList.approved = objData.approved;
          objStudentList.kyc_approved = objData.kyc_approved;
         
          objStudentList.Action = '';

          arrStudentList.push(objStudentList);
          i = i + 1;
        })

        this.dataSource=arrStudentList;
        if (response.status == false)
        {
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
}
