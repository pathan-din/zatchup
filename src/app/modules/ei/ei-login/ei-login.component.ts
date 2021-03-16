import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-ei-login',
  templateUrl: './ei-login.component.html',
  styleUrls: ['./ei-login.component.css']
})
export class EiLoginComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};

  constructor(
    private genericFormValidationService: GenericFormValidationService,
    private router: Router,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService: BaseService,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  goToEiForgetPasswordPage() {
    this.router.navigate(['ei/forgot-password']);
  }

  goToEiContactUsPage() {
    this.router.navigate(['ei/contact-us']);
  }

  goToEiLoginSubadminPage() {
    this.router.navigate(['ei/login-subadmin']);
  }

  goToEiSchoolRegisterPage() {
    this.router.navigate(['ei/school-registration']);
  }
  goToEiSubadminRegisterPage() {
    this.router.navigate(['ei/subadmin-registration']);
  }
  doLogin() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      /**Api For the Register School */
      this.loader.show();
      this.eiService.login(this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.baseService.username = this.model.username;
            this.baseService.password = this.model.password;
            this.registerUserToFirebaseDB();
            this.router.navigate(['ei/otp-verification']);
          } else {
            this.loader.hide();
            var errorCollection = '';
            errorCollection = this.eiService.getErrorResponse(this.loader, res.error);
            if (errorCollection) {
              this.alert.error(errorCollection, 'Error')
            } else {
              this.alert.error(res.message, 'Success');
            }
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error, 'Error')

        });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  goToEiKycVerificationPage() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  registerUserToFirebaseDB() {
    // debugger
    let email = this.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
    var that = this;
    this.afAuth.fetchSignInMethodsForEmail(email)
      .then(function (signInMethods) {
        let firebase = that.firebaseService
        if (signInMethods.length > 0) {
          console.log("yes", signInMethods);

        }
        else {
          firebase.firebaseSignUp(email, email, email, that.model.password, '', "1").then(
            (res: any) => {
              localStorage.setItem('fbtoken', res.user.uid);
              console.log('firebase signup res is as ::', res.user.uid)
              // localStorage.setItem('firebaseid',res.user.uid)
              //this.updateUserWithFirebaseID(res.user.uid)
            },
            err => {
              // console.log('firebase signup error....', err)
            }
          )
        }
      })


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
}
