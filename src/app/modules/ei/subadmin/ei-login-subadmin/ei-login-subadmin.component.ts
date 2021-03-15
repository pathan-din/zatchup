import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { BaseService } from '../../../../services/base/base.service';
import { NotificationService } from '../../../../services/notification/notification.service';
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

  constructor(
    private router: Router,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private firebaseService: FirebaseService,
    private formValidationService: GenericFormValidationService) { }

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
      this.baseService.action('subadmin/login/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
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
      this.alert.error('Something went wrong!', "Error")
    }
  }
  resendOtp() {
    try {
      this.modelForOtpModal.username = this.model.username ? this.model.username : this.model.phone;
      this.loader.show();
      this.baseService.action('user/resend-otp/', this.modelForOtpModal).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.alert.success(res.message, "Success")
          } else {
            this.errorOtpModelDisplay = res.error;
          }
        }, (error) => {
          this.loader.hide();
          console.log(error);

        });
    } catch (err) {
      this.loader.hide();
      this.alert.error('Something went wrong!', "Error")
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
      this.baseService.action('subadmin/otp-verify/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.registerUserToFirebaseDB(res)
            localStorage.setItem("token", res.token);
            sessionStorage.setItem("permission", JSON.stringify(res.permission));

            $("#OTPModel").modal('hide');
            this.router.navigate(['ei/my-profile']);
          } else {
            this.errorOtpModelDisplay = res.error;
          }
        }, (error) => {
          console.log(error);

        });
    } catch (err) {
      this.alert.error('Something went wrong!', "Error")
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
    this.firebaseService.firebaseSignUp(data.first_name, data.last_name, email.trim(), this.model.password, data.profile_pic,"1").then(
      (res: any) => {
        console.log('firebase signup res is as ::', res.user.uid)
        this.updateUserWithFirebaseID(res.user.uid)
      },
      err => {
        console.log('firebase signup error....', err)
      }
    )
  }

  updateUserWithFirebaseID(id: any) {
    let data = {
      "firebase_userId": id
    }
    this.baseService.action('chat/register_user_firebase/', data).subscribe(
      (res: any) => {
        console.log('update user....', res)
      }
    )
  }


}
