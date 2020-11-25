import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfInvice: string;
  detailsofEi: string;
  amount: number;
  transactionId: string;
  viewInvoice: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'dateOfInvice':'10 June 2020', detailsofEi : 'ZATCHUP 3214',
   'amount': 100000,  'transactionId':'TRANSACTION 1122', viewInvoice:"View Invoice"}
];

@Component({
  selector: 'app-admin-payment-commissions',
  templateUrl: './admin-payment-commissions.component.html',
  styleUrls: ['./admin-payment-commissions.component.css']
})
export class AdminPaymentCommissionsComponent implements OnInit {

  displayedColumns: string[] = ['position','dateOfInvice','detailsofEi', 
  'amount','transactionId','viewInvoice'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
