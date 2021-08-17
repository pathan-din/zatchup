import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UsersServiceService } from 'src/app/services/user/users-service.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
declare var $: any;

@Component({
  selector: 'app-ei-mobile-verification',
  templateUrl: './ei-mobile-verification.component.html',
  styleUrls: ['./ei-mobile-verification.component.css']
})
export class EiMobileVerificationComponent implements OnInit {
  @ViewChild('otp1') otp1: ElementRef;
  @ViewChild('otp2') otp2: ElementRef;
  @ViewChild('otp3') otp3: ElementRef;
  @ViewChild('otp4') otp4: ElementRef;
  @ViewChild('otp5') otp5: ElementRef;
  @ViewChild('otp6') otp6: ElementRef;
  @ViewChild('otp7') otp7: ElementRef;
  @ViewChild('otp8') otp8: ElementRef;
  model:any={};
  email: any
  errorOtpModelDisplay:any;
  error:any=[];
  errorDisplay:any={};
  schoolNumber:any;
  modelForOtpModal:any={};
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private userService:UsersServiceService,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    ) { }


  ngOnInit(): void {
    if(localStorage.getItem('num'))
    {
      this.model.phone = atob(localStorage.getItem('num'));
      this.email = atob(localStorage.getItem('email'))
    }
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
        if($ev.target.name=='otp8'){
          this.otp7.nativeElement.focus()
        }else if($ev.target.name=='otp7'){
          this.otp6.nativeElement.focus()
        }else if($ev.target.name=='otp6'){
          this.otp5.nativeElement.focus()
        }
      }
       
    }
  }
  editRequest(){
    this.router.navigate(['ei/school-registration'], {queryParams: {'edit' : true}});
  }

  resendOtp() {
    try {
      let data: any = {};
      this.modelForOtpModal.username = this.model.email ? this.model.email : this.model.phone;

      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.SpinnerService.show();
      this.userService.resendOtpViaRegister(this.modelForOtpModal).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.alert.success(response.message,"Success")
        } else {
          this.errorOtpModelDisplay = response.error;
          //alert(response.error)
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("verify Otp Exception", err);
    }
  }
  goToEiPaymentPage(){
    $("#CongratulationModel").modal("hide");
    this.router.navigate(['ei/payment']);
  }

  goToOtpVerification(){

    var flagRequired=true;
    this.errorOtpModelDisplay='';
    this.error=[];
   if(!this.model.otp1)
   {
     flagRequired=false;
   }else if(!this.model.otp2)
   {
     flagRequired=false;
   }else if(!this.model.otp3)
   {
     flagRequired=false;
   }
   else if(!this.model.otp4)
   {
     flagRequired=false;
   }
   if(flagRequired==false)
   {
     this.error.push("Please enter OTP!");
   }
   if(this.error.length>0)
   {
     this.errorOtpModelDisplay=this.error.join('\n');
     return ;
   }
   try{
     let data:any={};
     data.username=this.model.phone;
     data.verify_otp_no=this.model.otp1+this.model.otp2+this.model.otp3+this.model.otp4+this.model.otp5+this.model.otp6+this.model.otp7+this.model.otp8;
     this.SpinnerService.show();
     this.eiService.verifyOtpWithMobile(data).subscribe(res => {
      let response:any={}
      response=res;
      this.registerUserToFirebaseDB(response)
      if(response.status==true)
      {
        this.SpinnerService.hide();
       //$("#OTPModel").modal('hide');

       this.schoolNumber=response.school_code;
       localStorage.setItem("user_id",response.user_id)
       localStorage.setItem("token",response.token);
       localStorage.removeItem('model');
       localStorage.removeItem('stateObj')
       $("#CongratulationModel").modal({
        backdrop: 'static',
        keyboard: false,
      });
      
      }else{
        this.SpinnerService.hide();
       this.alert.error(response.error.message[0], 'Error')
      }
     },(error) => {
      this.SpinnerService.hide();
       console.log(error);
       
     });
   }catch(err){
    this.SpinnerService.hide();
     console.log("variyfy Otp Exception",err);
   }
 
  }

  registerUserToFirebaseDB(data: any) {
    let email = data.firebase_username + '@zatchup.com';
    this.firebaseService.firebaseSignUp(localStorage.getItem('school_name'), "", email, atob(localStorage.getItem('password')), "", "1").then(
      (res: any) => {
        localStorage.setItem('fbtoken', res.user.uid);
      },
      err => {
        console.log('firebase signup error....', err)
      }
    )
  }
}
