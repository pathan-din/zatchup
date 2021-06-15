import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CartList } from '../../registration/modal/contact-us.mdal';
import { environment } from 'src/environments/environment';
declare var Razorpay: any

@Component({
  selector: 'app-ei-starclass-cart',
  templateUrl: './ei-starclass-cart.component.html',
  styleUrls: ['./ei-starclass-cart.component.css']
})
export class EiStarclassCartComponent implements OnInit {
  @ViewChild('closePaymentModel') closePaymentModel: any;
  cartList: CartList
  model: any = {};
  message: any = {};
  paymentDetails: any;
  coupon: any;
  params: { coupon: any; };
  totalAmount: any;
  discountAmount: any;
  payableAmount: any = {};
  paymentHtml: any;
  public env: any = environment;
  price: string;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router
  ) {
    this.cartList = new CartList()
  }

  ngOnInit(): void {
    this.getCartList();
    this.getPaymentDetails()
  }

  getCartList() {
    try {
      this.loader.show()
      this.baseService.getData('starclass/cart-list/').subscribe(
        (res: any) => {
          if (res.status == true) {

            if (res.count == 0)
              this.cartList.data = undefined
            else
              this.cartList.data = res.results;
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ), err => {
        this.alert.error("Please try again",'Error')
        this.loader.hide()
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  deleteCartItem(id) {
    try {
      this.loader.show()
      this.model = {
        'id': id
      }
      this.message = 'Are you sure you want to delete this Item ?'
      this.confirmDialogService.confirmThis(this.message, () => {
        this.baseService.action('starclass/cart-delete/', this.model).subscribe(
          (res: any) => {
            if (res.status == true) {
              this.alert.success(res.message, 'Success')
              this.getCartList()
              // delete this.payableAmount.finalAmount
              this.getPaymentDetails()
            }
            else {
              this.alert.error(res.error.message, 'Error')
            }
            this.loader.hide()
          }
        ), err => {
          this.alert.error("Please try again",'Error')
          this.loader.hide()
        }
      }, () => {
      });

    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  getPaymentDetails(){
    
    try {
      this.loader.hide()
      this.baseService.getData('starclass/cart-totalamount/').subscribe(
        (res: any) => {
         
          
          this.payableAmount = {}
          if(res.status == true){
            this.paymentDetails = res.data;
            this.payableAmount.totalAmount = res.total_amount
            this.payableAmount.discountAmount = res.discount_amount
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }), 
        err => {
          this.alert.error("Please try again",'Error')
          this.loader.hide()
        }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  applyCoupon(){
    try {
      this.loader.hide()
      this.params = {
        'coupon' : this.coupon
      }
      console.log('model', this.params);
      if(!this.coupon){
        this.getPaymentDetails()
        return
      }
      
      this.baseService.action('starclass/cart-totalamount/', this.params).subscribe(
        (res:any) => {
          if(res.status == true){
            console.log(res, 'res....');
            this.payableAmount = {}
            this.payableAmount.totalAmount = res.data.total_amount
            this.payableAmount.discountAmount = res.data.discount_amount
            this.payableAmount.finalAmount = res.data.final_amount
            this.alert.success(res.message, 'Success')
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ), err => {
        this.alert.error("Please try again",'Error')
        this.loader.hide()
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  requestForTheRazorPayment(code, buttonClick) {
    //Display Loader Before Request of the service  
    this.loader.show();
    let data = {
     product :  this.cartList.data,
     "coupon_code": code,
      "coupon_type": this.coupon,
      "final_amount": this.payableAmount.finalAmount,
      "total_amount": this.payableAmount.totalAmount
    }
    this.baseService.action('starclass/starclass-payment-process/', data).subscribe(
      (res: any) => {
        this.loader.hide();
        if (res.status === true)// Condition True Success 
        {
          console.log(res, 'response....');
          if (buttonClick) {
            var that = this;
            var options = {
              "key": this.env.razorApiKey,
              "currency": "INR",
              "amount": parseInt(this.price) * 100,
              "description": "",
              "order_id": res.order_id,
              "prefill": {
                "name": res.name,
                "email": res.email
              },
              "handler": function (res) {
                if (res.razorpay_payment_id) {
                  that.closePaymentModel.nativeElement.click()
                  window.location.href = '#/ei/star-class';
                  window.location.reload();
                }
              },
              "notes": {
                "address": ""
              }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
          }

        } else {
          this.alert.error(res.error.message[0], "Error")
        }
        this.loader.hide();
      }, (error) => {
        this.alert.error("Please try again",'Error')
        this.loader.hide();
      });
  }

  goToStarClassDashboard() {
    this.router.navigate(['ei/star-class'])
  }

  goBack() {
    this.router.navigate(['ei/star-class'])
  }
}
