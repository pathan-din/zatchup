import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
declare var $: any;

@Component({
  selector: 'app-ei-subadmin-register',
  templateUrl: './ei-subadmin-register.component.html',
  styleUrls: ['./ei-subadmin-register.component.css']
})
export class EiSubadminRegisterComponent implements OnInit {
  model:any={};
  modelForOtpModal:any={};
  showHidePassword:string='password';
  showHidecPassword:string='password';
  /**********Variable declare for OTP Verification Model************/
  otp1:any;
  otp2:any;
  otp3:any;
  otp4:any;
  /*****************************************************************/
  modelForConfirm:any={};
  error:any=[];
  errorDisplay:any={};
  errorOtpModelDisplay:any;
  constructor(
    private base : BaseService,
    private genericFormValidationService:GenericFormValidationService,private router: Router,private SpinnerService: NgxSpinnerService,public eiService:EiServiceService,public formBuilder: FormBuilder) { }
  ngOnInit(): void {
	  this.model.profile={};
	   this.model.profile.pronoun='';
	   this.model.profile.custom_gender='';
	   
	   
  }
  submitSubAdminRegister(){
	this.error=[];
    this.errorDisplay={};
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,[]);
    if(this.errorDisplay.valid)
    {
      return false;
    }
	try{
      this.SpinnerService.show(); 
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/
      // if(this.model.phone==null)
      // {
        // this.model.phone='';
      // }
      this.model.profile.dob = this.base.getDateFormat(this.model.profile.dob);
      this.eiService.subAdminRegisteration(this.model).subscribe(res => {
        console.log(res);
        let response:any={};
        response=res;
        
        if(response.status===true)// Condition True Success 
        {
		  this.SpinnerService.hide(); 	
            $("#OTPModel").modal({
            backdrop: 'static',
            keyboard: false
        });
        }else{ // Condition False Validation failure
          this.SpinnerService.hide(); 
          var errorCollection='';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection+response.error[key][0]+'\n'
              
            }
          }
          alert(errorCollection);
          
        }
        
        /*End else*/
          //this.router.navigate(['user/signup']);
        },(error) => {
          this.SpinnerService.hide(); 
          //console.log(error);
          
        });
    }catch(err){
      this.SpinnerService.hide(); 
      //console.log(err);
    }
	console.log(this.model);
  }
  goToEiContactUsPage(){
    this.router.navigate(['ei/contact-us']);
  }
  goToEiSubadminAdditionalPage(){
    this.router.navigate(['ei/subadmin-additional']);
  }
  redirectToSubadminLogin(){
	  this.router.navigate(['ei/login-subadmin']);
  }
  redirectToSignUpEi(){
	  this.router.navigate(['ei/school-registration']);
  }
  goToDashboard(){
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
   console.log(this.errorOtpModelDisplay);
   return ;
 }
 try{
   let data:any={};
   this.modelForOtpModal.username=this.model.username?this.model.username:this.model.phone;
   this.modelForOtpModal.verify_otp_no=this.otp1+this.otp2+this.otp3+this.otp4;
/***********************Mobile Number OR Email Verification Via OTP**********************************/
  this.SpinnerService.show(); 
  this.eiService.verifyOtpViaRegister(this.modelForOtpModal).subscribe(res => {
    let response:any={}
    response=res;
    this.SpinnerService.hide(); 
    if(response.status==true)
    {
      //localStorage.setItem("user_id",response.user_id);
	  localStorage.setItem("token",response.token);
      $("#OTPModel").modal('hide');
      this.router.navigate(['ei/kyc-verification']);
    }else{
     this.errorOtpModelDisplay=response.error;
    }
   },(error) => {
    this.SpinnerService.hide(); 
     console.log(error);
     
   });
 }catch(err){
  this.SpinnerService.hide(); 
   console.log("verify Otp Exception",err);
 }

}
isValid(event)
 {
	 
	 if(Object.keys(this.errorDisplay).length !== 0){
			this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,true,[]); 
	 }
  
 }
 changeInput($ev)
{
  
  if($ev.target.value.length==$ev.target.maxLength)
  {
    var $nextInput=$ev.target.nextSibling;
    $nextInput.focus();
  }
   
}
}
