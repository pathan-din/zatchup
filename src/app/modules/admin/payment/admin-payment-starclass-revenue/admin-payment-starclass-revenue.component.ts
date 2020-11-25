import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface TotalAlumniListElement {

  'SNo': number;
  detailOfEi : string;
  detailsofCourse : string;
  CourseFeesGross: number;
  CourseFeesNet: number;
  couponCodeApplied: string;
  transictionId: string;
  Action: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    detailOfEi: 'ZATCHUP 3214' , 
    detailsofCourse: ' ', 
    CourseFeesGross: 100000 ,
    CourseFeesNet: 100000, 
    couponCodeApplied :'Coupon 7426',
    transictionId: 'TRANSACTION 1122',
    Action: ''
}
  
];

@Component({
  selector: 'app-admin-payment-starclass-revenue',
  templateUrl: './admin-payment-starclass-revenue.component.html',
  styleUrls: ['./admin-payment-starclass-revenue.component.css']
})
export class AdminPaymentStarclassRevenueComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'detailOfEi','detailsofCourse','CourseFeesGross','CourseFeesNet',
  'couponCodeApplied', 'transictionId', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
