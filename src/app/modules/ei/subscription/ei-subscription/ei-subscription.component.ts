import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-subscription',
  templateUrl: './ei-subscription.component.html',
  styleUrls: ['./ei-subscription.component.css']
})
export class EiSubscriptionComponent implements OnInit {
  subscriptionDetails: any;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSubscriptionDetail()
  }

  renewSubscription() {
    this.router.navigate(['ei/add-subscription']);
  }
  updateSubscription() { }

  getSubscriptionDetail() {
    this.loader.show();
    this.baseService.getData('ei/get-subscription-detail/').subscribe(
      (res: any) => {
        if (res.status == true)
          this.subscriptionDetails = res.data;
        if (!this.subscriptionDetails.is_activate_subscription)
          this.renewSubscription()
        this.loader.hide();
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err.error, 'Error')
    }
  }
}
