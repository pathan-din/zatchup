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

@Component({
  selector: 'app-ei-student-verified-list',
  templateUrl: './ei-student-verified-list.component.html',
  styleUrls: ['./ei-student-verified-list.component.css']
})
export class EiStudentVerifiedListComponent implements OnInit {
  @ViewChild("verifiedModel") closeVerifiedModel: any;
  @ViewChild("closeModel") closeRejectModel: any;
  model: any = {};
  modelReason: any = {};
  studentList: any = [];
  studentDetails: any = [];
  arrAge: any = [];
  studentArr: any = [];
  modelUserId: any = '';
  displayedColumns: string[] = ['checked', 'SNo', 'ZatchUpID', 'Name', 'userID', 'roll_no', 'Gender', 'Age',
    'class', 'Action'];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };
  dataSource: any;
  courseList: any = [];
  standardList: any = [];
  classList: any = [];
  studentListSendForBulk: any = [];
  error: any = [];
  errorDisplay: any = {};
  title: any = '';
  pageCounts: any;
  constructor(
    private router: Router,
    private location: Location,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private formValidationService: GenericFormValidationService,
  ) { }


  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.model.gender = '';
    // this.model.age = '';
    this.model.approved = ""
    // this.model.kyc_approved=""
    this.route.queryParams.subscribe(params => {
      this.model.approved = params['approved'] ? params['approved'] : '';
      // this.model.kyc_approved=params['kyc_approved']?params['kyc_approved']:'';
      this.model.is_rejected = params['is_rejected'] ? params['is_rejected'] : '';
      this.model.rejectedby = params['rejectedby'] ? params['rejectedby'] : '';
      this.title = params['title'];
    });
    for (var i = 5; i < 70; i++) {
      this.arrAge.push(i);
    }
    this.getGetVerifiedStudent('', '')
    this.displayCourseList();
  }
  displayCourseList() {
    try {
      this.loader.show();
      this.model.course = '';
      this.model.standard = '';
      this.model.teaching_class = '';
      this.eiService.displayCourseList().subscribe(res => {
        let response: any = {};
        response = res;
        this.courseList = response.results;
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }
  displayStandardList(courseId) {
    try {
      this.loader.show();
      this.standardList = []
      this.model.standard = '';
      this.model.teaching_class = '';
      this.eiService.displayStandardList(courseId).subscribe(res => {
        this.loader.hide();
        let response: any = {};
        response = res;
        this.standardList = response.standarddata;
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }
  displayClassList(stId) {
    try {
      this.loader.show();
      this.classList = [];
      this.eiService.displayClassList(stId).subscribe(
        (res: any) => {
          this.classList = res.classdata;
          this.loader.hide();
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }
  editBulkClass() {
    if (!this.model.teaching_class && this.studentListSendForBulk.length == 0) {
      alert("Please select student list of particular class.")
      return;
    } else {
      try {
        this.loader.show();
        this.baseService.actionForPutMethod('ei/bulk-editclass-by-ei/', { 'student_ids': this.studentListSendForBulk.join(','), 'class_id': this.model.class_id }).subscribe(
          (res: any) => {
            this.loader.hide();
            this.alert.error(res.message, 'Error');
          }, (error) => {
            this.loader.hide();
          });
      } catch (err) {
        this.loader.hide();
      }
    }
  }
  getStudentBycheckboxClickForStudentBulkAction(stId, event) {

    if (event.checked) {
      if (this.studentListSendForBulk.indexOf(stId) === -1) {
        this.studentListSendForBulk.push(stId)
      }
    } else {
      if (this.studentListSendForBulk.indexOf(stId) === -1) {

      } else {
        var index = this.studentListSendForBulk.indexOf(stId)
        this.studentListSendForBulk.splice(index, 1);
      }
    }
  }

  getGetVerifiedStudent(page, strFilter) {

    try {
      this.loader.show();
      this.model.page = page
      this.baseService.getData('ei/student-list/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          this.studentList = res.results;
          this.model.page = page
          this.pageSize = res.page_size;
          this.model.page_size = this.pageSize
          this.totalNumberOfPage = res.count;
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
            objStudentList.zatchupID = objData.zatchup_id;
            objStudentList.student_id = objData.user_id;
            objStudentList.kyc_approved = objData.kyc_approved;
            objStudentList.approved = objData.approved;
            objStudentList.is_rejected = objData.is_rejected;
            objStudentList.reason_reject = objData.reason_reject;
            objStudentList.name = objData.first_name + ' ' + objData.last_name;
            objStudentList.gender = objData.gender;
            objStudentList.age = objData.age;
            objStudentList.userID = objData.admission_no;
            objStudentList.class = objData.class_name;
            objStudentList.alias_class = objData.alias_class;
            objStudentList.roll_no = objData.roll_no
            objStudentList.Action = '';
            i = i + 1;
            arrStudentList.push(objStudentList);
          })

          this.dataSource = arrStudentList;
          if (res.status == false) {
            this.alert.error(res.error.message[0], 'Error')
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }
  applyFilter() {
    var arrFilter = [];
    if (Object.keys(this.model).length > 0) {
      var course = 'course=' + this.model.course
      var standard = 'standard=' + this.model.standard
      var teaching_class = 'teaching_class=' + this.model.teaching_class
      var gender = 'gender=' + this.model.gender
      arrFilter.push(course)
      arrFilter.push(standard)
      arrFilter.push(teaching_class)
      arrFilter.push(gender)
      var strFilter = arrFilter.join("&");
      this.getGetVerifiedStudent('', strFilter)
    }
  }

  goToEiStudentEditPage(id, approve) {
    this.router.navigate(['ei/student-edit'], { queryParams: { 'stId': id, 'approve': approve } });
  }

  goToEiStudentProfilePage(id) {
    this.router.navigate(['ei/student-profile'], { queryParams: { 'stId': id } });
  }


  /**
   * Export Data
   */

  getExportData() {
    try {
      let params: any = [];
      params['export_csv'] = true
      this.baseService.generateExcel('ei/export-verifiedstudent-by-ei/', 'verified-student', params)
    } catch (error) {
      console.log(error)
    }
  }
  rejectStudent() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
      this.eiService.postRejectReason(this.modelReason).subscribe(
        (res: any) => {
          if (res.status === true) {
            this.closeRejectModel.nativeElement.click()
            this.alert.success(res.message, 'Success')
            this.router.navigate(['ei/student-management']);
          } else {
            this.loader.hide();
            var errorCollection = '';
            for (var key in res.error) {
              if (res.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + res.error[key][0] + '\n'
              }
            }
            this.alert.error(errorCollection, "Error");
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }


  openRejectModel(studentId) {
    this.modelReason.student_id = studentId;
  }

  openModel(studentID) {
    this.modelUserId = studentID;
    $("#verifiedModel").modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  approveStudent(action, studentId) {
    let data: any = {};
    data.student_id = studentId;
    data.approve_student = action;
    try {
      this.loader.show();
      this.eiService.approveStudent(data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.alert.success(res.message, 'Success');
            this.closeRejectModel.nativeElement.click()
            this.router.navigate(['ei/student-management']);
          } else {
            this.loader.hide();
            this.alert.error(res.error, 'Error');
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }
  goBack(): void {
    this.location.back()
  }

  getGender(data: any) {
    if (data)
      return this.baseService.getGender(data)
    return ''
  }

}
