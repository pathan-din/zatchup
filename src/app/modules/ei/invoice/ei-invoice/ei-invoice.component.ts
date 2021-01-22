import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ei-invoice',
  templateUrl: './ei-invoice.component.html',
  styleUrls: ['./ei-invoice.component.css']
})
export class EiInvoiceComponent implements OnInit {

  constructor(private router: Router) { }
  isCheckSubscription:any=false;
  is_ei_approved:any='0';
  ngOnInit(): void {
    if(localStorage.getItem("is_subscription_active")){
      this.isCheckSubscription = localStorage.getItem("is_subscription_active");
    }
    if(localStorage.getItem("is_ei_approved")){
      this.is_ei_approved = localStorage.getItem("is_ei_approved");
    }
  }
  goToEiInvoiceListPage(invoice: any){
    this.router.navigate(['ei/invoice-list', invoice]);
  }
}
