import { DatePipe } from '@angular/common';
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
  filteredResponse: any;
  filterFromDate: any;
  filterToDate: any;
  fromMaxDate: any;
  toMaxDate: any;
  model: { from_date: any; to_date: any; };

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe

  ) { 
    this.fromMaxDate = new Date();
    this.toMaxDate = new Date();
    this.filterFromDate = this.fromMaxDate;
    this.filterToDate = this.toMaxDate;
    this.filterFromDate = new Date(this.filterFromDate.setDate(this.filterFromDate.getDate() - 7))
  }

  ngOnInit(): void {
    this.getDashBoardCount();
    this.filterRecords();

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

  goToAllActiveCourses(){
    this.router.navigate(['admin/all-active-courses'])
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

  filterRecords() {
    this.model = {
      "from_date": this.filterFromDate ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "to_date": this.filterToDate ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    }
    try {
      /**Api For the record filter */
      this.loader.show();
      this.baseService.action('starclass/filter_dashboard/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status === true) {
            this.filteredResponse = res.data.dashboard;
          } else {
            this.loader.hide();
            this.alert.error(res.error.message[0], 'Error');
          }
        }, (error) => {
          this.loader.hide();
        });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }
}
