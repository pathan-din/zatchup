import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-ei-cheque-details',
  templateUrl: './ei-cheque-details.component.html',
  styleUrls: ['./ei-cheque-details.component.css']
})
export class EiChequeDetailsComponent implements OnInit {
  errorDisplay:any= {};
  model:any={};
  bankNameList: any=[];

  constructor( private router: Router,
    private genericFormValidationService: GenericFormValidationService,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService: BaseService) { 

    }

  ngOnInit(): void {
    this.model.dd_bank_name = '';
    this.getBankNameList();
  }

  goToEiCourierDetailsPage(){
    this.router.navigate(['ei/courier-details']);
  }
  getBankNameList() {
    //ei/get-allbankname/
    try {
      this.SpinnerService.show();
      this.baseService.getData('ei/get-allbankname/').subscribe(res => {
        let responce: any = {};
        responce = res;
        if (responce.status == false) {
          this.SpinnerService.hide();
          this.bankNameList = [];
          return;
        }
        this.SpinnerService.hide();
        this.bankNameList = responce.results


      }, (error) => {
        this.SpinnerService.hide();
        this.alert.error("Something went wrong", 'Error');
      })
    } catch (e) {

    }
  }
  doDDCheque(){
    console.log(this.model);
    
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
     // this.model.dd_date_of_issue = this.baseService.getDateFormat(this.model.dd_date_of_issue);
      this.baseService.action('ei/dd-cheque-payment-process/', this.model).subscribe(res => {
       
        let response: any = {};
        response = res;
        if(response.status==true)
        {
          this.SpinnerService.hide();
          //window.location.href = '#/ei/onboarding-process';
          this.router.navigate(["ei/onboarding-process"]);
        }else{
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          // alert(errorCollection);
          this.alert.error(errorCollection,'Error')
        }

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  

}
