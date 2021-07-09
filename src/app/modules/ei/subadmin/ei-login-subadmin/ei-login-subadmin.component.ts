import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { BaseService } from '../../../../services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../../services/notification/notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
declare var $: any;

@Component({
  selector: 'app-ei-login-subadmin',
  templateUrl: './ei-login-subadmin.component.html',
  styleUrls: ['./ei-login-subadmin.component.css']
})
export class EiLoginSubadminComponent implements OnInit {
  model: any = {};

  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay = '';
  modelForOtpModal: any = {};
  passwordType: any = "password";

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private formValidationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
  }


  /**Login For SubAdmin */
  doLogin() {
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
      this.baseService.action('subadmin/login/', this.model).subscribe((res: any) => {
        if (res.status == true) {
          this.loader.hide();
          this.registerUserToFirebaseDB(res.data);
          $("#OTPModel").modal({
            backdrop: 'static',
            keyboard: false
          });
        } else {
          this.loader.hide();
          var errorCollection = '';
          for (var key in res.error) {
            if (res.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + res.error[key][0] + '\n'

            }
          }
          this.alert.error(errorCollection, 'Error')
        }
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }

  resendOtp() {
    try {
      this.modelForOtpModal.username = this.model.username ? this.model.username : this.model.phone;
      this.loader.show();
      this.baseService.action('user/resend-otp/', this.modelForOtpModal).subscribe((res: any) => {
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
      this.loader.show()
      this.baseService.action('subadmin/otp-verify/', data).subscribe((res: any) => {
        this.loader.hide()
        if (res.status == true) {
          this.updateUserWithFirebaseID();
          localStorage.setItem("token", res.token);
          sessionStorage.setItem("permission", JSON.stringify(res.permission));
          $("#OTPModel").modal('hide');
          this.router.navigate(['ei/my-profile']);
        } else {
          // this.errorOtpModelDisplay = response.error;
          this.alert.error(res.error, 'Error')
        }
      }, (error) => {
        this.loader.hide()
      });
    } catch (err) {
      this.loader.hide()
    }

  }

  goToEiForgetPasswordPage() {
    this.router.navigate(['ei/forgot-password']);
  }

  goToEiContactUsPage() {
    this.router.navigate(['ei/contact-us']);
  }

  goToEiSubadminRegisterPage() {
    this.router.navigate(['ei/subadmin-registration']);
  }

  registerUserToFirebaseDB(data: any) {
    let email = this.baseService.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
    var that = this;
    this.afAuth.fetchSignInMethodsForEmail(email)
      .then(function (signInMethods) {
        let firebase = that.firebaseService
        if (signInMethods.length > 0) {
          var password = '';
          if (localStorage.getItem('hash')) {
            password = atob(localStorage.getItem('hash'));
            that.firebaseService.updateFirebasePassword(email, password, that.model.password)
          } else {
            password = that.model.password
          }
          var result = that.afAuth.signInWithEmailAndPassword(email, password);
          result.then((res: any) => {
            localStorage.setItem('fbtoken', res.user.uid);
          }, (error) => {
            that.firebaseService.updateFirebasePassword(email, password, that.model.password)

          })

        }
        else {
          firebase.firebaseSignUp(data.first_name, data.last_name, email, that.model.password, data.profile_pic, "1").then(
            (res: any) => {
              localStorage.setItem('fbtoken', res.user.uid);
            },
            err => {
              console.log('firebase signup error....', err)
            }
          )
        }
      })
  }

  updatePassword(email, newPassword) {
    this.afAuth.currentUser.then((res) => {
      res.updatePassword(newPassword).then(update => {
        var result = this.afAuth.signInWithEmailAndPassword(email, newPassword);
        result.then((res: any) => {
          localStorage.setItem('fbtoken', res.user.uid);
        })
      })


    })

  }

  async updateUserWithFirebaseID() {
    this.model.username = this.baseService.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
    var result = await this.afAuth.signInWithEmailAndPassword(this.model.username, this.model.password);
    localStorage.setItem('fbtoken', result.user.uid);
  }

  viewPassword() {
    if (this.passwordType == 'password') {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }
}
