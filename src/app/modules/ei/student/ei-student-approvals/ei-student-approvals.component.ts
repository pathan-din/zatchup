import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { StudentApproval } from 'src/app/modules/admin/ei/modals/ei-pending-approval.modal';
import { DatePipe, Location } from '@angular/common';

export interface PeriodicElement {
  position: number;
  addingDate: string;
  zatchUpID: string;
  name: string;
  phoneNumber: string;
  emailID: string;
  userID: string;
  class: string;
  rollNumber: number;
  gender: string;
  age: number;
  unverifyStudent: string;
}



@Component({
  selector: 'app-ei-student-approvals',
  templateUrl: './ei-student-approvals.component.html',
  styleUrls: ['./ei-student-approvals.component.css'],
  providers:[DatePipe]
})
export class EiStudentApprovalsComponent implements OnInit {
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
  studentApproval : StudentApproval ;
  
  SpinnerService: any;
  model: any;
  //courseList: any=[];

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location
    ) { 
      this.studentApproval = new StudentApproval();
      this.maxDate = new Date();
    }

  ngOnInit(): void {
    this.getStudentApproval('');
    // this.getCourseList();

  }
  // goToEiStudentEditPage(id) {
  //   this.router.navigate(['ei/student-edit'], { queryParams: { 'stId': id } });
  // }

  getStudentApproval(page?:any) {
    this.loader.show();
    this.studentApproval.listParams = {
      "date_from": this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd'): '',
      "date_to": this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd'):'',
      "page_size": this.studentApproval.pageSize ? this.studentApproval.pageSize : 5,
      "page": page ? page : 1,
      "course": this.studentApproval.course_id,
      "standard": this.studentApproval.standard_id,
      "teaching_class": this.studentApproval.class_id,
      "status": 'APPROVBYUSER',
      // 'approvedby':3

  }

  this.baseService.getData('ei/request-for-signup-students/', this.studentApproval.listParams).subscribe(
    (res: any) => {
      console.log('list params....', res)
      if (res.status == true) {
        if (!page)
          page = this.studentApproval.config.currentPage
        this.studentApproval.startIndex = res.page_size * (page - 1) + 1;
        this.studentApproval.config.itemsPerPage = res.page_size
        this.studentApproval.config.currentPage = page
        this.studentApproval.config.totalItems = res.count;
        if(res.count > 0){
          this.studentApproval.dataSource = res.results;
          this.studentApproval.pageCounts = this.baseService.getCountsOfPage()
         } else{
          this.studentApproval.dataSource = undefined
    }
  }
    else
    this.alert.error(res.error.message[0], 'Error')
    this.loader.hide();
    }
    ),  (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  generateExcel() {
    delete this.studentApproval.listParams.page_size;
    delete this.studentApproval.listParams.page;
    this.studentApproval.listParams['export_csv'] = true
    this.baseService.generateExcel('ei/export-verifiedstudent-by-ei/', 'student-approved', this.studentApproval.listParams);
  }
  
  // getCourseList(){
  //   this.baseService.getData('ei/course-list/').subscribe(
  //     (res: any) =>{
  //       //console.log('get course res ::', res)
  //       if(res.count > 0)
  //       this.studentApproval.courseList = res.results
  //     }
  //   )
  // }
  // getStandardList(){
  //   this.baseService.getData('ei/standard-list/', {'course_id': this.studentApproval.course_id}).subscribe(
  //     (res:any)=>{
  //       if(res.status == true)
  //       this.studentApproval.standardList= res.standarddata
  //     }
  //   )
  // }
  // getClassList(){
  //   this.baseService.getData('ei/class-list/', {'standard_id': this.studentApproval.standard_id}).subscribe(
  //     (res:any)=>{
  //       if(res.status== true)
  //       this.studentApproval.classList= res.classdata
  //     }
  //   )
  // }
  goBack(): void{
    this.location.back()
  }
}
 


