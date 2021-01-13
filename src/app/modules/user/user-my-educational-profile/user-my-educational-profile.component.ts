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
  constructor(
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.model = {};
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


    this.editModel = {};
    //this.model=label;
    this.model.dob = label.dob;//this.baseService.getDateReverseFormat()
    this.model.email = label.email;
    this.model.first_name = label.first_name;
    this.model.last_name = label.last_name;
    this.editModel.key = key;
    this.editModel.old_value = value;
    this.editModel.value = value;

  }
  setModelValue(key) {
    this.editModel.value = key;
    console.log(this.editModel);

  }
  /**Edit Personal Details */
  submitPersonalDetails() {
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    if (this.errorDisplay.valid) {
      return false;
    } else {
      try {
        this.loader.show();
        this.baseService.action('user/request-change-user-detail-by-ei/', this.editModel).subscribe(res => {
          let response: any = {};
          response = res;
          if (response.status == true) {
            this.loader.hide();
            this.alert.success(response.message, 'success');
            this.closeModal.nativeElement.click()
            //location.reload();
          } else {
            this.alert.error(response.error.message[0], 'Error');
          }
        }, (error => {
          this.loader.hide();
        }))
      } catch (e) {

      }
    }
  }
  getEducationalProfile() {
    this.loader.show()
    let url = 'user/student-education-profile/'
    this.baseService.getData(url).subscribe(
      (res: any) => {
        if (res.status == true)
          this.epData = res.data
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
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
    try {
      this.loader.show();
      this.baseService.getData("ei/request-change-student-list-of-ei/").subscribe((res:any)=>{
        if(res.status == true){
          this.loader.hide();
          this.requestChangeDetails = res.results;
        }else{
          this.loader.hide();
        }

      },(error)=>{
        this.loader.hide();
      })
    } catch (e) {
      this.loader.hide();
    }
  }
}
