import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CurrentPocDetails, PastPocDetails} from '../modals/education-institute.modal';
// export interface PeriodicElement {
//   position: number;
//   fromDate: string;
//   toDate: string;
//   employeeId: string;
//   name: string;
//   mobileNumber: string;
//   emailAddress: string;
//   addedByEmployeeId: string;
//   addedByemployeeName: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {'position': 1,'fromDate':'01 Jan 2020', 'toDate': '01 Dec 2020', 'employeeId': 'Employee 5052',
//   'name': 'Ankit', 'mobileNumber':'91+ 9876543210','emailAddress': 'ankit@gmail.com',
//   'addedByEmployeeId': 'Employee 5252', 'addedByemployeeName' : 'Prashant'}
// ];

@Component({
  selector: 'app-current-poc',
  templateUrl: './current-poc.component.html',
  styleUrls: ['./current-poc.component.css']
})

export class CurrentPocComponent implements OnInit {
  pastPocDetails: PastPocDetails;
  currentPocDetails: CurrentPocDetails
  dataSource: any;
  ei_id: any;
  response: any;
  filterFromDate: any;
  filterToDate: any;
  maxDate: Date;
  // currentPocDetails:any;
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe
    ) { 
      this.currentPocDetails = new CurrentPocDetails
      this.pastPocDetails = new PastPocDetails;
      this.maxDate = new Date();
    }

  ngOnInit(): void {
     this.ei_id = this.route.snapshot.params.ei_id;
     this.getCurrentPocDetails();
    this.getPastPocDetails();
  }

  getPastPocDetails(page? : any){
    this.loader.show();

    this.pastPocDetails.params = {
      'page' : page ,
      'page_size': this.pastPocDetails.page_size,
      'ei_id': this.ei_id,
      'start_date': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      'end_date': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
    }
    this.baseService.getData('admin/get_poc_details_history_based_on_ei/', this.pastPocDetails.params).subscribe(
      (res : any) =>{
        if(res.status == true){
          if(!page)
          page = this.pastPocDetails.config.currentPage
          this.pastPocDetails.startIndex = res.page_size * (page - 1) + 1;
          this.pastPocDetails.page_size = res.page_size
          this.pastPocDetails.config.itemsPerPage = this.pastPocDetails.page_size
          this.pastPocDetails.config.itemsPerPage = page
          this.pastPocDetails.config.totalItems = res.count;
          if(res.count > 0){
            this.pastPocDetails.dataSource = res.results
            this.pastPocDetails.pageCounts = this.baseService.getCountsOfPage()
          }
          else{
            this.pastPocDetails.dataSource = undefined;
            this.pastPocDetails.pageCounts =undefined;
          }
        } else{
          this.loader.hide();
          this.alert.error(res.error.message, 'Error')
        }
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  getCurrentPocDetails(){
    this.loader.show();
    this.currentPocDetails.params ={
      'ei_id': this.ei_id
    }
    this.baseService.getData('admin/get_poc_details_based_on_ei/', this.currentPocDetails.params).subscribe(
      (res: any) => {
        if(res.status == true)
        this.currentPocDetails.response = res.data
        else{
          this.loader.hide();
          this.alert.error(res.error.message, 'Error')
        }
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
  goBack(){
    this.location.back()
  }
}
