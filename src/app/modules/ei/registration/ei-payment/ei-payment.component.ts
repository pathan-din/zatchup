import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

declare var Razorpay: any
@Component({
  selector: 'app-ei-payment',
  templateUrl: './ei-payment.component.html',
  styleUrls: ['./ei-payment.component.css']
})
export class EiPaymentComponent implements OnInit {
  model: any = {};
  errorDisplay: any;
  error: any
  paymentHtml: any;
  selectedMessage: any;

  constructor(
    private router: Router,
    private genericFormValidationService: GenericFormValidationService,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService
  ) { }


  ngOnInit(): void {
    this.model.coupon_code = '';
    // if(localStorage.getItem('user_id'))
    // this.model.user_id=localStorage.getItem('user_id');
    this.requestForSubscriptionCharges(this.model);
  }


  /*************Razor Pay For Payment***************/

  razorPayPament() {
    //check validation for using form
    try {
      this.requestForTheRazorPayment(this.model, true);
    } catch (e) {
      console.log(e);

    }


  }
  /********************End Razor Pay****************/
  //
  requestForTheRazorPayment(data, buttonClick) {
    //Display Loader Before Request of the service  
    this.SpinnerService.show();
    this.eiService.requestForRazorPament(data).subscribe(res => {

      let response: any = {};
      response = res;
      //Hide Loader after success response
      this.SpinnerService.hide();
      var that = this;
      if (response.status === true)// Condition True Success 
      {
        let res: any = response;
        //Get Payment Price From Api Object
        this.paymentHtml = '';
        if(response.discount_amount!=0){
          this.paymentHtml += '<div class="row"><div class="col-md-7 pr-0">Price:</div> <div class="col-md-5 pr-0 text-left color-purple">&#8377; <del>' + response.original_price + '</del></div></div>';
        }else{
          this.paymentHtml += '<div class="row"><div class="col-md-7 pr-0">Price:</div> <div class="col-md-5 pr-0 text-left color-purple">&#8377; ' + response.original_price + '</div></div>';
        }
        
        this.paymentHtml += '<div class="row"><div class="col-md-7 pr-0">Discount:</div> <div class="col-md-5 pr-0 text-left color-purple">&#8377; ' + response.discount_amount + '</div></div>';
        this.paymentHtml += '<div class="row"><div class="col-md-7 pr-0">Net Price: </div> <div class="col-md-5 pr-0 text-left color-purple">&#8377;' + response.price + '</div></div>';

        if (buttonClick) {
          var that = this;
          var options = {
            "key": this.eiService.razorApiKey,
            "amount": response.price * 100, // 2000 paise = INR 20

            //"name": "Rohin Gupta",
            "description": "",

            //"image": "./assets/images/userWebsite/zu-icon.png",
            "handler": function (response) {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              //  let data:any={};
              //  data.user_id=localStorage.getItem("user_id");
              //  data.razorpay_payment_id=response.razorpay_payment_id;
              //  data.razorpay_order_id=response.razorpay_order_id;
              //  data.razorpay_signature=response.razorpay_signature;

              //var getResponse=that.getSuccessAfterRazorPayment(data);
              // console.log(getResponse);
              if (response.razorpay_payment_id) {
                window.location.href = '#/ei/onboarding-process';
                //that.router.navigate(['ei/onboarding-process']); 


              }

            },
            "order_id": response.order_id,
            "prefill": {
              "name": response.name,
              "email": response.email
            },
            "notes": {
              "address": ""
            }
            // ,
            // "theme": {
            //     "color": "#FFFFFF"
            // }
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
        }

      } else { // Condition False Validation failure
        // var getServerErrorCollection = this.eiService.getErrorResponse(this.SpinnerService, response.error)
        // alert(getServerErrorCollection);
        this.SpinnerService.hide();
        this.alert.error(response.error.message[0], 'Error')
      }

      /*End else*/
      //this.router.navigate(['user/signup']);
    }, (error) => {
      this.SpinnerService.hide();
      //use this condition for the globally Set boolean checkErrorFlagForAllConsole
      if (this.eiService.checkErrorFlagForAllConsole) {
        this.alert.error(error, 'Error')
      }
    });
  }

  requestForSubscriptionCharges(data) {
    //Display Loader Before Request of the service  
    this.SpinnerService.show();
    this.eiService.requestForSubscriptionCharges(data).subscribe(res => {

      let response: any = {};
      response = res;
      //Hide Loader after success response
      this.SpinnerService.hide();
      if (response.status === true)// Condition True Success 
      {
        let res: any = response;
        //Get Payment Price From Api Object
        this.paymentHtml = '';
        this.paymentHtml += '<div class="row"><div class="col-md-7 pr-0">Price:</div> <div class="col-md-5 pr-0 text-left color-purple">&#8377; ' + response.original_price + '</div></div>';
        this.paymentHtml += '<div class="row"><div class="col-md-7 pr-0">Discount:</div> <div class="col-md-5 pr-0 text-left color-purple">&#8377; ' + response.discount_amount + '</div></div>';
        this.paymentHtml += '<div class="row"><div class="col-md-7 pr-0">Net Price: </div> <div class="col-md-5 pr-0 text-left color-purple">&#8377;' + response.price + '</div></div>';


      } else { // Condition False Validation failure
        // var getServerErrorCollection = this.eiService.getErrorResponse(this.SpinnerService, response.error)
        // alert(getServerErrorCollection);
        this.SpinnerService.hide();
        this.alert.error(response.error.message[0], 'Error')
      }

      /*End else*/
      //this.router.navigate(['user/signup']);
    }, (error) => {
      this.SpinnerService.hide();
      //use this condition for the globally Set boolean checkErrorFlagForAllConsole
      if (this.eiService.checkErrorFlagForAllConsole) {
        this.alert.error(error, 'Error')
      }
    });
  }
  /**
   * Function name : getSuccessAfterRazorPayment
   * Parameter : Razor Payment id ,order id,signature
   * request : object
   * response : object
   */
  getSuccessAfterRazorPayment(data) {
    //Display Loader Before Request of the service  
    this.SpinnerService.show();
    this.eiService.requestForRazorPamentAfterAction(data).subscribe(res => {

      let response: any = {};
      response = res;
      //Hide Loader after success response
      this.SpinnerService.hide();
      if (response.status === true)// Condition True Success 
      {
        if (response.razorpay_payment_id) {
          this.router.navigate(['ei/onboarding-process']);
        }


      } else { // Condition False Validation failure
        // var getServerErrorCollection = this.eiService.getErrorResponse(this.SpinnerService, response.error)
        // alert(getServerErrorCollection);
        this.SpinnerService.hide();
        this.alert.error(response.error.message[0], 'Error')
      }

      /*End else*/

    }, (error) => {
      this.SpinnerService.hide();
      //use this condition for the globally Set boolean checkErrorFlagForAllConsole
      if (this.eiService.checkErrorFlagForAllConsole) {
        this.SpinnerService.hide();
        this.alert.error(error, 'Error')
      }
    });
  }
  goToEiChequeDetailsPage() {
    this.router.navigate(['ei/cheque-details']);
  }

  goToEiCourierDetailsPage() {
    this.requestForTheRazorPayment(this.model, false)
    // this.router.navigate(['ei/courier-details']);
  }
}
