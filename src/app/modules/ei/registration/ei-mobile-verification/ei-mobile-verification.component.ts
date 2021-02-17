import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UsersServiceService } from 'src/app/services/user/users-service.service';
declare var $: any;

@Component({
  selector: 'app-ei-mobile-verification',
  templateUrl: './ei-mobile-verification.component.html',
  styleUrls: ['./ei-mobile-verification.component.css']
})
export class EiMobileVerificationComponent implements OnInit {
  model:any={};
  email: any
  errorOtpModelDisplay:any;
  otp1:any;
  otp2:any;
  otp3:any;
  otp4:any;
  otp5:any;
  otp6:any;
  otp7:any;
  otp8:any;
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
    private userService:UsersServiceService) { }


  ngOnInit(): void {
    if(localStorage.getItem('num'))
    {
      this.model.phone = atob(localStorage.getItem('num'));
      this.email = atob(localStorage.getItem('email'))
    }
  }
  changeInput($ev)
  {
    console.log($ev);
    if($ev.target.value.length==$ev.target.maxLength)
    {
      var $nextInput=$ev.target.nextSibling;
      $nextInput.focus();
    }
     
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
   if(!this.otp1)
   {
     flagRequired=false;
   }else if(!this.otp2)
   {
     flagRequired=false;
   }else if(!this.otp3)
   {
     flagRequired=false;
   }
   else if(!this.otp4)
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
     data.verify_otp_no=this.otp1+this.otp2+this.otp3+this.otp4+this.otp5+this.otp6+this.otp7+this.otp8;
     this.SpinnerService.show();
     this.eiService.verifyOtpWithMobile(data).subscribe(res => {
      let response:any={}
      response=res;
      if(response.status==true)
      {
        this.SpinnerService.hide();
       //$("#OTPModel").modal('hide');

       this.schoolNumber=response.school_code;
       localStorage.setItem("user_id",response.user_id)
       localStorage.setItem("token",response.token);
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
}
