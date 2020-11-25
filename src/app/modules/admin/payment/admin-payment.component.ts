import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  paymentOnboardingRoute(){
    this.router.navigate(['admin/payment-onboarding'])
  }

  starClassRevenueRoute(){
    this.router.navigate(['admin/payment-starclass-revenue'])
  }

  paymentCommissionsRevenueRoute(){
    this.router.navigate(['admin/payment-commissions-revenue'])
  }

  subscriptionFeeRevenueRoute(){
    this.router.navigate(['admin/payment-subscription-revenue'])
  }
  
  paymentAdvertisementRevenueRoute(){
    this.router.navigate(['admin/payment-advertisement-revenue'])
  }

  couponCodes(){
    this.router.navigate(['admin/payment-coupon-codes'])
  }
}
