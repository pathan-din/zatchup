import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface invoiceListElement {
  position: number;
  details: string;
  amount: string;
  datePurchase: string;
  downloadInvoice: string;
}


const ELEMENT_DATA: invoiceListElement[] = [
  {'position': 1,'details':'', amount : '5,000', 'datePurchase': '01 jan 2020',
  'downloadInvoice': 'Download'}
  ];

@Component({
  selector: 'app-ei-invoice-list',
  templateUrl: './ei-invoice-list.component.html',
  styleUrls: ['./ei-invoice-list.component.css']
})
export class EiInvoiceListComponent implements OnInit {

  displayedColumns: string[] = ['position','details','amount', 'datePurchase','downloadInvoice'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
