import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-login',
  templateUrl: './ei-login.component.html',
  styleUrls: ['./ei-login.component.css']
})
export class EiLoginComponent implements OnInit {
  error:any=[];
  errorDisplay:any={};
  model:any={};

  constructor(
    private genericFormValidationService:GenericFormValidationService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService
    ) {}

  ngOnInit(): void {
  }

  goToEiForgetPasswordPage(){
    this.router.navigate(['ei/forgot-password']);
  }

  goToEiContactUsPage(){
    this.router.navigate(['ei/contact-us']);
  }

  goToEiLoginSubadminPage(){
    this.router.navigate(['ei/login-subadmin']);
  }

  goToEiSchoolRegisterPage(){
    this.router.navigate(['ei/school-registration']);
  }
   goToEiSubadminRegisterPage(){
    this.router.navigate(['ei/subadmin-registration']);
  }
   doLogin(){
    this.error=[];
    this.errorDisplay={};
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,[]);
    if(this.errorDisplay.valid)
    {
      return false;
    }
	 try{
        /**Api For the Register School */

        this.SpinnerService.show(); 
       
        this.eiService.login(this.model).subscribe(res => {
          console.log(res);
          let response:any={};
          response=res;
          this.SpinnerService.hide(); 
          if(response.status===true)
          {

            localStorage.setItem("num",btoa(this.model.username))
            this.router.navigate(['ei/otp-verification']);
          }else{
           
            this.SpinnerService.hide();
           // this.alert.error(response.error.message[0], 'Error') 
            var errorCollection='';
            errorCollection= this.eiService.getErrorResponse(this.SpinnerService,response.error);
            if(errorCollection)
              {
                this.alert.error(errorCollection, 'Error') 
              //alert(errorCollection);	
              }else{
                this.alert.error(response.message, 'Success');
              }
			
            // if(response.status == false){
            //   this.alert.error(response.error.message[0], 'Error')
            // }
          }
         },(error) => {
            this.SpinnerService.hide(); 
            console.log(error);
            this.alert.error(error, 'Error')
            
          });
      }
      catch(e){
        console.log("Something Went Wrong!")
      }
    // this.router.navigate(['ei/kyc-verification']);
  }
  goToEiKycVerificationPage(){
    this.error=[];
    this.errorDisplay={};
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,[]);
    if(this.errorDisplay.valid)
    {
      return false;
    }
    // this.router.navigate(['ei/kyc-verification']);
  }

  /************************** */
  isValid(event)
  {
   if(Object.keys(this.errorDisplay).length !== 0){	  
   this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,true,[]); 
   }
  }
  
}
