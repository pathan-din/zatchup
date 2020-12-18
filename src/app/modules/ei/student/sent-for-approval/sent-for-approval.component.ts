import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SentForApproval } from 'src/app/modules/admin/ei/modals/ei-pending-approval.modal';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-sent-for-approval',
  templateUrl: './sent-for-approval.component.html',
  styleUrls: ['./sent-for-approval.component.css']
})
export class SentForApprovalComponent implements OnInit {

  sentForApproval: SentForApproval;
  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location
  ) { this.sentForApproval = new SentForApproval();
    this.sentForApproval.maxDate = new Date();}

  ngOnInit(): void {
    this.getSentForApproval('');
    this.getAllCourse()
  }

  getSentForApproval(page?: any){
    this.loader.show()
    this.sentForApproval.listParams = {
      "date_from": this.sentForApproval.filterFromDate !== undefined ? this.datePipe.transform(this.sentForApproval.filterFromDate, 'yyyy-MM-dd'): '',
      "date_to": this.sentForApproval.filterToDate !== undefined ? this.datePipe.transform(this.sentForApproval.filterToDate, 'yyyy-MM-dd'): '',
      "page_size": this.sentForApproval.pageSize ? this.sentForApproval.pageSize : 5,
      "page": this.sentForApproval.page ? this.sentForApproval.page : 1,
      "course": this.sentForApproval.course_id,
      "standard": this.sentForApproval.standard_id,
      "teaching_class": this.sentForApproval.class_id,
      "status":'SENTFORAPPROVAL'
    }
    this.baseService.getData('ei/sent-for-signup-student-list/', this.sentForApproval.listParams).subscribe(
      (res: any)=>{
        if(res.status == true){
          if(!page)
          page = this.sentForApproval.config.currentPage
          this.sentForApproval.startIndex = res.page_size * (page - 1) + 1;
          this.sentForApproval.config.itemsPerPage = res.page_size
          this.sentForApproval.config.currentPage = page
          this.sentForApproval.config.totalItems = res.count;
          if(res.count >0)
          this.sentForApproval.dataSource = res.results
          else
          this.sentForApproval.dataSource = undefined
        }
        else{
          this.loader.hide()
          this.alert.error(res.error, 'Error')
        }
       
      }
    ),(err: any)=>{
      this.loader.hide()
      this.alert.error(err, 'Error')
    }
  }
  getAllCourse(){
    this.baseService.getData('ei/course-list/').subscribe(
      (res: any) => {
       // console.log('get state res ::', res)
        if (res.count >0)
        this.sentForApproval.allCourses = res.results
      }
    )
    console.log(this.sentForApproval.listParams)
  }
  
  getAllStandard(){
    this.baseService.getData('ei/standard-list/', {"course_id":this.sentForApproval.course_id}).subscribe(
      (res : any) => {
        if(res.status= true)
        this.sentForApproval.allStandard = res.standarddata
      }
    )
  }
  getAllClasses(){
    this.baseService.getData('ei/class-list/', {"standard_id":this.sentForApproval.standard_id}).subscribe(
      (res : any) =>{
        if(res.status= true)
        this.sentForApproval.allClasses = res.classdata
      }
    )
  }
  goBack(): void{
    this.location.back()
  }
}
