import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
declare var $: any;
export interface UnVerifiedAlumniListElement {

  'SNo': number;
  ZatchUpID: string;
  Name: string;
  Gender: string;
  Age: number;
  userID: string;
  class: string;
  Action: string;

}

const ELEMENT_DATA: UnVerifiedAlumniListElement[] = [


];
@Component({
  selector: 'app-ei-student-pending-verification',
  templateUrl: './ei-student-pending-verification.component.html',
  styleUrls: ['./ei-student-pending-verification.component.css']
})
export class EiStudentPendingVerificationComponent implements OnInit {
  model: any = {};
  modelReason: any = {};
  error: any = [];
  errorDisplay: any = {};
  arrAge: any = [];
  studentList: any = [];//
  displayedColumns: string[] = ['SNo', 'ZatchUpID', 'Name', 'userID', 'Gender', 'Age',
    'class', 'Action'];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;

  config: any;
  collection = { count: 60, data: [] };
  dataSource = ELEMENT_DATA;
  modelUserId:any='';
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  courseList: any = [];
  standardList: any = [];
  classList: any = [];
  constructor(
    private genericFormValidationService: GenericFormValidationService,
     private base: BaseService,
    private router: Router,
     private SpinnerService: NgxSpinnerService,
      public eiService: EiServiceService,
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
    this.getPendingStudentList('', '')
    this.displayCourseList();
  }
  /**
   * Export Data
   */
  getExportData() {
    try {
      let params: any = [];
      params['export_csv'] = true
      this.base.generateExcel('ei/export-student-by-ei/', 'unveryfy-student', params)
      // this.base.getData('ei/export-student-by-ei/').subscribe(res=>{
      //   let response:any={}
      //   response=res;
      // },(error) => {
      //   this.SpinnerService.hide(); 
      //   //console.log(error);

      // });

    } catch (error) {
      console.log(error)
    }
  }
  displayCourseList() {
    try {
      this.SpinnerService.show();
      this.model.course = '';
      this.model.standard = '';
      this.model.teaching_class = '';
      this.eiService.displayCourseList().subscribe(res => {
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
      this.eiService.displayStandardList(courseId).subscribe(res => {
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
      this.eiService.displayClassList(stId).subscribe(res => {
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
          this.getPendingStudentList('', '')
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
  applyFilter() {

    var arrFilter = [];
    if (Object.keys(this.model).length > 0) {
      var course = 'course=' + this.model.course
      var standard = 'standard=' + this.model.standard
      var teaching_class = 'teaching_class=' + this.model.teaching_class
      var age = 'age=' + this.model.age
      var gender = 'gender=' + this.model.gender
      arrFilter.push(course)
      arrFilter.push(standard)
      arrFilter.push(teaching_class)
      arrFilter.push(age)
      arrFilter.push(gender)
      var strFilter = arrFilter.join("&");
      this.getPendingStudentList('', strFilter)
    }


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
  /**
   * Approve Student
   * api name: approve-student
   *  request : object
   * response : object
   * Method : PUT
   */
  approveStudent(action, studentId) {
    let data: any = {};
    data.student_id = studentId;
    data.approve_student = action;
    try {

      this.SpinnerService.show();

      this.eiService.approveStudent(data).subscribe(res => {
        let response: any = {};
        if (response.status == true) {
          this.SpinnerService.hide();
          this.alert.success(response.message,'Success');
        } else {
          this.SpinnerService.hide();
          //this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService, response.error);
          this.alert.error(response.error,'Error');
           
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
  getPendingStudentList(page, strFilter) {

    try {

      this.SpinnerService.show();

      this.eiService.getPendingStudentList(page, strFilter).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        this.studentList = response.results;
        this.pageSize = response.page_size;
        this.model.page_size = this.pageSize;
        this.totalNumberOfPage = response.count;
        let arrStudentList: any = [];

        if (!page) { page = 1 }
        var i = (this.pageSize * (page - 1)) + 1;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage

        this.studentList.forEach(objData => {
          let objStudentList: any = {};
          objStudentList.SNo = i;
          objStudentList.ZatchUpID = objData.zatchup_id;
          objStudentList.Name = objData.first_name + ' ' + objData.last_name;
          objStudentList.Gender = objData.gender;
          objStudentList.Age = objData.dob;
          objStudentList.userID = objData.admission_no;
          objStudentList.studentID = objData.user_id;
          objStudentList.approved = objData.approved;
          objStudentList.kyc_approved = objData.kyc_approved;
          objStudentList.class = objData.class_name;
          objStudentList.Action = '';

          arrStudentList.push(objStudentList);
          i = i + 1;
        })

        this.dataSource = arrStudentList;
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
