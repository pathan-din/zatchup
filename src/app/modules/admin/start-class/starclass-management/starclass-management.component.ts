import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-starclass-management',
  templateUrl: './starclass-management.component.html',
  styleUrls: ['./starclass-management.component.css']
})
export class StarclassManagementComponent implements OnInit {
  dashBoardCount: any;

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.getDashBoardCount()
  }

  goToStarClassPlan(){
    this.router.navigate(['admin/current-plans'])
  }

  goToPaymentRevenue(){
    this.router.navigate(['admin/payment-starclass-revenue'])
  }

  goToStarclassBought(){
    this.router.navigate(['admin/starclass-bought'])
  }

  goToCreateCourse(){
    this.router.navigate(['admin/starclass-course-add'], {queryParams:{'action': 'add'}})
  }

  goToCourseList(){
    this.router.navigate(['admin/course-added-list'])
  }

  goToCourseUploadedByEi(){
    this.router.navigate(['admin/starclass-course-upload-by-ei'])
  }

  getDashBoardCount(){
  this.loader.show()
  try {
    this.baseService.getData('starclass/count/').subscribe(
      (res: any) =>{
        if(res.status == true){
          this.dashBoardCount = res.data
        }
        else{
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error')
      this.loader.hide()
    }
  } catch (error) {
    this.alert.error(error.error, 'Error')
    this.loader.hide()
  }
  }
}
