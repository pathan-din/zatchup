import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
declare var $: any;

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
  @ViewChild("closeModel1") closeModel1:any;
  model: any = {};
  modelReason: any = {};
  studentList: any = [];
  studentDetails:any=[];
  arrAge: any = [];
  studentArr:any=[];
  modelUserId:any='';
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
  error: any = [];
  errorDisplay: any = {};
  title:any='';
  pageCounts: any;
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService, 
    public eiService: EiServiceService, 
    public base: BaseService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService, private route: ActivatedRoute,
    private location: Location,
    private baseService: BaseService
    ) { }


  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.model.gender = '';
    // this.model.age = '';
    this.model.approved=""
    // this.model.kyc_approved=""
    this.route.queryParams.subscribe(params => {
     
      this.model.approved=params['approved']?params['approved']:'';
      
     // this.model.kyc_approved=params['kyc_approved']?params['kyc_approved']:'';

      this.model.is_rejected=params['is_rejected']?params['is_rejected']:'';

      this.model.rejectedby=params['rejectedby']?params['rejectedby']:'';
      this.title=params['title'];

    });
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
        this.base.actionForPutMethod('ei/bulk-editclass-by-ei/', {'student_ids':this.studentListSendForBulk.join(','),'class_id':this.model.class_id}).subscribe(res => {
          let response: any = {};
          response = res;
          this.SpinnerService.hide();
          this.alert.error(response.message,'Error');
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
   

this.model.page= page
      //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
      this.base.getData('ei/student-list/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        this.studentList = response.results;
        this.model.page= page
        this.pageSize = response.page_size;
        this.model.page_size=this.pageSize
        this.totalNumberOfPage = response.count;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage;
        this.pageCounts = this.baseService.getCountsOfPage();
        let arrStudentList: any = [];
        if (!page) { page = 1 }
        var i = (this.pageSize * (page - 1)) + 1;
        this.studentList.forEach(objData => {
          let objStudentList: any = {};
          objStudentList.checked = '';
          objStudentList.SNo = i;
          objStudentList.ZatchUpID = objData.zatchup_id;

          objStudentList.student_id = objData.user_id;
          objStudentList.kyc_approved = objData.kyc_approved;
          objStudentList.approved = objData.approved;
          objStudentList.is_rejected = objData.is_rejected;
          objStudentList.reason_reject = objData.reason_reject;

          objStudentList.Name = objData.first_name + ' ' + objData.last_name;
          objStudentList.Gender = objData.gender;
          objStudentList.Age = objData.age;
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
      // var age = 'age=' + this.model.age
      var gender = 'gender=' + this.model.gender
      arrFilter.push(course)
      arrFilter.push(standard)
      arrFilter.push(teaching_class)
      // arrFilter.push(age)
      arrFilter.push(gender)
      var strFilter = arrFilter.join("&");

      this.getGetVerifiedStudent('', strFilter)
    }


  }
  goToEiStudentEditPage(id,approve) {
    this.router.navigate(['ei/student-edit'], { queryParams: { 'stId': id,'approve':approve } });
  }

  goToEiStudentProfilePage(id) {
    this.router.navigate(['ei/student-profile'], { queryParams: { 'stId': id } });
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
          this.closeRejectModel();
          this.alert.success(response.message, 'Success')
          this.getGetVerifiedStudent('', '')
        } else { // Condition False Validation failure
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          this.alert.error(errorCollection,"Error");

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
  closeRejectModel(){
    $("#rejectModel").modal('hide');
  }

  approveStudent(action, studentId) {
    let data: any = {};
    data.student_id = studentId;
    data.approve_student = action;
    try {

      this.SpinnerService.show();

      this.eiService.approveStudent(data).subscribe(res => {
        let response: any = {};
        response=res;
        if (response.status == true) {
          this.SpinnerService.hide();
         
          this.alert.success(response.message,'Success');
          this.closeModel();
          this.router.navigate(["ei/student-management"]);
          // this.getGetVerifiedStudent('', '')
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
  goBack(): void{
    this.location.back()
  }

}
