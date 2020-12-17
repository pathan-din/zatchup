import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { ContactUs } from '../modal/contact-us.mdal';


@Component({
  selector: 'app-ei-contact-us',
  templateUrl: './ei-contact-us.component.html',
  styleUrls: ['./ei-contact-us.component.css']
})
export class EiContactUsComponent implements OnInit {
  contactUs: ContactUs

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private validationService: GenericFormValidationService
  ) {
    this.contactUs = new ContactUs()
  }

  ngOnInit(): void {
    this.getAllState();
  }

  /************************** */
  isValid() {
    this.contactUs.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
  }

  submit() {
    this.contactUs.errorDisplay = {};
    this.contactUs.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.contactUs.errorDisplay.valid) {
      return false;
    }

    let stateFind: any;
    let cityFind: any;
    // let schoolFind: any;
    if (this.contactUs.allStates && this.contactUs.stateId) {
      stateFind = this.contactUs.allStates.find(val => {
        return val.id == this.contactUs.stateId
      })
    }

    if (this.contactUs.allCities && this.contactUs.cityId) {
      cityFind = this.contactUs.allCities.find(val => {
        return val.id == this.contactUs.cityId
      })
    }

    // if (this.contactUs.allSchools && this.contactUs.schoolId) {
    //   schoolFind = this.contactUs.allSchools.find(val => {
    //     return val.id == this.contactUs.schoolId
    //   })
    // }

    let data = {
      "state": stateFind ? stateFind.state : undefined,
      "city": cityFind ? cityFind.city : undefined,
      "name_of_school": this.contactUs.schoolName,
      "fullAddress": this.contactUs.fullAddress,
      "university": this.contactUs.university,
      "issue": this.contactUs.issue,
      "message": this.contactUs.message,
      "type": this.contactUs.zatchupId ? 'zatchup' : 'state_city',
      "zatchupId": this.contactUs.zatchupId
    }
    this.loader.show()
    this.baseService.action('admin/add_contact_not_signedup/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.router.navigate(['ei/login']);
          this.alert.success(res.message, "Success");
        }
        else {
          this.alert.error(res.error.message[0], "Error")
        }
        this.loader.hide()
      }
    ), (err: any) => {
      this.alert.error(err.message, "Error")
      this.loader.hide();
    }
  }

  getAllState() {
    this.loader.show()
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.contactUs.allStates = res.results
        this.loader.hide()
      }
    )
  }
  getCities() {
    this.loader.show()
    this.baseService.getData('user/getcitybystateid/' + this.contactUs.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.contactUs.allCities = res.results
        this.loader.hide()
      }
    )
  }

  getSchools() {
    this.loader.show()
    this.baseService.getData('ei/getschoollistwithcity/' + this.contactUs.cityId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.contactUs.allSchools = res.results
        this.loader.hide()
      }
    )
  }

  getUniversityOrBoardName(){
    let schoolFind = this.contactUs.allSchools.find(val =>{
      return val.id == this.contactUs.schoolId
    })

    if(schoolFind)
    {
      this.contactUs.university = schoolFind.university;
      this.contactUs.schoolName = schoolFind.name_of_school
    }
  }

}
