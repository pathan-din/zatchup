import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  clientDetails: string;
  AdvertisementID: string;
  numberofClicksBought: number;
  netAdvertisementFees: number;
  grossAdvertisementFees: number;
  couponCodeApplied: string;
  transactionId: string;
  viewInvoice: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'clientDetails':'', AdvertisementID : 'ADVER 32564',
   'numberofClicksBought': 1000, 'netAdvertisementFees': 10000,'grossAdvertisementFees': 15000, 
   'couponCodeApplied': 'COUPON 5000', 'transactionId':'TRANSACTION 1122', viewInvoice:"View Invoice"}
  
];

@Component({
  selector: 'app-admin-payment-advertisement',
  templateUrl: './admin-payment-advertisement.component.html',
  styleUrls: ['./admin-payment-advertisement.component.css']
})
export class AdminPaymentAdvertisementComponent implements OnInit {

  displayedColumns: string[] = ['position','AdvertisementID','clientDetails', 'numberofClicksBought',
  'netAdvertisementFees','grossAdvertisementFees', 'couponCodeApplied','transactionId','viewInvoice'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
