import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PocDetails } from '../common/poc.model';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';

@Component({
  selector: 'app-edit-poc-details',
  templateUrl: './edit-poc-details.component.html',
  styleUrls: ['./edit-poc-details.component.css']
})
export class EditPocDetailsComponent implements OnInit {
  zatchup_details: any;
  errorDisplay: any = {}
  pocDetails: PocDetails;

  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private validationService: GenericFormValidationService
  ) {
    this.pocDetails = new PocDetails();
  }

  ngOnInit(): void {
    this.getPocDetails()
  }

  getPocDetails() {
    this.loader.show()
    this.baseService.getData('admin/get_contact_details/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.zatchup_details = res.data.excalation_details;
          this.pocDetails.id = this.zatchup_details.id
          this.pocDetails.name = this.zatchup_details.name;
          this.pocDetails.number = this.zatchup_details.number;
          this.pocDetails.email_id = this.zatchup_details.email_id;
          this.pocDetails.pan_number = this.zatchup_details.pan_number;
          this.pocDetails.gst_details = this.zatchup_details.gst_details;
          this.pocDetails.registered_office_address = this.zatchup_details.registered_office_address
          console.log('poc details >>>>', this.pocDetails)
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

  editPoc() {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show()
      this.baseService.action('admin/update_escalation_details/', this.pocDetails).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success");
            this.location.back();
          } else {
            this.alert.error(res.error.message[0], "Error")
          }
          this.loader.show()
        }
      )
    } catch (e) {
      this.loader.hide()
    }

  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

}
