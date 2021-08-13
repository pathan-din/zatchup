import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
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
  passwordType: any = "password";
  model: any = {};

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private formValidationService: GenericFormValidationService,
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  goToEiForgetPasswordPage() {
    this.router.navigate(['ei/forgot-password'], {queryParams : {'role' : 'EIREPRESENTATIVE'}});
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
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
      this.baseService.action('ei/login/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status === true) {
            this.baseService.firebase_username = res.data.firebase_username + '@zatchup.com';
            this.baseService.username = this.model.username;
            this.baseService.password = this.model.password;
            this.registerUserToFirebaseDB(res.data);
            this.router.navigate(['ei/otp-verification']);
          } else {
            var errorCollection = '';
            errorCollection = this.baseService.getErrorResponse(this.loader, res.error);
            this.alert.error(errorCollection, 'Error')
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
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  registerUserToFirebaseDB(data: any) {
    let email = data.firebase_username + '@zatchup.com';// this.baseService.isPhoneNumber(this.model.username) == true ? this.model.username + '@zatchup.com' : this.model.username
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
            console.log(error);
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
      .catch((error) => {
        console.log('error....', error)
      })
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

  viewPassword() {
    if (this.passwordType == 'password') {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }
}
