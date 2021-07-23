import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../../services/user/users-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from '../../../../services/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-subadminschoolconfirmation',
  templateUrl: './subadminschoolconfirmation.component.html',
  styleUrls: ['./subadminschoolconfirmation.component.css']
})
export class SubadminschoolconfirmationComponent implements OnInit {
  model: any = {};
  /*Using Validation For Manage Error Concept*/
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  /*Qualification Master*/
  studentsConfirmation: any = [];
  title:any;
  schoolId:any;
  isStudent: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public baseService: BaseService,
    public eiService:EiServiceService,
    private genericFormValidationService:GenericFormValidationService,
    public formBuilder: FormBuilder,
    private alert:NotificationService) { }

  ngOnInit(): void {
   this.getUserconfirmationBySchoolDetails();
  }

 
 
 getUserconfirmationBySchoolDetails()
  {
    try{
     this.SpinnerService.show(); 
    //  this.model = {
    //    'school_id': this.route.snapshot.queryParamMap.get('school_id') ? this.route.snapshot.queryParamMap.get('school_id') : ''
    //  }
    if(this.route.snapshot.queryParamMap.get('school_id')){
      this.model = {
        'school_id': this.route.snapshot.queryParamMap.get('school_id')   
      }
    }
    else {
      
    }
      /***************Add Heighest Qualification Api*****************************/
     this.baseService.action('subadmin/get-ei-detail-for-already-subadmin/',this.model).subscribe(res => {
        
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if(response.status==false)
        {
          this.SpinnerService.hide();
          this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService,response.error);
          this.alert.error(this.errorDisplay,"Error");
          return;
        }else{
          this.SpinnerService.hide();
          if(response.data.length>0){
            this.studentsConfirmation = response.data[0];
            this.schoolId= response.data[0].school_id;
           
          }
          
        }
        
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
        });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  
notMe(){
  try{
    this.SpinnerService.show(); 
    
    this.model.school_id = this.schoolId;
    this.model.is_confirm_by_subadmin = 0;
     /***************Add Heighest Qualification Api*****************************/
    this.baseService.action('subadmin/confirm-school-by-subadmin/',this.model).subscribe(res => {
       
       let response: any = {};
       response = res;
       this.SpinnerService.hide();
       if(response.status==false)
       {
         this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService,response.error);
         this.alert.error(this.errorDisplay,"Error");
         return;
       }else{
        this.SpinnerService.hide();
        this.router.navigate(['ei/add-ei']);
       }
      //  let regStep = JSON.parse(localStorage.getItem('getreject')).reg_step
      //  if(regStep == 7){
      //    this.router.navigate(['ei/my-profile'])
      //  }
      //  else{
       
      //  }
     
     
       }, (error) => {
         this.SpinnerService.hide();
         console.log(error);
       });
   } catch (err) {
     this.SpinnerService.hide();
     console.log(err);
   }
  
}
continue(){
  try{
    this.SpinnerService.show(); 
    
    this.model.school_id = this.schoolId;
    this.model.is_confirm_by_subadmin = 1;
     /***************Add Heighest Qualification Api*****************************/
    this.baseService.action('subadmin/confirm-school-by-subadmin/',this.model).subscribe(res => {
       
       let response: any = {};
       response = res;
     
       if(response.status==false)
       {
        this.SpinnerService.hide();
         this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService,response.error);
         this.alert.error(this.errorDisplay,"Error");
         return;
       }else{
        this.SpinnerService.hide();
       }
       this.router.navigate(['ei/add-ei'],{queryParams:{school_id:this.schoolId}});
     
       }, (error) => {
         this.SpinnerService.hide();
         console.log(error);
       });
   } catch (err) {
     this.SpinnerService.hide();
     console.log(err);
   }
  
}
}
