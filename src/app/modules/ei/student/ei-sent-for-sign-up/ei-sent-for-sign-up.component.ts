import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { SignUpEi } from 'src/app/modules/admin/ei/modals/ei-pending-approval.modal';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-ei-sent-for-sign-up',
  templateUrl: './ei-sent-for-sign-up.component.html',
  styleUrls: ['./ei-sent-for-sign-up.component.css']
})
export class EiSentForSignUpComponent implements OnInit {

  signUpEi : SignUpEi
  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location
  ) { 
    this.signUpEi = new SignUpEi();
    this.signUpEi.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getSignUpEi('');
    this.getAllCourse()
    // this.getCourseList();
  }

  getSignUpEi(page?:any){
    this.loader.show();

    this.signUpEi.listParams = {
      "date_from": this.signUpEi.filterFromDate !== undefined ? this.datePipe.transform(this.signUpEi.filterFromDate, 'yyyy-MM-dd'): '',
      "date_to": this.signUpEi.filterToDate !== undefined ? this.datePipe.transform(this.signUpEi.filterToDate, 'yyyy-MM-dd'): '',
      "page_size": this.signUpEi.pageSize ? this.signUpEi.pageSize : 5,
      "page": this.signUpEi.page ? this.signUpEi.page : 1,
      "course": this.signUpEi.course_id,
      "standard": this.signUpEi.standard_id,
      "teaching_class": this.signUpEi.class_id,
      "status": 'SENTFORSIGNUP'
    }
    this.baseService.getData('ei/request-for-signup-students/', this.signUpEi.listParams).subscribe(
      (res: any) => {
        if(res.status == true){
        if(!page)
        page = this.signUpEi.config.currentPage
        this.signUpEi.startIndex = res.page_size * (page - 1) + 1;
        this.signUpEi.config.itemsPerPage = res.page_size
        this.signUpEi.config.currentPage = page
        this.signUpEi.config.totalItems = res.count;
        if(res.count > 0)
        this.signUpEi.dataSource = res.results
        else 
        this.signUpEi.dataSource = undefined
      }
      else
      this.alert.error(res.error.message[0], 'Error')
      this.loader.hide()
      }
    ),
    (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide()
    }
    console.log(this.signUpEi.listParams)

  }
  getAllCourse(){
    this.baseService.getData('ei/course-list/').subscribe(
      (res: any) => {
       // console.log('get state res ::', res)
        if (res.count >0)
        this.signUpEi.allCourses = res.results
      }
    )
    console.log(this.signUpEi.listParams)
  }
  
  getAllStandard(){
    this.baseService.getData('ei/standard-list/', {"course_id":this.signUpEi.course_id}).subscribe(
      (res : any) => {
        if(res.status= true)
        this.signUpEi.allStandard = res.standarddata
      }
    )
  }
  getAllClasses(){
    this.baseService.getData('ei/class-list/', {"standard_id":this.signUpEi.standard_id}).subscribe(
      (res : any) =>{
        if(res.status= true)
        this.signUpEi.allClasses = res.classdata
      }
    )
  }
  goBack(): void{
    this.location.back()
  }
}
