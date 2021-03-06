import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../../services/notification/notification.service';
import { UsersServiceService } from '../../../../services/user/users-service.service';
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
  
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    public alert: NotificationService
    , private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public userService: UsersServiceService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private genericFormValidationService: GenericFormValidationService) { }

  ngOnInit(): void {
  }


  /**Login For SubAdmin */
  doLogin() {
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();


      this.baseService.action('subadmin/login/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.registerUserToFirebaseDB(response.data);
          $("#OTPModel").modal({
            backdrop: 'static',
            keyboard: false
          });
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          // alert(errorCollection);
          this.alert.error(errorCollection, 'Error')
        }

      }, (error) => {
        this.SpinnerService.hide();

      });
    } catch (err) {
      this.SpinnerService.hide();
    }
  }
  resendOtp() {
    try {
      let data: any = {};
      this.modelForOtpModal.username = this.model.username ? this.model.username : this.model.phone;
      //this.modelForOtpModal.username = this.model.email ? this.model.email : this.model.phone;

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
          //alert(response.error)
        }
      }, (error) => {
        this.SpinnerService.hide();
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("Error", err);
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
      this.baseService.action('subadmin/otp-verify/', data).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.updateUserWithFirebaseID();
          localStorage.setItem("token", response.token);
          sessionStorage.setItem("permission", JSON.stringify(response.permission));
          $("#OTPModel").modal('hide');
          this.router.navigate(['ei/my-profile']);
        } else {
          this.errorOtpModelDisplay = response.error;
        }
      }, (error) => {
        console.log(error);

      });
    } catch (err) {
      console.log("Error", err);
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
          var password='';
          if(localStorage.getItem('hash')){
              password=atob(localStorage.getItem('hash'));
              that.firebaseService.updateFirebasePassword(email,password,that.model.password)
          }else{
              password=that.model.password
          }
          var result =  that.afAuth.signInWithEmailAndPassword(email,password);
            result.then((res:any)=>{
              localStorage.setItem('fbtoken', res.user.uid);
            },(error)=>{
              that.firebaseService.updateFirebasePassword(email,password,that.model.password)
              
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
  updatePassword(email,newPassword){
    this.afAuth.currentUser.then((res)=>{
      res.updatePassword(newPassword).then(update=>{
        var result =  this.afAuth.signInWithEmailAndPassword(email, newPassword);
        result.then((res:any)=>{
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
