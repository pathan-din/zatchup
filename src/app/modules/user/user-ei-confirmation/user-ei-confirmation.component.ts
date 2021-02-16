import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
declare var $: any;

@Component({
  selector: 'app-user-ei-confirmation',
  templateUrl: './user-ei-confirmation.component.html',
  styleUrls: ['./user-ei-confirmation.component.css']
})

export class UserEiConfirmationComponent implements OnInit {
  @ViewChild('clickOtpModel') clickOtpModel: any

  model: any = {};
  editmodel: any = {};
  /*Using Validation For Manage Error Concept*/
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  confirmationDetails: any = [];
  /*Qualification Master*/
  studentsConfirmation: any = [];
  school_id: any = "";
  standard_id: any;
  classList: any[];
  currentDate: any;
  isalumini: any;
  editArr = [];
  getkeyCalander: any;
  standard: any = {};
  todate: any;
params:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public baseService: BaseService,
    public eiService: EiServiceService,
    private genericFormValidationService: GenericFormValidationService,
    public formBuilder: FormBuilder,
    private confirmDialogService: ConfirmDialogService,
    public alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.todate = new Date();
    this.todate = this.baseService.getDateFormat(this.todate);
    this.editmodel.class_id = '';
    this.route.queryParams.subscribe(parrams => {
      this.params=parrams;
      if (parrams['school_id']) {
        this.school_id = parrams['school_id'];
        this.isalumini = parrams['isalumini'];
       
         
      }
    })
    if(this.params.add_course){
      // setTimeout(() => {
      //   this.clickOtpModel.nativeElement.click();
      // }, 500);
      
        
    }
    this.getConfirmationDetails();
    this.currentDate = new Date();
  }

  editCourse(standard, school_id, courseid) {
   

    if (standard[standard.length - 1].is_current_standard) {
      this.router.navigate(['user/ei-profile'], { queryParams: { "school_id": school_id, "course_id": courseid, "edit_course":"true", "returnUrl": "user/ei-confirmation" } });
    } else {
      this.router.navigate(['user/add-more-standard'], { queryParams: { "school_id": school_id, "course_id": courseid, "edit_course":"true", "returnUrl": "user/ei-confirmation" } });
    }

  }
  goToUserProfileCreatedPage() {
    $("#OTPModel").modal('hide');
    if (this.params.returnUrl)
    this.router.navigate([this.params.returnUrl])
    else if(localStorage.getItem("addcourse")){
      this.router.navigate(['user/my-educational-profile']);
    }else if(localStorage.getItem("editcourse")){
      this.router.navigate(['user/my-educational-profile']);
    }
    else{
      this.router.navigate(['user/add-personal-info']);
    }
    

    

  }
  /**Delete Course  */

  deleteCourse(id: any): any {
    this.confirmDialogService.confirmThis('Are you sure to delete ?', () => {
      this.SpinnerService.show()
      let model: any = {};
      model.course_id = id;
      this.baseService.action('user/delete-course-standard-detail-by-student/', model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getConfirmationDetails();
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.SpinnerService.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.SpinnerService.hide();
      }
    }, () => {
    });
  }

  deleteStandard(standard_id) {
    try {
      let model: any = {};
      model.standard_id = standard_id;
      this.SpinnerService.show()
      this.baseService.action("user/delete-standard-detail-by-student/", model).subscribe(res => {
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide()

          this.alert.success(response.message, "Success");
          $("#verifiedModel").modal("hide");
          this.getConfirmationDetails();
        } else {
          this.SpinnerService.hide();
          var error = this.eiService.getErrorResponse(this.SpinnerService, response.error);
          this.alert.error(error, "Error");

        }

      }, (error => {

        this.SpinnerService.hide()
        this.alert.error(error.error, "Error");
      }))
    } catch (e) {
      this.alert.error(e.error, "Error");
    }
  }

  closeModel() {
    $("#verifiedModel").modal("hide");
  }
  openModel(standard_id) {


    this.standard_id = standard_id;
    $("#verifiedModel").modal({
      backdrop: 'static',
      keyboard: false
    });
  }
  openEditModel(event, standard) {

    this.standard = standard;
    standard.check = true;

    //this.standard.class_id='';


    if (standard.is_current_standard && standard.class_detail.length > 0) {
      this.editmodel.class_id = standard.class_detail[0].class_id;
    }
    this.editmodel.standard_id = standard.standard_id;
    this.editmodel.standard_start_year = standard.org_start_date;
    this.editmodel.standard_end_year = standard.org_end_date;

    if (standard.class_detail.length > 0) {
      //this.editmodel.class_id = standard.class_detail[0].class_id;

    }
    this.displayClassList(standard.standard_id);

  }
  editStandardDetails(text, event) {



    // this.errorDisplay = {};
    // this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[1].elements, false, []);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }
    try {

      this.SpinnerService.show();
      this.editmodel.standard_start_year = this.baseService.getDateFormat(this.editmodel.standard_start_year)
      this.editmodel.standard_end_year = this.baseService.getDateFormat(this.editmodel.standard_end_year)
      if (text == 'start_year') {
        this.editmodel.standard_start_year = event ? this.baseService.getDateFormat(event) : this.baseService.getDateFormat(this.editmodel.standard_start_year)
      } else if (text == 'end_year') {
        this.editmodel.standard_end_year = event ? this.baseService.getDateFormat(event) : this.baseService.getDateFormat(this.editmodel.standard_end_year)

      }


      this.baseService.action("user/edit-course-standard-detail-by-student/", this.editmodel).subscribe(res => {
        let response: any = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          $("#personalInfoModel").modal("hide");
          this.alert.success("Data edit successfully", "Success");
          this.getConfirmationDetails();
        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error.message[0], "Error");
        }
      }, (error => {
        this.SpinnerService.hide();
      }))
    } catch (error) {
      this.SpinnerService.hide();
    }

  }
  displayClassList(stId) {
    try {
      this.SpinnerService.show();
      this.classList = [];
      let data: any = {};
      data.standard_id = stId;
      this.baseService.getData('user/class-list-by-standardid/', data).subscribe(res => {

        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.classList = response.results;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  addPastEi() {
    $("#OTPModel").modal('hide');
    if(this.params.returnUrl){
      this.router.navigate(['user/add-ei'], { queryParams: { "title": "past", "returnUrl": "user/ei-confirmation" } });
    }else{
      this.router.navigate(['user/add-ei'], { queryParams: { "title": "past" } });
    }
    
  }
  addAnotherCourse() {
    $("#OTPModel").modal("hide");
    if(this.params.returnUrl){
      this.router.navigate(['user/add-ei'], { queryParams: { "title": "current", "returnUrl": "user/ei-confirmation" } });
    }else{
      this.router.navigate(['user/add-ei'], { queryParams: { "title": "current" } });
    }
    
  }
  getConfirmationDetails() {
    try {
      this.SpinnerService.show();

      this.baseService.getData('user/get-ei-course-confirmation-list/').subscribe(
        (res: any) => {

        // let response: any = {};
        // response = res;
        if (res.status == true) {
          this.SpinnerService.hide();
          this.confirmationDetails = res.data;
          localStorage.setItem("role", "0");
          
          if(this.confirmationDetails.length <= 0)
            // this.clickOtpModel.nativeElement.click();
          this.confirmationDetails.forEach(elementCourse => {
            

            elementCourse.ei_detail.course_detail.forEach(elementS => {
              if (elementS.standard_detail) {
                elementS.standard_detail.forEach(ele => {
                  if (ele.is_current_standard) {
                    localStorage.setItem("role", "1");
                  }

                });
              }
            });

          });
        } else {
          this.SpinnerService.hide();
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
}
