import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UsersServiceService } from 'src/app/services/user/users-service.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-ei-otp-verification',
  templateUrl: './ei-otp-verification.component.html',
  styleUrls: ['./ei-otp-verification.component.css']
})
export class EiOtpVerificationComponent implements OnInit {
  model: any = {};
  errorOtpModelDisplay: any;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;
  otp7: any;
  otp8: any;
  error: any = [];
  errorDisplay: any = {};
  modelForOtpModal: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private userService: UsersServiceService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private baseService: BaseService) { }


  ngOnInit(): void {
    if (this.baseService.username && this.baseService.password) {
      this.model.username = this.baseService.username;
      this.model.password = this.baseService.password;
    } else {
      localStorage.clear();
      this.router.navigate(['ei/login']);
    }

  }

  goToCreateNewPasswordPage() {
    this.router.navigate(['ei/create-new-password']);
  }
  changeInput($ev) {
    console.log($ev);
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }

  }
  resendOtp() {
    try {
      console.log(this.model.username);
      this.modelForOtpModal.username = this.model.username;
      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.SpinnerService.show();
      this.userService.resendOtpViaRegister(this.modelForOtpModal).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.alert.success("OTP Resend On Your Register Mobile Number Or Email-Id.", "Success")
        } else {
          this.errorOtpModelDisplay = response.error;
          this.alert.success(this.errorOtpModelDisplay, "Error")
          //alert(response.error)
        }
      }, (error) => {
        this.SpinnerService.hide();
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("verify Otp Exception", err);
    }
  }
  goToOtpVerification() {

    var flagRequired = true;
    this.errorOtpModelDisplay = '';
    this.error = [];
    if (!this.otp1) {
      flagRequired = false;
    } else if (!this.otp2) {
      flagRequired = false;
    } else if (!this.otp3) {
      flagRequired = false;
    }
    else if (!this.otp4) {
      flagRequired = false;
    }
    //  if(!this.otp5)
    //  {
    //    flagRequired=false;
    //  }else if(!this.otp6)
    //  {
    //    flagRequired=false;
    //  }else if(!this.otp7)
    //  {
    //    flagRequired=false;
    //  }
    //  else if(!this.otp8)
    //  {
    //    flagRequired=false;
    //  }
    if (flagRequired == false) {
      this.error.push("Please enter OTP!");
    }
    if (this.error.length > 0) {
      this.errorOtpModelDisplay = this.error.join('\n');
      return;
    }
    try {
      let data: any = {};
      data.email = this.model.username;
      data.phone_otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
      if (localStorage.getItem("fbtoken")) {
        data.firebase_id = localStorage.getItem("fbtoken")
      }
      this.SpinnerService.show();
      this.eiService.verifyOtp(data).subscribe(async res => {
        let response: any = {}
        response = res;


        if (response.status == true) {
          this.SpinnerService.hide();
          //$("#OTPModel").modal('hide');

          var result = await this.afAuth.signInWithEmailAndPassword(this.model.username, this.model.password);
          console.log(result.user.uid);

          localStorage.setItem('fbtoken', result.user.uid);
          // localStorage.setItem("user_id",response.user_id)
          localStorage.setItem("token", response.token);
          //  if(response.reg_steps===null)
          //  {
          //     this.router.navigate(['ei/payment']);
          //  }else if(response.reg_steps==="1")
          //  {
          //     this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '1' } });
          //  }else if(response.reg_steps==="2")
          //  {
          //     this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '2' } });
          //  }else if(response.reg_steps==="3")
          //  {
          //     this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '3' } });
          //  }else if(response.reg_steps==="4")
          //  {
          //     this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '4' } });
          //  }else{
          //     this.router.navigate(['ei/dashboard']);
          //  }		   
          this.router.navigate(['ei/dashboard']);
        } else {
          this.SpinnerService.hide();
          //this.errorOtpModelDisplay=response.error;
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        this.alert.error(error, 'Error')

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("verify Otp Exception", err);
      this.alert.error(err, 'Error')
    }

  }
}
