import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfSubscription: string;
  planDetails: string;
  grossAmount: string;
  couponCode: string;
  netAmount: string;
  dateOfSubscriptionExpiry: string;
  transactionId: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'dateOfSubscription': '01 June, 2020', 'planDetails' : '', 
  'grossAmount':'2,000', 'couponCode': 'COUPON 500', 'netAmount': '3,500', 
  'dateOfSubscriptionExpiry': '30 May 2021', 'transactionId': 'Trans 8520', 'action': ''}
];

@Component({
  selector: 'app-subscription-plan-history',
  templateUrl: './subscription-plan-history.component.html',
  styleUrls: ['./subscription-plan-history.component.css']
})
export class SubscriptionPlanHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'dateOfSubscription', 'planDetails', 'grossAmount', 
   'couponCode','netAmount', 'dateOfSubscriptionExpiry', 'transactionId', 'action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {}

}
