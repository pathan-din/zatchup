import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
declare var $: any;

@Component({
  selector: 'app-user-my-educational-profile',
  templateUrl: './user-my-educational-profile.component.html',
  styleUrls: ['./user-my-educational-profile.component.css']
})
export class UserMyEducationalProfileComponent implements OnInit {
  @ViewChild('closeModal') closeModal: any;
  epData: any;
  model: any = {};
  editModel: any = {};
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any = [];
  requestChangeDetails: any;
  params:any;
  constructor(
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.model = {};
    $("#OTPModel").modal("hide");
    this.getEducationalProfile()
   
  }

  redirectWorkDetailesPage(id) {
    this.router.navigate(["user/work-detail"], { queryParams: { "id": id } });
  }
  addPastEi() {
    $("#OTPModel").modal('hide');
    this.router.navigate(['user/add-ei'], { queryParams: { "title": "past" } });
  }
  addAnotherCourse() {
    $("#OTPModel").modal("hide");
    this.router.navigate(['user/add-ei'], { queryParams: { "title": "current" } });
  }
  openModel(label, key, value) {
    console.log(label);
    

    this.editModel = {};
    if(key=='roll_no'){
      this.editModel.course_id = label.course_id 
    }
    if(key=='admission_number'){
      this.editModel.school_id  = label.school_id 
    }
    //this.model=label;
    this.model.dob = label.dob;//this.baseService.getDateReverseFormat()
    this.model.email = label.email;
    this.model.first_name = label.first_name;
    this.model.last_name = label.last_name;
    this.model.phone = label.phone;
    this.model.roll_no = label.roll_no;
    this.model.admission_number = label.admission_number;
    this.editModel.key = key;
    this.editModel.old_value = value?value:0;
    this.editModel.value = value?value:0;

  }
  setModelValue(key) {
    this.editModel.value = key;
    
  }
  goToDashboard() {
    var flagRequired = true;
    this.errorOtpModelDisplay = '';
    this.error = [];
    if (!this.model.otp1) {
      flagRequired = false;
    } else if (!this.model.otp2) {
      flagRequired = false;
    } else if (!this.model.otp3) {
      flagRequired = false;
    }
    else if (!this.model.otp4) {
      flagRequired = false;
    }
    if (flagRequired == false) {
      this.error.push("Please enter OTP!");
    }
    if (this.error.length > 0) {
      this.errorOtpModelDisplay = this.error.join('\n');
      return;
    }
    try {
      let data: any = {};
      data.key = this.editModel.key;
      data.value = this.editModel.value;
      data.verify_otp_no = this.model.otp1 + this.model.otp2 + this.model.otp3 + this.model.otp4;
  
      this.baseService.action('user/user-request-verify-otp-detail-change/',data).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          
          $("#OTPModel").modal('hide');
          this.alert.success('Request has been sent for approved','Success');
          location.reload();
          //
          
        } else {
          this.errorOtpModelDisplay = response.error.message;
          this.alert.error(this.errorOtpModelDisplay,'Error');
        }
      }, (error) => {
        console.log(error);
  
      });
    } catch (err) {
      console.log("vaeryfy Otp Exception", err);
    }
  
  }
  changeInput($ev) {
    console.log($ev);
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }
  
  }
  /**Edit Personal Details */
  submitPersonalDetails() {
    
    
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    if (this.errorDisplay.valid) {
      return false;
    } else {

      try {
        var url = 'user/request-change-user-detail-by-ei/';
        if(this.editModel.key=='dob'){
          this.editModel.value = this.baseService.getDateFormat(this.model[this.editModel.key]);  
        }else if(this.editModel.key=='admission_number'){
          url='user/edit-admission-roll-no/';
          this.editModel.value = this.model[this.editModel.key];  
        }else if(this.editModel.key=='roll_no'){
          url='user/edit-admission-roll-no/';
          this.editModel.value = this.model[this.editModel.key];  
        }else if(this.editModel.key=='name'){
          
          this.editModel.value =  this.model.first_name +'&'+this.model.last_name
        }

        else{
          this.editModel.value = this.model[this.editModel.key];
          
            
        }
       
        
        this.loader.show();
        this.baseService.action(url, this.editModel).subscribe(res => {
          let response: any = {};
          response = res;
          if (response.status == true) {
            this.loader.hide();
            $("#personalInfoModel").modal('hide');
            if(this.editModel.key=='email' || this.editModel.key=='phone'){
              $("#OTPpModel").modal({
                backdrop:'static',
                keyboard: false
              });
            }else{
              this.loader.hide();
              this.alert.success(response.message, 'success');
              this.closeModal.nativeElement.click()
            }
           
            //location.reload();
          } else {
            this.loader.hide();
            var error = this.baseService.getErrorResponse(this.loader,response.error)
            this.alert.error(error, 'Error');
          }
        }, (error => {
          this.loader.hide();
        }))
      } catch (e) {

      }
    }
  }
  redirectKYCPage(text,value){
    if(text=='name'){
      localStorage.setItem("kyc_name",value);
    }else if(text=='dob'){
      var data = value.split('-');
      localStorage.setItem("year",data[0]);
      localStorage.setItem("month",data[1]);
      localStorage.setItem("day",data[2]);
    }
    this.router.navigate(['user/kyc-verification'], { queryParams: {"action":"sendrequest","returnUrl": "user/my-educational-profile" } });
  }
  getEducationalProfile() {
    try {
      this.loader.show()
      let url = 'user/student-education-profile/'
      this.baseService.getData(url).subscribe(
        (res: any) => {
          if (res.status == true){
            this.loader.hide()
            this.epData = res.data
          }
          
          else{
            this.alert.error(res.error.message[0], 'Error')
            this.loader.hide()
          }
           
        }
      ), err => {
        this.loader.hide();
        this.alert.error(err, 'Error')
      }
    } catch (e) {
      this.loader.hide()
    }
   
  }
  /**Add MOre COurse Function */
  addMoreCourse(data: any, school_id: any){
    if (data.is_current_course == true) {
      this.router.navigate(['user/ei-confirmation'], { queryParams: { "school_id": school_id, "course_id": data.course_id, "add_course":"true", "returnUrl": "user/my-educational-profile" } });
    } else {
      this.router.navigate(['user/ei-confirmation'], { queryParams: { "school_id": school_id, "course_id": data.course_id, "add_course":"true", "returnUrl": "user/my-educational-profile" } });
    }
  }

  editCourse(data: any, school_id: any) {  
    if (data.is_current_course == true) {
      this.router.navigate(['user/ei-confirmation'], { queryParams: { "school_id": school_id, "course_id": data.course_id, "edit_course":"true", "returnUrl": "user/my-educational-profile" } });
    } else {
      this.router.navigate(['user/ei-confirmation'], { queryParams: { "school_id": school_id, "course_id": data.course_id, "edit_course":"true", "returnUrl": "user/my-educational-profile" } });
    }
    // this.router.navigate(['user/ei-profile'], { queryParams: { "school_id": school_id, "course_id": courseid, "edit_course":"true", "returnUrl": "user/my-educational-profile" } });
  }
  getRequestChangeDetails(){
this.router.navigate(["user/pending-request/"]);
  }
}
