import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-ei-otp-verification',
  templateUrl: './ei-otp-verification.component.html',
  styleUrls: ['./ei-otp-verification.component.css']
})
export class EiOtpVerificationComponent implements OnInit {
  @ViewChild('otp1') otp1: ElementRef;
  @ViewChild('otp2') otp2: ElementRef;
  @ViewChild('otp3') otp3: ElementRef;
  @ViewChild('otp4') otp4: ElementRef;
  model: any = {};
  errorOtpModelDisplay: any;
  // otp1: any;
  // otp2: any;
  // otp3: any;
  // otp4: any;
  error: any = [];
  errorDisplay: any = {};
  modelForOtpModal: any = {};

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) { }


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
    
    if ($ev.target.value.length == $ev.target.maxLength && $ev.keyCode!=8 && $ev.target.name!='otp4') {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }else{
      
      if($ev.keyCode==8){
        if($ev.target.name=='otp4'){
          this.otp3.nativeElement.focus()
        }else if($ev.target.name=='otp3'){
          this.otp2.nativeElement.focus()
        }else if($ev.target.name=='otp2'){
          this.otp1.nativeElement.focus()
        }
      }
       
    }
  }
  resendOtp() {
    try {
      this.loader.show();
      this.modelForOtpModal.username = this.model.username;
      this.baseService.action('user/resend-otp/', this.modelForOtpModal).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.alert.success("OTP Resend On Your Register Mobile Number Or Email-Id.", "Success")
          } else {
            this.errorOtpModelDisplay = res.error;
            this.alert.success(this.errorOtpModelDisplay, "Error")
          }
        }, (error) => {
          this.loader.hide();

        });
    } catch (err) {
      this.loader.hide();
    }
  }
  goToOtpVerification() {

    var flagRequired = true;
    console.log(flagRequired);
    
    this.errorOtpModelDisplay = '';
    this.error = [];
    if (!this.model.otp1) {
      flagRequired = false;
    } else if (!this.model.otp2) {
      flagRequired = false;
    } else if (!this.model.otp3) {
      flagRequired = false;
    }
    else if (!this.model.otp4) {
      flagRequired = false;
    }
    console.log(flagRequired);
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
      data.phone_otp = this.model.otp1 + this.model.otp2 + this.model.otp3 + this.model.otp4;
      if (localStorage.getItem("fbtoken")) {
        data.firebase_id = localStorage.getItem("fbtoken")
      }
      data.phone_otp = this.model.otp1 + this.model.otp2 + this.model.otp3 + this.model.otp4;
      this.loader.show();
      this.baseService.action('ei/verify-otp/', data).subscribe(async res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.loader.hide();
          if (response.all_data.reason_reject && !response.all_data.approved) {
            localStorage.clear();
            var msg='Your School with ZatchUp ID '+response.all_data.zatchupId+' is rejected with comments '+response.all_data.reason_reject+'. Please refer to your email for further details.'
            this.alert.info(msg, "Reason");
            this.router.navigate(['ei/login']);
          }else{
            let email = this.baseService.firebase_username;
            var result = await this.afAuth.signInWithEmailAndPassword(email, this.model.password);
            localStorage.setItem('fbtoken', result.user.uid);
            localStorage.setItem("token", response.token);
            this.firebaseService.setPresence('online')
            this.router.navigate(['ei/dashboard']);
          }
          
        } else {
          this.loader.hide();
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.loader.hide();
        this.alert.error(error, 'Error')

      });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }

  }
}
