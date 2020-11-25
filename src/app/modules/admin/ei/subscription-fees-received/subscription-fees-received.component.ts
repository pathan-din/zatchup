import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  zatchupId: string;
  nameOfTheschool: string;
  state: string;
  city: string;
  address: string;
  boardUniversity: string;
  planTaken: string;
  subscriptionFeesGross: string;
  subscriptionFeesNet: string;
  couponCodeApplied: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position':1, 'zatchupId':'ZATCHUP 5475', 'nameOfTheschool':'Adarsh Public School', 'state':'Delhi',
  'city':'Delhi', 'address':'H-147, Noida sec-63, U.P-201301', 
  'boardUniversity': 'ABC University', 'planTaken': 'Plan1', 'subscriptionFeesGross': '6,000',
  'subscriptionFeesNet': '5,000', 'couponCodeApplied': 'COUPON 500', 'action': ''}
];

@Component({
  selector: 'app-subscription-fees-received',
  templateUrl: './subscription-fees-received.component.html',
  styleUrls: ['./subscription-fees-received.component.css']
})
export class SubscriptionFeesReceivedComponent implements OnInit {

  displayedColumns: string[] = ['position', 'zatchupId', 'nameOfTheschool', 'state','city', 
  'address', 'boardUniversity', 'planTaken', 'subscriptionFeesGross', 'subscriptionFeesNet',
  'couponCodeApplied', 'action'];

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
