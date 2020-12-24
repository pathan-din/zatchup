import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponList } from '../modal/coupon.modal'
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-payment-coupon-status',
  templateUrl: './admin-payment-coupon-status.component.html',
  styleUrls: ['./admin-payment-coupon-status.component.css']
})
export class AdminPaymentCouponStatusComponent implements OnInit {
  couponList = new CouponList()

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.couponList.activeParams = this.activeRoute.snapshot.params;
    if (this.couponList.activeParams.coupanType == 'active')
      this.couponList.title = 'Active'
    else
      this.couponList.title = 'Expired'
    this.getCouponList('');
  }


  getCouponList(page: any = '') {
    this.loader.show()
    this.couponList.couponParams = {
      "coupon_status": this.couponList.activeParams.coupanType == 'active' ? 'true' : 'false',
      "page_size": this.couponList.pageSize ? this.couponList.pageSize : 5,
      "page": page ? page : 1
    }

    this.baseService.getData('admin/coupon/get_coupons_list/', this.couponList.couponParams).subscribe(
      (res: any) => {

        if (res.status == true && res.count != 0) {
          if (!page)
            page = this.couponList.config.currentPage
          this.couponList.startIndex = res.page_size * (page - 1) + 1;
          this.couponList.config.itemsPerPage = res.page_size
          this.couponList.config.currentPage = page
          this.couponList.config.totalItems = res.count
          this.couponList.dataSource = res.results;
          this.loader.hide()
        }else{
          this.loader.hide();
          this.alert.error(res.error.message, 'Error');
        }
      }
    ),err =>{
      this.loader.hide();
      this.alert.error(err, 'Error');
    }
  }

  generateExvel() {
    let data = {
      "coupon_status": this.couponList.activeParams.coupanType == 'active' ? 'true' : 'false',
      "expired_coupon": this.couponList.activeParams.coupanType == 'active' ? 'true' : 'false',
      "export_csv": true
    }

    this.baseService.generateExcel('admin/coupon/export_coupons_list/', 'coupons', data);
  }

  goBack(){
    this.location.back();
  }
}
