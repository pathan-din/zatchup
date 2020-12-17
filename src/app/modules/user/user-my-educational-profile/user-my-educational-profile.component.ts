import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';

@Component({
  selector: 'app-user-my-educational-profile',
  templateUrl: './user-my-educational-profile.component.html',
  styleUrls: ['./user-my-educational-profile.component.css']
})
export class UserMyEducationalProfileComponent implements OnInit {
  epData: any;
  model:any={};
  editModel:any={};
  error: any = [];
  errorDisplay:any={};
  errorOtpModelDisplay:any=[];
  constructor(
    private router: Router,
    private alert: NotificationService,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService,
   
    ) { }

  ngOnInit(): void {
    this.model = {};
    this.getEducationalProfile()
  }
  openModel (label,key,value){
   
   
      this.editModel={};
      this.model=label;
      this.model.first_name=label.first_name;
      this.model.last_name=label.last_name;
      this.editModel.key = key;
      this.editModel.old_value =value;
      this.editModel.value = value;
      console.log( this.editModel);
      
       
     // this.title = label;
    
    
  }
  setModelValue(key){
    this.editModel.value=key;
    console.log(this.editModel);
    
  }
   /**Edit Personal Details */
   submitPersonalDetails(){
   
    
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
   
    if(this.errorDisplay.valid){
      return false;
    }else{
      try {
        this.loader.show();
       // this.editModel.opening_date= this.baseService.getDateReverseFormat(this.editModel.opening_date);
       this.baseService.action('user/request-change-user-detail-by-ei/',this.editModel).subscribe(res=>{
         let response:any={};
         response=res;
         if(response.status == true)
         {
           this.loader.hide();
           this.alert.success(response.message,'success');
           //location.reload();
         }else{
           this.alert.error(response.error.message[0],'Error');
         }
       },(error=>{
         this.loader.hide();
       }))
      } catch (e) {
      
      }
    }
  }
  getEducationalProfile(){
  this.loader.show()
  let url = 'user/student-education-profile/'
  this.baseService.getData(url).subscribe(
    (res: any)=>{
      if(res.status == true)
      this.epData = res.data
      else
      this.alert.error(res.error.message[0], 'Error')
      this.loader.hide()
    }
  ), err=>{
    this.loader.hide();
    this.alert.error(err, 'Error')
  }
  }
}
