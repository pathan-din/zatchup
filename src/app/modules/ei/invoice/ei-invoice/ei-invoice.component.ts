import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ei-invoice',
  templateUrl: './ei-invoice.component.html',
  styleUrls: ['./ei-invoice.component.css']
})
export class EiInvoiceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToEiInvoiceListPage(){
    this.router.navigate(['ei/invoiceList']);
  }
}
