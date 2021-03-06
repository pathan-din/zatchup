import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { StudentApproval } from 'src/app/modules/admin/ei/modals/ei-pending-approval.modal';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  position: number;
  addingDate: string;
  name: string;
  phoneNumber: string;
  userID: string;
  class: string;
  rollNumber: number;
  unverifyStudent: string; 
}

@Component({
  selector: 'app-sign-up-pending-list',
  templateUrl: './sign-up-pending-list.component.html',
  styleUrls: ['./sign-up-pending-list.component.css']
})
export class SignUpPendingListComponent implements OnInit {

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
    private datePipe: DatePipe
    ) { 
      this.studentApproval = new StudentApproval();
      this.maxDate = new Date();
    }

  ngOnInit(): void {
    this.getStudentApproval('');
    this.getCourseList();

  }

  getStudentApproval(page?:any) {
    this.loader.show();
   
  
    
    this.studentApproval.listParams = {
      "date_from": this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd'): '',
      "date_to": this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd'):'',
      "page_size": this.studentApproval.pageSize ? this.studentApproval.pageSize : 5,
      "page": page ? page : 1
  }

  this.baseService.getData('ei/verifiedstudents/', this.studentApproval.listParams).subscribe(
    (res: any) => {
      if (res.status == true) {
        if (!page)
          page = this.studentApproval.config.currentPage
        this.studentApproval.startIndex = res.page_size * (page - 1) + 1;
        this.studentApproval.config.itemsPerPage = res.page_size
        this.studentApproval.config.currentPage = page
        this.studentApproval.config.totalItems = res.count;
        if(res.count > 0)
          this.studentApproval.dataSource = res.results
          else
          this.studentApproval.dataSource = undefined
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
  
  getCourseList(){
    this.baseService.getData('ei/course-list/').subscribe(
      (res: any) =>{
        if(res.count > 0)
        this.studentApproval.courseList = res.results
      }
    )
  }
  getStandardList(courseId){
    let obj:any={}
    obj.course_id=courseId
    this.baseService.getData('ei/standard-list/',  obj).subscribe(
      (res: any) =>{
        if(res.status== true)
        this.studentApproval.standardList = res.standarddata
      }
    )
  }
  getClassList(standardId){
    let obj:any={}
    obj.standard_id=standardId
    this.baseService.getData('ei/class-list/', obj).subscribe(
      (res: any) =>{
        if(res.status== true)
        this.studentApproval.classList = res.classdata
      }
    )
  }

}
