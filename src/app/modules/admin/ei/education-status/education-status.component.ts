import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private location: Location,
    private validationService: GenericFormValidationService
  ) {
    this.educationInstitute = new EducationInstitute()
  }

  ngOnInit(): void {
    this.educationInstitute.id = this.route.snapshot.params.id;
    console.log('id is as ::', this.educationInstitute.id)
    this.getAllState();
    this.getNumberOfStudentList();
    if (this.educationInstitute.id)
      this.getById()

  }

  getById() {
    this.baseService.getData('admin/ei/get_ei_detail_not_onZatchUp/' + this.educationInstitute.id).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.educationInstitute.name_of_school = res.data.name_of_school;
          this.educationInstitute.city = res.data.city;
          this.educationInstitute.address1 = res.data.address1
          this.educationInstitute.address2 = res.data.address2
          this.educationInstitute.pincode = res.data.pincode
          this.educationInstitute.landmark = res.data.landmark
          this.educationInstitute.students = res.data.no_of_students
          this.educationInstitute.university = res.data.university
          if (this.educationInstitute.allStates) {
            let state = this.educationInstitute.allStates.find(val => {
              return val.state.toLowerCase() == res.data.state.toLowerCase()
            })
            if (state) {
              this.educationInstitute.stateId = state.id;
              this.getCities();
            }
            console.log('state find data is as ::', state)
          }
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
      "no_of_students": this.educationInstitute.students
    }
    this.loader.show()
    this.baseService.action('admin/add-ei/', data).subscribe(
      (res: any) => {
        if (res.status == true && res.is_exists == false) {
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/school-management'])
        }
        else if (res.status == true && res.is_exists == true) {
          this.alert.error(res.error.message[0], 'Error')
          this.educationInstitute.isExists = res.is_exists
        }
        else if (res.status == false && res.is_exists == true) {
          this.alert.error(res.error.message[0], 'Error')
          this.educationInstitute.isExists = false
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


  addEIDatabaseAnyway() {
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
      "no_of_students": this.educationInstitute.students
    }
    this.loader.show()
    this.baseService.action('admin/add-ei-database-anyway/', data).subscribe(
      (res: any) => {
        if (res.status == true && res.is_exists == false) {
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/school-management'])
        }
        else if (res.status == true && res.is_exists == true) {
          this.alert.error(res.error.message[0], 'Error')
          this.educationInstitute.isExists = res.is_exists
        }
        else if (res.status == false && res.is_exists == true) {
          this.alert.error(res.error.message[0], 'Error')
          this.educationInstitute.isExists = false
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
        if (this.educationInstitute.id && this.educationInstitute.allCities) {
          let city = this.educationInstitute.allCities.find(val => {
            return val.city == this.educationInstitute.city
          })
          if (city)
            this.educationInstitute.cityId = city.id;
        }
      }
    )
  }

  cancelEducationInstitute() {
    this.router.navigate(['admin/school-management'])
  }

  goBack() {
    this.location.back()
  }

  getNumberOfStudentList() {
    try {
      this.loader.show();
      this.baseService.getData('ei/getnumberofstudent/').subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.educationInstitute.numberOfStudentList = res.results;
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')

        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }

  }

  add() {
    if (this.educationInstitute.id)
      this.updateEI()
    else
      this.addEducationInstitute()
  }

  updateEI() {
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

    let data = {
      "name_of_school": this.educationInstitute.name_of_school,
      "state": state ? state.state : '',
      "city": city ? city.city : '',
      "address1": this.educationInstitute.address1,
      "address2": this.educationInstitute.address2,
      "landmark": this.educationInstitute.landmark,
      "pincode": this.educationInstitute.pincode,
      "university": this.educationInstitute.university,
      "no_of_students": this.educationInstitute.students
    }
    this.baseService.actionForPutMethod('admin/ei/get_ei_detail_not_onZatchUp/'+ this.educationInstitute.id, data).subscribe(
      (res: any) => {
        if (res.status == true) {
          // console
          this.alert.success(res.message, 'Success');
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

}
