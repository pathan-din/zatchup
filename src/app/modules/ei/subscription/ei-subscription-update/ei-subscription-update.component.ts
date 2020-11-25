import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ShareDataService } from '../../services/share-data.service';

@Component({
  selector: 'app-ei-subscription-update',
  templateUrl: './ei-subscription-update.component.html',
  styleUrls: ['./ei-subscription-update.component.css']
})
export class EiSubscriptionUpdateComponent implements OnInit {
  subscriptionList: any;
  subscription: any;
  couponCode: any;
  applyCouponData: any;
  // subscriptionAmount: any;


  constructor(
    private router: Router,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private communicationService: ShareDataService
  ) {

  }

  ngOnInit(): void {
    this.getSubList();
  }

  makePayment() {
    // this.router.navigate(['ei/subscriptionDetails']);
    this.communicationService.changeMessage('Hi comp 1');
  }

  getSubList() {
    this.loader.show();
    this.baseService.getData('ei/subscriptions-list/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.subscriptionList = res.results
        this.loader.hide();
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err.error, 'Error')
    }
  }

  getAmount(subscription: any) {
    this.subscription = subscription
  }

  applyCoupon() {
    this.loader.show();
    let data = {
      "subscription_id": this.subscription.id,
      "coupon_code": this.couponCode
    }
    this.baseService.action('ei/get-subscription-data-after-coupon/', data).subscribe(
      (res: any) => {
        console.log('apply coupon res ::', res)
        if (res.status)
          this.applyCouponData = res.data
        else
          this.alert.error(res.error.message, 'Error')
        this.loader.hide();
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err.error, 'Error')
    }
  }

}
