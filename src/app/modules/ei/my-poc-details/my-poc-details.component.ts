import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-my-poc-details',
  templateUrl: './my-poc-details.component.html',
  styleUrls: ['./my-poc-details.component.css']
})
export class MyPocDetailsComponent implements OnInit {
  poc_details: any;
  zatchup_details: any;
  errorDisplay: any = {};
  modal: any = {};
  contactSummery: any

  constructor(
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private validationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    this.modal['issue'] = '';
    this.getPocDetails();
    this.getContactSummery()
  }

  getPocDetails() {
    this.loader.show()
    this.baseService.getData('admin/get_contact_details/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.poc_details = res.data.poc_details;
          this.zatchup_details = res.data.excalation_details
        } else {
          this.alert.error(res.error.message, "Error")
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err.message, "Error")
      this.loader.hide()
    }
  }

  sendMessage() {
    this.errorDisplay = {}
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false);
    if (this.errorDisplay.valid)
      return false

    this.loader.show();
    this.baseService.action('admin/add_contact_details/', this.modal).subscribe(
      (res: any) => {
        if (res.status == true){
          this.alert.success(res.message, "Success")
          this.getContactSummery();
        }
        else
          this.alert.error(res.error.message, 'Error')
        this.loader.hide()
      }
    ),error => {
        this.alert.error(error.message, "Error");
        this.loader.hide();
      }
  }

  getContactSummery() {
    this.loader.show()
    this.baseService.getData('admin/contact_query_list_user/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.contactSummery = res.results;
        } else {
          this.alert.error(res.error.message, "Error")
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err.message, "Error")
      this.loader.hide()
    }
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

}
