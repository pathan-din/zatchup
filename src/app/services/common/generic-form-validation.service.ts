import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GenericFormValidationService {
  public env: any = environment;
  errorMessageObject: any = {};
  errorMultipleFormValidationMessageObject: any = {};
  constructor() { }
  /* Function name : checkValidationFormAllControls;
   * (Use for function for all common validation
   * check field validation use 
   * range,required,min,max,email,phone,alphabet,number,password
   * and confirm password matching,password format);
   * Parameter:pass the full control;
   * return error object with true and false;
   */
  checkValidationFormAllControls(controls, check, arrayData = []) {

   
    if (this.env.debugMode) {
      console.log(controls);
      
    }
    if (arrayData.length > 0) {

      this.errorMessageObject = {};
      
       

        for (var i = 0; i < controls.length; i++) {
          //var ngReflectName=controls.attributes.indexOf("ng-reflect-name");
          
          
            //Check All Required filled based on the all controlles required property 
            if (controls[i].required && !controls[i].value) {
              this.errorMessageObject[controls[i].id] = controls[i].id.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].id.replace(/_\d+/g, ' ').slice(1).replace(/[^a-zA-Z ]/g, " ").replace(/  +/g, ' ')+'is required.';
            }
            //Check All required filled based on type=radio input box
            else if (controls[i].type == 'radio' && !controls[i].validity.valid) {

              this.errorMessageObject[controls[i].id] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_\d+/g, ' ').slice(1).replace(/[^a-zA-Z ]/g, " ").replace(/  +/g, ' ')+'is required.';
            }
           
            else if (controls[i].type == 'checkbox' && !controls[i].validity.valid) {

              this.errorMessageObject[controls[i].id] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1).replace(/[^a-zA-Z ]/g, " ").replace(/  +/g, ' ')+'is required.';
            }
          
         
        }
        
      
    } else {
      this.errorMessageObject = {};
     
      
      for (var i = 0; i < controls.length; i++) {
        
        //Check All Required filled based on the all controlles required property 
        if (controls[i].required && !controls[i].value) {
          this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
        }
        //Check All required filled based on type=radio input box
        else if (controls[i].type == 'radio' && !controls[i].validity.valid) {

          this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
        }
		 else if (controls[i].type == 'file' && !controls[i].validity.valid) {

          this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
        }
        //Check Email required and email format filled based on type=email input box
        else if (controls[i].type == 'email' && controls[i].value) {
          //var pattern = new RegExp(controls[i].pattern);
          //check pattern of email
          var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
          if (pattern.test(controls[i].value)) {

          } else {
            this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + " is not valid format.";
          }

        }
        //Check Password required and password format filled based on type=password input box
        else if (controls[i].type == 'password' && controls[i].value) {

          var pattern = new RegExp(controls[i].pattern);
          if (pattern.test(controls[i].value)) {
            if(controls[i].getAttribute('match'))
            {
              console.log(controls[i].getAttribute('match'));
              
              if(controls[i-1].id==controls[i].getAttribute('match').split(',')[0] && controls[i].id==controls[i].getAttribute('match').split(',')[1])
              {
               if(controls[i-1].value!=controls[i].value)
               {
                this.errorMessageObject[controls[i].name] = controls[i].getAttribute('match').split(',')[0].replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].getAttribute('match').split(',')[0].replace(/_/g, ' ').slice(1)+','+controls[i].getAttribute('match').split(',')[1].replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].getAttribute('match').split(',')[1].replace(/_/g, ' ').slice(1)+ ' does not match.';     
               }
              }
              console.log(controls[i].getAttribute('match').split(',')[1]);
             
            }
          } else {
            
            this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + " ,Please input a valid format .";

          }

        }
        //check All pattern based on type = text filed
        else if (controls[i].type == 'text' && controls[i].value) {

          var pattern = new RegExp(controls[i].pattern);
          if (pattern.test(controls[i].value)) {

          } else {
            console.log(pattern.test(controls[i].value));

            this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + " is not valid format.";
          }

        }
        //check All pattern based on type = tel filed
        else if (controls[i].type == 'tel' && controls[i].value) {


          if (controls[i].value.length != controls[i].maxLength) {
            this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + " is not valid " + controls[i].maxLength + " digit number.";
          }

        }
        else if (controls[i].type == 'checkbox' && !controls[i].validity.valid) {

          this.errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
        }
      }
    }



    if (Object.keys(this.errorMessageObject).length !== 0) {
      this.errorMessageObject["valid"] = true;
    } else {
      this.errorMessageObject["valid"] = false;
    }
    
    
    if(this.errorMultipleFormValidationMessageObject.length>0)
    {
	  
      return this.errorMultipleFormValidationMessageObject;
    }
     
    return this.errorMessageObject;
  }
  hideSpeanerWithConsole(SpinnerService, msg) {
    SpinnerService.hide();
    if (this.env.debugMode) {
      console.log(msg);
    }
  }
}
