import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfInvoice: string;
  uploadDate: string;
  transactionId: string;
  amount: string;
  viewInvoice: string;
  downloadInvoice: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'dateOfInvoice':'15 June, 2020', 'uploadDate' : '15 June, 2020',
   'transactionId':'TRANSACTION 9578', 'amount': '1,000', 'viewInvoice': 'View',
  'downloadInvoice': 'View Invoice'}
];

@Component({
  selector: 'app-management-commission-invoices',
  templateUrl: './management-commission-invoices.component.html',
  styleUrls: ['./management-commission-invoices.component.css']
})
export class ManagementCommissionInvoicesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'dateOfInvoice', 'uploadDate', 'transactionId',
   'amount','viewInvoice', 'downloadInvoice',];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}