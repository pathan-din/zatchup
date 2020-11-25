import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface TotalAlumniListElement {

  'SNo': number;
  eiZatchupId : string;
  nameOfSchool : string;
  state : string;
  city : string;
  planTaken : string;
  delhiUniversity : string;
  subscriptionType: string;
  onboardingFeesGross: number;
  onboardingFeesNet: number;
  couponCodeApplied: string;
  transictionId: string;
  Action: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    eiZatchupId: 'ZATCHUP 8535' , 
    nameOfSchool: 'Adarsh Public School', 
    state : 'Delhi', 
    city: 'Delhi',
    planTaken : 'Quarterly', 
    delhiUniversity : 'Delhi University', 
    subscriptionType: 'New', 
    onboardingFeesGross: 100000 ,
    onboardingFeesNet: 100000, 
    couponCodeApplied :'Coupon 7426',
    transictionId: 'TRANSACTION 1122',
    Action: ''
}
  
];

@Component({
  selector: 'app-admin-payment-subscription',
  templateUrl: './admin-payment-subscription.component.html',
  styleUrls: ['./admin-payment-subscription.component.css']
})
export class AdminPaymentSubscriptionComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'eiZatchupId','nameOfSchool', 'state', 'city',
  'planTaken','delhiUniversity','subscriptionType','onboardingFeesGross','onboardingFeesNet',
  'couponCodeApplied', 'transictionId', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  subscriptionHistory(){
    this.router.navigate(['admin/payment-subscription-history'])
  }

  configureSubscription(){
    this.router.navigate(['admin/payment-subscription-configure'])
  }
}
