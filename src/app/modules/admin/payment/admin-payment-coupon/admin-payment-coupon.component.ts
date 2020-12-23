import { Location } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Coupon } from '../modal/coupon.modal'
import { BaseService } from 'src/app/services/base/base.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-payment-coupon',
  templateUrl: './admin-payment-coupon.component.html',
  styleUrls: ['./admin-payment-coupon.component.css']
})
export class AdminPaymentCouponComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  coupons: any;
  couponTypes: any;
  couponModal = new Coupon();
  minDate: Date;
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private location: Location,
    private baseService: BaseService,
    private spinnerService: NgxSpinnerService
  ) {
    this.minDate = new Date()
  }

  ngOnInit() {
    this.getCouponCount();
  }

  couponStatus(type) {
    this.router.navigate(['admin/payment-coupon-status', type])
  }

  getCouponCount() {
    this.baseService.getData('admin/coupon/get_coupons_counts/').subscribe(
      (res: any) => {
        if (res.status == true)
          this.coupons = res.data
        else
          this.coupons = undefined
      }
    )
  }

  goBack(){
    this.location.back();
  }

  addCoupon() {
    this.spinnerService.show()
    let data = this.couponModal
    this.couponModal.coupon_type = this.couponModal.purpose
    data.enddate = this.datePipe.transform(data.enddate, 'yyyy-MM-dd');
    this.baseService.action('admin/coupon/add_coupon/', data).subscribe(
      (res: any) => {
        this.spinnerService.hide()
        if (res.status == true) {
          this.getCouponCount();
          this.closeModel();
        }else{
          var errorCollection = '';
          errorCollection = this.baseService.getErrorResponse(this.spinnerService, res.error);
          alert(errorCollection);
        }
      }
    ),err =>{
      this.spinnerService.hide()
      console.log('err',err)
    }
  }


  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  closeModel() {
    this.closebutton.nativeElement.click()
  }

}
