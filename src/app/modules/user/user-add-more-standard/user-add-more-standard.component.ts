import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { BaseService } from '../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
declare var $: any;
@Component({
  selector: 'app-user-add-more-standard',
  templateUrl: './user-add-more-standard.component.html',
  styleUrls: ['./user-add-more-standard.component.css']
})
export class UserAddMoreStandardComponent implements OnInit {
  model:any={};
  errorDisplay:any={};
   
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public baseService:BaseService
    , private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var schoolId = params['school_id'];
           this.getCourseBySchoolId(schoolId)

    });
  }
getCourseBySchoolId(id){
  try {
  

    this.SpinnerService.show();
    
    /***********************Mobile Number OR Email Verification Via OTP**********************************/
    
    this.baseService.getData('user/course-list-by-schoolid/',{'school_id':id}).subscribe(res => {
      let response: any = {}
      response = res;
      this.SpinnerService.hide();
      if (response.status == true) {
        
         
      } else {
        this.SpinnerService.hide();
        var errorCollection = '';
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)) {
            errorCollection = errorCollection + response.error[key][0] + '\n'

          }
        }
        alert(errorCollection);
      }
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);

    });
  } catch (err) {
    this.SpinnerService.hide();

  }
}  
addCourseData(){

  this.errorDisplay = {};
  this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
  if (this.errorDisplay.valid) {
    return false;
  }
  try {

    this.SpinnerService.show();
    
    /***********************Mobile Number OR Email Verification Via OTP**********************************/

    this.baseService.action('user/add-ei/',this.model).subscribe(res => {
      let response: any = {}
      response = res;
      this.SpinnerService.hide();
      if (response.status == true) {
        if(response.check_school_info_on_zatchup==1)
        {
          this.router.navigate(['user/ei-profile']);
        }else if(response.check_school_info_on_zatchup==2){
          this.router.navigate(['user/add-more-standard']);
        }else if(response.check_school_info_on_zatchup==3){
          this.router.navigate(['user/add-new-course']);
        }
         
      } else {
        this.SpinnerService.hide();
        var errorCollection = '';
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)) {
            errorCollection = errorCollection + response.error[key][0] + '\n'

          }
        }
        alert(errorCollection);
      }
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);

    });
  } catch (err) {
    this.SpinnerService.hide();

  }

}
}
