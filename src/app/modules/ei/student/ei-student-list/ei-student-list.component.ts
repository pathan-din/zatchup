import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../../../../services/base/base.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
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
  error: any = [];
  errorDisplay: any = {};
  modelReason: any = {};
  modelUserId:any='';
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router, 
    private SpinnerService: NgxSpinnerService, 
    public eiService: EiServiceService, 
    public base: BaseService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private location: Location
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
  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  openRejectModel(studentId) {
    this.modelReason.student_id = studentId;
  }

  openModel(studentID)
  {
    this.modelUserId = studentID;
    $("#verifiedModel").modal({
      backdrop: 'static',
      keyboard: false
    });
   
  }
  closeModel(){
    $("#verifiedModel").modal('hide');
  }
  displayCourseList() {
    try {
      this.SpinnerService.show();
      this.model.course = '';
      this.model.standard = '';
      this.model.teaching_class = '';
      this.base.getData('ei/course-list/').subscribe(res => {
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
      this.base.getData('ei/standard-list/', { 'course_id': courseId }).subscribe(res => {
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
      this.base.getData('ei/class-list/', { 'standard_id': stId }).subscribe(res => {
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
  goToEiStudentProfilePage(id) {
    this.router.navigate(['ei/student-profile'], { queryParams: { 'stId': id } });
  }
  getStudentList(page, strFilter) {

    try {

      this.SpinnerService.show();

      this.base.getData('ei/student-list/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        this.studentList = response.results;
        this.pageSize = response.page_size;
        this.model.page_size=this.pageSize
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

  getExportData(){
    try {
      let params:any=[];
      params['export_csv'] = true
      this.base.generateExcel('ei/export-student-by-ei/', 'student-list', params)
    
      
    } catch (error) {
      console.log(error)
    }
  }

  rejectStudent() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/

      this.eiService.postRejectReason(this.modelReason).subscribe(res => {

        let response: any = {};
        response = res;

        if (response.status === true)// Condition True Success 
        {

          this.alert.success(response.message, 'Success')
          this.getStudentList('', '')
        } else { // Condition False Validation failure
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          alert(errorCollection);

        }

        /*End else*/
        //this.router.navigate(['user/signup']);
      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  goBack(): void{
    this.location.back()
  }
}
