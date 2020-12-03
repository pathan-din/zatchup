import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from '../../../services/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-user-school-confirmation',
  templateUrl: './user-school-confirmation.component.html',
  styleUrls: ['./user-school-confirmation.component.css']
})
export class UserSchoolConfirmationComponent implements OnInit {

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
    private alert :NotificationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.schoolId = params['school_id'];
      this.model.school_id=this.schoolId;
      this.getUserconfirmationBySchoolDetails();
    });
  
  }

  goToUserCongratulationPage() {
    this.router.navigate(['user/ei-profile'],{queryParams:{'school_id':this.schoolId}});
 }
 redirectToCurrentlyStudent(){
  $("#currentStatusModel").modal({
    backdrop: 'static',
    keyboard: false
  });
 }
 
 getUserconfirmationBySchoolDetails()
  {
    try{
     this.SpinnerService.show(); 
      /***************Add Heighest Qualification Api*****************************/
     this.baseService.action('user/get-ei-detail-for-already-students/',this.model).subscribe(res => {
        
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if(response.status== false)
        {
          this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService,response.error);
          this.alert.error(this.errorDisplay,'Error');
          this.router.navigate(['user/kyc-verification']);
          return;

        }
        this.studentsConfirmation = response.data;

        this.schoolId= response.data.school_id;
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
        });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  areYouCurrentlyStudentFunction(isStudent) {
    
    this.addRole(isStudent);
  }
  addRole(isStudent)
  {
       try {

      this.SpinnerService.show();

      let data:any={};
      data.is_currently_student= isStudent?1:0;
      this.baseService.action('user/add-role/',data).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          $("#currentStatusModel").modal('hide');
         if(isStudent == 'yes')
         {
          this.router.navigate(['user/qualification'], {queryParams: {'title': 'What are you currently studying?'},   skipLocationChange: true});
         }else{
          this.router.navigate(['user/qualification'], {queryParams: {'title': 'Your highest level of education?'}, skipLocationChange: true});
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
