import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
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
  firebaseemail: any = '';
  constructor(
    private router: Router,
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private formValidationService: GenericFormValidationService,
    private angularFireMessaging: AngularFireMessaging
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
            let userInfo = {
              "first_name": res.first_name,
              "last_name": res.last_name,
              "profile_pic": res.profile_pic
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            this.registerUserToFirebaseDB(res)
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
      if (localStorage.getItem('fbtoken')) {
        data.firebase_id = localStorage.getItem('fbtoken');
      }
      this.baseService.action('user/verify-otp/', data).subscribe(
        (res: any) => {
          if (res.status == "True") {
            this.updateUserWithFirebaseID(this.firebaseemail);
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
  updatePassword(email, newPassword) {
    this.afAuth.currentUser.then((res) => {
      res.updatePassword(newPassword).then(update => {
        console.log(update);
        var result = this.afAuth.signInWithEmailAndPassword(email, newPassword);
        result.then((res: any) => {
          localStorage.setItem('fbtoken', res.user.uid);
        })
        console.log('signInMethodsRadhey.....', result)
      })


    })

  }

  registerUserToFirebaseDB(data: any) {
    // let email = this.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
    let email = data.firebase_username + '@zatchup.com';//this.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
    this.firebaseemail = email;
    var that = this;
    this.afAuth.fetchSignInMethodsForEmail(email)
      .then(function (signInMethods) {
        // console.log('signInMethods.....', signInMethods)
        if (signInMethods.length > 0) {
          var password = '';
          if (localStorage.getItem('hash')) {
            password = atob(localStorage.getItem('hash'));
            that.firebaseService.updateClassAndRollChatUser(data)
            that.firebaseService.updateFirebasePassword(that.firebaseemail, password, that.model.password)
          } else {
            password = that.model.password
          }

          var result = that.afAuth.signInWithEmailAndPassword(that.firebaseemail, password);
          result.then((res: any) => {
            localStorage.setItem('fbtoken', res.user.uid);
            // this.updatePassword(email,password)
          }, (error) => {
            console.log(error);
            that.firebaseService.updateFirebasePassword(that.firebaseemail, password, that.model.password)

          })
        }
        else {


          that.firebaseService.firebaseSignUp(data.first_name, data.last_name, email, that.model.password, data.profile_pic, "1", data.class_alias, data.roll_no).then(
            (res: any) => {
              localStorage.setItem('fbtoken', res.user.uid);
            },
            err => {
            }
          )
        }
      })
      .catch((error) => {
        console.log('error dzasdasdasda....', error)
      })
  }

  async updateUserWithFirebaseID(email) {
    //this.model.username = this.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
    var result = await this.afAuth.signInWithEmailAndPassword(email, this.model.password);
    localStorage.setItem('fbtoken', result.user.uid);
    this.firebaseService.setPresence('online')
  }
}

