import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  schoolName: string;
  zatchUpID: string;
  state: string;
  city: string;
  address: string;
  board: string;
  plan: string;
  grossSubscriptionFees: string;
  netSubscriptionFees: string;
  appliedCouponCode: string;
  action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'schoolName':'Adarsh Public School', zatchUpID : 'ZATCHUP 5025', 'state': 'Delhi',
  'city': 'Delhi','address': 'H-147, Noida Sector-63, U.p-201010', 'board': 'ABC University','plan':'Plan 1',
  'grossSubscriptionFees': '6,000','netSubscriptionFees': '5,000', 'appliedCouponCode': 'COUPON 500',action:"View Invoice"}
  
  
];

@Component({
  selector: 'app-admin-ei-management-fees-subscription',
  templateUrl: './admin-ei-management-fees-subscription.component.html',
  styleUrls: ['./admin-ei-management-fees-subscription.component.css']
})
export class AdminEiManagementFeesSubscriptionComponent implements OnInit {

  displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city','address',  'board','plan','grossSubscriptionFees',
  'netSubscriptionFees','appliedCouponCode','action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
