import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EducationInstitute } from '../modals/education-institute.modal';


@Component({
  selector: 'app-education-status',
  templateUrl: './education-status.component.html',
  styleUrls: ['./education-status.component.css']
})
export class EducationStatusComponent implements OnInit {
  errorDisplay: any = {};
  educationInstitute: EducationInstitute

  constructor(
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
    private validationService: GenericFormValidationService
  ) {
    this.educationInstitute = new EducationInstitute()
  }

  ngOnInit(): void {
    this.getAllState();  }

  addEducationInstitute() {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    let state = this.educationInstitute.allStates.find(val => {
      return val.id == this.educationInstitute.stateId
    })

    let city = this.educationInstitute.allCities.find(val => {
      return val.id == this.educationInstitute.cityId
    })
    // debugger
    let data = {
      "name_of_school": this.educationInstitute.name_of_school,
      "state": state ? state.state : '',
      "city": city ? city.city : '',
      "address1": this.educationInstitute.address1,
      "address2": this.educationInstitute.address2,
      "landmark": this.educationInstitute.landmark,
      "pincode": this.educationInstitute.pincode,
      "university": this.educationInstitute.university,
      "no_of_students": parseInt(this.educationInstitute.no_of_students)
    }
    this.loader.show()
    this.baseService.action('admin/add-ei/', data).subscribe(
      (res: any) => {
        console.log('res is as ::', res)
        if (res.status == true) {
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/school-management'])
        }
        else {
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error')
      this.loader.hide()
    }
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.educationInstitute.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.educationInstitute.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.educationInstitute.allCities = res.results
      }
    )
  }

  cancelEducationInstitute() {
    this.router.navigate(['admin/school-management'])
  }

}
