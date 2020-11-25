import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';


import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
@Component({
  selector: 'app-user-qualification',
  templateUrl: './user-qualification.component.html',
  styleUrls: ['./user-qualification.component.css']
})
export class UserQualificationComponent implements OnInit {
  model: any = {};
  /*Using Validation For Manage Error Concept*/
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  /*Qualification Master*/
  qualificationJson: any = [];
  title:any;
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public baseService: BaseService,
    public eiService:EiServiceService,
    private genericFormValidationService:GenericFormValidationService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this. getUserQualificationtype();
    
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
       

    });
  }
  /*************************Get All Heighest Qualification List Api*************************/
  getUserQualificationtype()
  {
    try{
     this.SpinnerService.show(); 
      /***************Add Heighest Qualification Api*****************************/
     this.userService.qualificationtype(this.model).subscribe(res => {
        
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        this.qualificationJson = response.results;
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
        });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  /*****************************************************************************************/
  goToUserWorkDetail(){
    if(!this.model.qualification_type)
    {
      this.error.push("error for highest_edu");
      this.errorDisplay.qualification_type='Please Select Your Heighest Education!';
       
    }else{
      this.error=[];
      this.errorDisplay.qualification_type=='';
    }
    if( this.error.length>0)
    {

      return false;
    }else{
      try{
        this.SpinnerService.show(); 
        /***************Add Heighest Qualification Api*****************************/
         this.baseService.action('user/add-highest-qualification/',this.model).subscribe(res => {
          let response:any={};
          response=res;
          this.SpinnerService.hide(); 
          if(response.status===true)
          {
            if(this.title=='Your highest level of education?')
            {
              this.router.navigate(['user/add-past-ei']);
            }else{
              this.router.navigate(['user/add-ei']);
            }
            
           
          }else{
            this.SpinnerService.hide(); 
            var errorCollection='';
            for (var key in response.error) {
              if (response.error.hasOwnProperty(key)) {
                errorCollection = errorCollection+response.error[key][0]+'\n'
               
              }
             }
             alert(errorCollection);
            
          }
           
           
          },(error) => {
            this.SpinnerService.hide(); 
            console.log(error);
            
          });
      }catch(err){
        this.SpinnerService.hide(); 
        console.log(err);
      }
    }
   
  }
}
