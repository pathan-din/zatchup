import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface TotalAlumniListElement {

  'SNo': number;
  courseId : string;
  courseTitle : string;
  planDetail: string;
  grossAmount : string;
  couponCode: string;
  netAmount : string;
  couponApplied: string;
  dateOfCourseExpiry: string;
  transActionId: string;
  viewInvoice: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    courseId: 'COURSE 5475', 
    courseTitle : 'B.Com', 
    planDetail :' ',
    grossAmount: '2,000',
    couponCode: 'COUPON 500',
    netAmount : '3,500', 
    couponApplied: '01 June 2020', 
    dateOfCourseExpiry: '30 May 2021',
    transActionId: 'TRANS 8520', 
    viewInvoice: 'View Invoice'
}
  
];

@Component({
  selector: 'app-starclass-buy-history',
  templateUrl: './starclass-buy-history.component.html',
  styleUrls: ['./starclass-buy-history.component.css']
})
export class StarclassBuyHistoryComponent implements OnInit {

  displayedColumns: string[] = ['SNo','courseId', 'courseTitle', 'planDetail',
   'grossAmount', 'couponCode', 'netAmount','couponApplied','dateOfCourseExpiry',
   'transActionId','viewInvoice'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
