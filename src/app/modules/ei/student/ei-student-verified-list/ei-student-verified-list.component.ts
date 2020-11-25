import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

export interface UnVerifiedAlumniListElement {
  checked: string;
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
  selector: 'app-ei-student-verified-list',
  templateUrl: './ei-student-verified-list.component.html',
  styleUrls: ['./ei-student-verified-list.component.css']
})
export class EiStudentVerifiedListComponent implements OnInit {
  model: any = {};
  studentList: any = [];
  arrAge: any = [];
  studentArr:any=[];
  displayedColumns: string[] = ['checked','SNo', 'ZatchUpID', 'Name', 'userID', 'Gender', 'Age',
    'class', 'Action'];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };
  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  courseList: any = [];
  standardList: any = [];
  classList: any = [];
  studentListSendForBulk:any=[];
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService, 
    public eiService: EiServiceService, 
    public base: BaseService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService
    ) { }


  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.model.gender = '';
    this.model.age = '';
    for (var i = 5; i < 70; i++) {
      this.arrAge.push(i);
    }
    this.getGetVerifiedStudent('', '')
    this.displayCourseList();
  }
  displayCourseList() {
    try {
      this.SpinnerService.show();

      this.model.course = '';
      this.model.standard = '';
      this.model.teaching_class = '';
      this.eiService.displayCourseList().subscribe(res => {

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
      this.model.standard = '';
      //this.model.course_id='';

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
  editBulkClass(){
    if(!this.model.teaching_class && this.studentListSendForBulk.length==0){
      alert("Please select student list of particular class.")
      return;
    }else{
        try {
        this.SpinnerService.show();
        this.base.action('ei/bulk-editclass-by-ei/', {'student_id':this.studentListSendForBulk.join(','),'class_id':this.model.class_id}).subscribe(res => {
          let response: any = {};
          response = res;
          this.SpinnerService.hide();
          alert(response.message);
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
  getStudentBycheckboxClickForStudentBulkAction(stId,event){
    
    if(event.checked){
      if(this.studentListSendForBulk.indexOf(stId)===-1){
        this.studentListSendForBulk.push(stId)
      }
    }else{
      if(this.studentListSendForBulk.indexOf(stId)===-1){
       
      }else{
        var index=this.studentListSendForBulk.indexOf(stId)
        this.studentListSendForBulk.splice(index, 1);
      }
    }
   }
  
  getGetVerifiedStudent(page, strFilter) {

    try {
        this.SpinnerService.show();
      //base


      //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
      this.base.getData('ei/verifiedstudents/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        this.studentList = response.results;
        this.pageSize = response.page_size;
        this.model.page_size=this.pageSize
        this.totalNumberOfPage = response.count;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage
        let arrStudentList: any = [];
        if (!page) { page = 1 }
        var i = (this.pageSize * (page - 1)) + 1;
        this.studentList.forEach(objData => {
          let objStudentList: any = {};
          objStudentList.checked = '';
          objStudentList.SNo = i;
          objStudentList.ZatchUpID = objData.zatchup_id;
          objStudentList.student_id = objData.user_id;
          objStudentList.Name = objData.first_name + ' ' + objData.last_name;
          objStudentList.Gender = objData.gender;
          objStudentList.Age = objData.dob;
          objStudentList.userID = objData.admission_no;
          objStudentList.class = objData.class_name;;
          objStudentList.Action = '';
          i = i + 1;
          arrStudentList.push(objStudentList);
        })

        this.dataSource = arrStudentList;
        if (response.status == false)
        {
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
        // console.log(error);
        // this.alert.error(response.message[0], 'Error')
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
      // this.alert.error(err, 'Error')
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

      this.getGetVerifiedStudent('', strFilter)
    }


  }
  goToEiStudentEditPage(id) {
    this.router.navigate(['ei/student-edit'], { queryParams: { 'stId': id } });
  }

  goToEiStudentProfilePage() {
    this.router.navigate(['ei/student-profile']);
  }


  /**
   * Export Data
   */

  getExportData(){
    try {
      let params:any=[];
      params['export_csv'] = true
      this.base.generateExcel('ei/export-verifiedstudent-by-ei/', 'verified-student', params)
    
      
    } catch (error) {
      console.log(error)
    }
  }


}
