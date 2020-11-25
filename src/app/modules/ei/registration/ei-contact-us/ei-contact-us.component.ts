import { Component, OnInit } from '@angular/core';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';


@Component({
  selector: 'app-ei-contact-us',
  templateUrl: './ei-contact-us.component.html',
  styleUrls: ['./ei-contact-us.component.css']
})
export class EiContactUsComponent implements OnInit {
  error:any=[];
  errorDisplay:any={};
  model:any={};

  constructor(private genericFormValidationService:GenericFormValidationService) { }

  ngOnInit(): void {
  }

  /************************** */
  isValid(event)
  {
   this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(event,true,[]); 
  }

  submit() {
    this.error=[];
    this.errorDisplay={};
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,[]);
    if(this.errorDisplay.valid)
    {
      return false;
    }
   // this.router.navigate(['ei/otp-verification']);
  }

}
