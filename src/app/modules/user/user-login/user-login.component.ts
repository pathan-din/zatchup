import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';


//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  model: any = {};
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay = '';
  modelForOtpModal: any = {};
  passwordType: any = "password";
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private formValidationService: GenericFormValidationService,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  goToSignUpPage() {
    this.router.navigate(['user/signup']);
  }

  doLogin() {
    let data: any = {};
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);

    if (this.errorDisplay.valid) {
      return false;
    }
    data.username = this.model.username;
    data.password = this.model.password;
    try {
      this.loader.show();
      this.baseService.action('user/login/', data).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == "True") {
            this.registerUserToFirebaseDB(res.data)
            $("#OTPModel").modal({
              backdrop: 'static',
              keyboard: false
            });
          } else {
            this.loader.hide();
            var error = this.baseService.getErrorResponse(this.loader, res.error)
            this.alert.error(error, 'Error')
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.statusText, 'Error')

        });
    } catch (err) {
      this.loader.hide();
      this.alert.error("Something went wrong please contact administrator!", "Error");
    }


  }
  viewPassword() {
    if (this.passwordType == 'password') {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }

  resendOtp() {
    try {
      this.modelForOtpModal.username = this.model.username;
      this.loader.show();
      this.baseService.action('user/resend-otp/', this.modelForOtpModal).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.alert.success("OTP Resend On Your Register Mobile Number Or Email-Id.", "Success")
          } else {
            this.errorOtpModelDisplay = res.error;
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }

  changeInput($ev) {
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }
  }

  goToDashboard() {
    var flagRequired = true;
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
    if (flagRequired == false) {
      this.error.push("Please enter OTP!");
    }
    if (this.error.length > 0) {
      this.errorOtpModelDisplay = this.error.join('\n');
      return;
    }
    try {
      let data: any = {};
      data.username = this.model.username;
      data.phone_otp = this.model.otp1 + this.model.otp2 + this.model.otp3 + this.model.otp4;
      if(localStorage.getItem('fbtoken'))
      {
        data.firebase_id=localStorage.getItem('fbtoken');
      }
      this.baseService.action('user/verify-otp/', data).subscribe(
        (res: any) => {
          if (res.status == "True") {
            this.updateUserWithFirebaseID();
            localStorage.setItem("token", res.token);
            localStorage.setItem("approved", res.approved);
            $("#OTPModel").modal('hide');
            if (res.steps == 1) {
              this.router.navigate(['user/kyc-verification']);
            } else if (res.steps >= 2 && res.steps < 5) {
              this.router.navigate(['user/add-ei']);
            } else if (res.steps == 5) {
              this.router.navigate(['user/ei-confirmation']);
            } else if (res.steps == 6) {
              this.router.navigate(['user/add-personal-info']);
            } else {
              this.router.navigate(['user/my-school']);
            }

          } else {
            this.errorOtpModelDisplay = res.error;
          }
        }, (error) => {
          console.log(error);

        });
    } catch (err) {
      console.log("vaeryfy Otp Exception", err);
    }
  }


  goTouserForgotPasswordPage() {
    this.router.navigate(['user/forgot-password']);
  }

  isPhoneNumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }

  registerUserToFirebaseDB(data: any) {
    let email = this.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
    var that = this;
    this.afAuth.fetchSignInMethodsForEmail(email)
      .then(function (signInMethods) {
        if (signInMethods.length > 0) {
          console.log("yes", signInMethods);
        }
        else {
          that.firebaseService.firebaseSignUp(email, email, email, that.model.password, '', "1").then(
            (res: any) => {
              localStorage.setItem('fbtoken', res.user.uid);
            },
            err => {
            }
          )
        }
      })
  }

  getUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('user...',user)
        // this.user = user;
        // localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        // localStorage.setItem('user', null);
      }
    })
  }

  async updateUserWithFirebaseID() {
    var result = await this.afAuth.signInWithEmailAndPassword(this.model.username, this.model.password);
    localStorage.setItem('fbtoken', result.user.uid);
  }
}

