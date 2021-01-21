import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  errorDisplay: any = {};
  model: any = {};

  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    try {
      this.loader.show()
      let data = this.model
      this.baseService.action('admin/reset_password/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success");
            this.location.back()
          }
          else {
            if (res.error)
              this.alert.error(res.error.message, "Error")
            else{
              let error =  this.baseService.getErrorResponse(this.loader, res)
              this.alert.error(error, "Error")
            }
          }
          this.loader.hide()
        }
      ), err => {
        this.loader.hide()
      }
    }
    catch (e) {
      this.alert.error(e, "Error")
      // console.log("Something Went Wrong!")
    }
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  goBack() {
    this.location.back()
  }

}
