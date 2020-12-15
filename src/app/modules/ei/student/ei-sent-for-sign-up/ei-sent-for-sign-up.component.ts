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
    // this.getCourseList();
  }

  getSignUpEi(page?:any){
    this.loader.show();
    let courseFind: any;
    let standardFind: any;
    let classFind: any;
    if(this.signUpEi.allCourses && this.signUpEi.courseId){
      courseFind = this.signUpEi.allCourses.find(val =>{
        return val.id == this.signUpEi.courseId
      })
    }
    if(this.signUpEi.allStandard && this.signUpEi.standardId){
      standardFind = this.signUpEi.allStandard.find(val => {
        return val.id == this.signUpEi.standardId
      })
    }
    if(this.signUpEi.allClasses && this.signUpEi.classId){
      classFind = this.signUpEi.allClasses.find(val => {
        return val.id == this.signUpEi.classId
      })
    }


    this.signUpEi.listParams = {
      "date_from": this.signUpEi.filterFromDate !== undefined ? this.datePipe.transform(this.signUpEi.filterFromDate, 'yyyy-mm-dd'): '',
      "date_to": this.signUpEi.filterToDate !== undefined ? this.datePipe.transform(this.signUpEi.filterToDate, 'yyyy-mm-dd'): '',
      "page_size": this.signUpEi.pageSize ? this.signUpEi.pageSize : 5,
      "page": this.signUpEi.page ? this.signUpEi.page : 1,
      "course": courseFind ? courseFind.course: '',
      "standard": standardFind ? standardFind.standard: '',
      "class": classFind ? classFind.class: ''
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
  }
  // getCourseList(){
  //   this.baseService.getData('ei/course-list/').subscribe(
  //     (res: any) =>{
  //       console.log('get course res ::', res)
  //       if(res.count > 0)
  //       this.signUpEi.courseList = res.results
  //     }
  //   )
  // }
  // getStandardList(courseId){
  //   let obj:any={}
  //   obj.course_id=courseId
  //   this.baseService.getData('ei/standard-list/',  obj).subscribe(
  //     (res: any) =>{
  //       console.log('get standard res ::', res)
  //       if(res.status== true)
  //       this.signUpEi.standardList = res.standarddata
  //     }
  //   )
  // }
  // getClassList(standardId){
  //   let obj:any={}
  //   obj.standard_id=standardId
  //   this.baseService.getData('ei/class-list/', obj).subscribe(
  //     (res: any) =>{
  //       console.log('get class res ::', res)
  //       if(res.status== true)
  //       this.signUpEi.classList = res.classdata
  //     }
  //   )
  // }

  getAllCourse(){
    this.baseService.getData('ei/course-list/').subscribe(
      (res: any) => {
       // console.log('get state res ::', res)
        if (res.count >0)
        this.signUpEi.allCourses = res.results
      }
    )
  }
  getAllStandard(){
    this.baseService.getData('ei/standard-list/' + this.signUpEi.courseId).subscribe(
      (res : any) => {
        if(res.count > 0)
        this.signUpEi.allStandard = res.results
      }
    )
  }
  getAllClasses(){
    this.baseService.getData('ei/class-list/' + this.signUpEi.standardId).subscribe(
      (res : any) =>{
        if(res.count >0)
        this.signUpEi.allClasses = res.results
      }
    )
  }
  goBack(): void{
    this.location.back()
  }
}
