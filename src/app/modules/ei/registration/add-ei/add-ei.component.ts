import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';

import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../../services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

declare var $: any;

@Component({
  selector: 'app-add-ei',
  templateUrl: './add-ei.component.html',
  styleUrls: ['./add-ei.component.css']
})
export class AddEiComponent implements OnInit {
  model: any = {};
  modelZatchup: any = {};
  stateList: any = [];
  cityList: any = [];
  schoolList: any = [];
  error: any = [];
  errorDisplay: any = {};
  name_of_school_others: any = '';
  name_of_school_first: any = '';
  params: any;
  isDisabled: boolean = true
  data: any;

  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    private alert: NotificationService,
    public formBuilder: FormBuilder,
    private genericFormValidationService: GenericFormValidationService,
    private confirmDialogService : ConfirmDialogService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    // this.getEiDetailsBySchoolId();
    var add = this.route.snapshot.queryParamMap.get('add_school')
    if(add != 'true'){
      this.getSchoolConfirmationAfterLogout()
    }
    else{
      this.getEiDetailsBySchoolId();
    }
    this.getAllState();
    this.model.state = '';
    this.model.city = '';
   
  }

  getEiDetailsBySchoolId() {
    try {
      this.baseService.action("user/get-school-detail-schoolid/", { school_id: this.params.school_id }).subscribe((res: any) => {
        if (res.status == true) {
          this.modelZatchup.zatchup_id = res.data.school_code;
          this.model.state = '';
          this.model.city = '';
          this.getDataByZatchupId();
        }
      })
    } catch (e) {

    }
    //
  }

  goToUserEiProfilePage() {
    this.router.navigate(['ei/ei-profile']);
  }
  /****************Get All State Function*************************/
  getAllState() {
    //getallstate
    try {
      this.SpinnerService.show();

      this.eiService.getallstate(this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.stateList = response.results;


        this.SpinnerService.hide();

      }, (error) => {
        this.SpinnerService.hide();

        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  /*******************************End ********************************/
  /****************Get City By State Function*************************/
  getCityByState(state) {
    //getallstate
    //this.isValid(event);
    let obj: any = {};
    obj = this.stateList.find(o => o.state.toLowerCase() === state.toLowerCase());

    try {
      this.SpinnerService.show();

      this.eiService.getCityByStateId(obj.id).subscribe(res => {

        let response: any = {};
        response = res;
        this.cityList = response.results;


        this.SpinnerService.hide();

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
  
  goToUserQualificationPage() {
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {

      this.SpinnerService.show();
      if (this.name_of_school_first == 'Others') {
        this.model.name_of_school = this.name_of_school_others;
      } else {
        this.model.name_of_school = this.name_of_school_first;
        this.name_of_school_others = '';
      }
      /***********************Mobile Number OR Email Verification Via OTP**********************************/

      this.baseService.action('subadmin/add-ei/', this.model).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.router.navigate(['ei/subadminprofile'], {queryParams: {'school_id': this.route.snapshot.queryParamMap.get('school_id')}});
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          this.alert.error(errorCollection, 'Error');
        }
      }, (error) => {
        this.SpinnerService.hide();
        this.alert.error(error, 'Error');


      });
    } catch (err) {
      this.SpinnerService.hide();

    }

  }
  getSchoolListBycityId(city) {
    //getallstate
    //this.isValid(document.forms);
    let obj = this.cityList.find(o => o.city.toLowerCase() === city.toLowerCase());
    try {
      this.SpinnerService.show();

      this.eiService.getSchoolListByCity(obj.id).subscribe(res => {

        let response: any = {};
        response = res;
        this.schoolList = response.results;
        this.SpinnerService.hide();

      }, (error) => {
        this.SpinnerService.hide();


      });
    } catch (err) {
      this.SpinnerService.hide();

    }
  }
  getSchoolListBycity(id) {
    //getallstate
    //this.isValid(document.forms);

    try {
      this.SpinnerService.show();

      this.eiService.getSchoolListByCity(id).subscribe(res => {

        let response: any = {};
        response = res;
        this.schoolList = response.results;
        this.SpinnerService.hide();

      }, (error) => {
        this.SpinnerService.hide();


      });
    } catch (err) {
      this.SpinnerService.hide();

    }
  }
  changeSchool(schoolData) {

    if (schoolData != 'Others') {
      var ev = event;
      let obj = this.schoolList.find(o => o.name_of_school === schoolData);
      this.model.university = obj.university;
      this.model.full_address = obj.address1 + ' ' + obj.address2;
      this.model.address1 = obj.address1;
      this.modelZatchup.zatchup_id = obj.school_code;
      this.isDisabled = true
    } else {
      this.model.school_data = {};
      this.isDisabled = false
    }
  }
  /**Get data using zatchupId */
  getDataByZatchupId() {

    try {

      this.SpinnerService.show();
      if (!this.modelZatchup.zatchup_id) {
        this.alert.error("Enter Zatchup Id.", 'Error');

        return false;
      }
      this.baseService.action('user/get-school-detail-zatchupid/', this.modelZatchup).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          let model: any = {}
          model = response.data;
          this.getCityByState(model.state)
          this.getSchoolListBycity(model.city_id)
          this.model.city = model.city;
          this.name_of_school_first = model.name_of_school;

          this.model.state = model.state;
          this.model.full_address = model.address1 + ' ' + model.address2;
          this.model.address1 = model.address1;
          this.model.university = model.university;
          if (model.school_code) { this.modelZatchup.zatchup_id = model.school_code; }

        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          this.alert.error(errorCollection, 'Error');
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();

    }

  }
  /**End */
  goToUserEiProfileNotOnboardPage() {
    this.router.navigate(['user/ei-profileNotOnboard']);
  }

  getSchoolConfirmationAfterLogout(){
    try {
      this.SpinnerService.show()
      this.model = {
        'school_id': this.route.snapshot.queryParamMap.get('school_id') ? this.route.snapshot.queryParamMap.get('school_id') : ''
      }
      this.baseService.getData('subadmin/logout_view_status_sub_admin/', this.model).subscribe(
        (res:any) => {
          if(res.status == true){
            this.SpinnerService.hide()
            this.data = res.data
            this.data.approved = res.data.approved_by
            this.data.schoolId = res.data.school_id
            
            
            console.log(this.data.approved, 'approved');
            console.log(this.data.schoolId, 'school');
            
           
              if(this.data.approved == 0){
                this.router.navigate(['ei/subadmin-school-confirm'], {queryParams:{"school_id" : this.data.schoolId}})
              }
              else if(this.data.approved == 1){
                console.log();
                
                this.getEiDetailsBySchoolId()
              }
            
            

            
          }
          else{
            this.data = undefined
          }
          this.SpinnerService.hide()
        }
      )
    } catch (error) {
      this.SpinnerService.hide()
    }
  
}

goToContactUs(){
  this.confirmDialogService.confirmThis('Your employee education institution is not yet onboarded on ZatchUp. Are you sure you want to Continue?', () => {
    this.router.navigate(['user/login']);
  }, () => { }
  );
}

}
