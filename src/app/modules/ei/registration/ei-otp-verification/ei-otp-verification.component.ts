import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-ei-otp-verification',
  templateUrl: './ei-otp-verification.component.html',
  styleUrls: ['./ei-otp-verification.component.css']
})
export class EiOtpVerificationComponent implements OnInit {
model:any={};
  errorOtpModelDisplay:any;
  otp1:any;
  otp2:any;
  otp3:any;
  otp4:any;
  error:any=[];
  errorDisplay:any={};
 constructor(private activatedRoute: ActivatedRoute,private router: Router,private SpinnerService: NgxSpinnerService,public eiService:EiServiceService,public formBuilder: FormBuilder) { }


  ngOnInit(): void {
	  if(localStorage.getItem('num'))
    {
      this.model.username = atob(localStorage.getItem('num'));
    }
  }

  goToCreateNewPasswordPage(){
    this.router.navigate(['ei/create-new-password']);
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
     data.email=this.model.username;
     data.phone_otp=this.otp1+this.otp2+this.otp3+this.otp4;
     this.SpinnerService.show();
     this.eiService.verifyOtp(data).subscribe(res => {
      let response:any={}
      response=res;
      if(response.status==true)
      {
        this.SpinnerService.hide();
       //$("#OTPModel").modal('hide');

       
      // localStorage.setItem("user_id",response.user_id)
       localStorage.setItem("token",response.token);
	   if(response.reg_steps===null)
	   {
		    this.router.navigate(['ei/payment']);
	   }else if(response.reg_steps==="1")
	   {
		    this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '1' } });
	   }else if(response.reg_steps==="2")
	   {
		    this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '2' } });
	   }else if(response.reg_steps==="3")
	   {
		    this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '3' } });
	   }else if(response.reg_steps==="4")
	   {
		    this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '4' } });
	   }else{
		    this.router.navigate(['ei/dashboard']);
	   }		   
      
      }else{
        this.SpinnerService.hide();
       this.errorOtpModelDisplay=response.error;
      }
     },(error) => {
      this.SpinnerService.hide();
       console.log(error);
       
     });
   }catch(err){
    this.SpinnerService.hide();
     console.log("vaeryfy Otp Exception",err);
   }
 
  }
}
