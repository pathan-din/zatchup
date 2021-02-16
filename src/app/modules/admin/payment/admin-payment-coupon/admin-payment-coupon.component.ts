import { Location } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Coupon } from '../modal/coupon.modal'
import { BaseService } from 'src/app/services/base/base.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';

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
  discountValue: boolean = false;
  maxDisValidation: boolean = false
  errorDisplay: any = {}
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private spinnerService: NgxSpinnerService,
    private validationService: GenericFormValidationService
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

  goBack() {
    this.location.back();
  }

  addCoupon() {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    if (!this.discountValue) {
      this.spinnerService.show()
      let data = this.couponModal
      this.couponModal.coupon_type = this.couponModal.purpose
      data.enddate = this.datePipe.transform(data.enddate, 'yyyy-MM-dd');
      this.baseService.action('admin/coupon/add_coupon/', data).subscribe(
        (res: any) => {
          this.spinnerService.hide()
          if (res.status == true) {
            this.alert.success(res.message, 'Success')
            this.getCouponCount();
            this.closeModel();
          } else {
            var errorCollection = '';
            errorCollection = this.baseService.getErrorResponse(this.spinnerService, res.error);
            this.alert.error(errorCollection, 'Error')
          }
        }
      ), err => {
        this.spinnerService.hide()
        console.log('err', err)
      }
    }

  }


  keyPressNumbers(event) {
    // debugger
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

  match(event) {
    if (event.target.value > 100 && this.couponModal.discount_type == 'percentage') {
      // console.log('greater than 100')
      this.discountValue = true;
    }
    else
      this.discountValue = false;
    this.isValid()
  }

  isValid() {
    if (this.couponModal.purpose == 'Onboarding Fees')
      this.couponModal.minimum_order_value = 0
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  changeDiscountType() {
    if (this.couponModal.discount_amount > 100 && this.couponModal.discount_type == 'percentage') {
      // console.log('greater than 100')
      this.discountValue = true;
    } else if (this.couponModal.discount_type == 'flat') {
      this.couponModal.maximum_discount_amount = 0
    }

    this.isValid()
  }

  // checkMinimunDiscountVal() {
  //   if (this.couponModal.purpose == 'Subscription Fees' && this.couponModal.discount_amount < this.couponModal.maximum_discount_amount) {
  //     this.maxDisValidation = true
  //   }
  //   else
  //     this.maxDisValidation = false

  //   this.isValid()
  // }

  // changeCouponPurpose() {
  //   this.checkMinimunDiscountVal()
  // }

}
