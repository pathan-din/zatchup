import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponList } from '../modal/coupon.modal'
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

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
    private alert: NotificationService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.couponList.pageCounts = this.baseService.getCountsOfPage();
    this.couponList.activeParams = this.activeRoute.snapshot.params;
    this.couponList.coupon_status =  this.activeRoute.snapshot.params.coupanType
    if (this.couponList.coupon_status == 'active')
      this.couponList.title = 'Active'
    else
      this.couponList.title = 'Expired'
    this.getCouponList('');
  }


  getCouponList(page: any = '') {
    this.loader.show()
    this.couponList.couponParams = {
      "coupon_status": this.couponList.coupon_status == 'active' ? 'true' : 'false',
      "coupon_type": this.couponList.couponType,
      "page_size": this.couponList.pageSize,
      "page": page
    }

    this.baseService.getData('admin/coupon/get_coupons_list/', this.couponList.couponParams).subscribe(
      (res: any) => {

        if (res.status == true) {
          if (!page)
            page = this.couponList.config.currentPage
          this.couponList.startIndex = res.page_size * (page - 1) + 1;
          this.couponList.config.itemsPerPage = res.page_size;
          this.couponList.pageSize = res.page_size;
          this.couponList.config.currentPage = page
          this.couponList.config.totalItems = res.count
          if (res.results.length > 0)
            this.couponList.dataSource = res.results;
          else
            this.couponList.dataSource = undefined
          this.loader.hide()
        } else {
          this.loader.hide();
          this.alert.error(res.error.message, 'Error');
        }
      }
    ), err => {
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

  goBack() {
    this.location.back();
  }

  expireCoupon(coupon: any): any {
    this.confirmDialogService.confirmThis("Are you sure you want to expire this coupon?", () => {
      this.loader.show()
      let data = {
        "id": coupon.id,
        "coupon_status": false
      }
      this.baseService.action('admin/coupon/edit_coupon/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success("Coupon expired", "Success")
            this.getCouponList(this.couponList.config.currentPage);
          } else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }
}
