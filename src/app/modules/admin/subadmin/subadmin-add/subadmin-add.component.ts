import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subadmin-add',
  templateUrl: './subadmin-add.component.html',
  styleUrls: ['./subadmin-add.component.css']
})
export class SubadminAddComponent implements OnInit {
  errorDisplay: any = {};
  model: any = {};
  maxDate: any;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private datePipe: DatePipe,
    private router: Router,
    private validationService: GenericFormValidationService
  ) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {
  }

  addSubadmin() {
    // debugger
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    try {
      this.loader.show()
      let data = this.model
      data.date_of_birth = this.datePipe.transform(data.date_of_birth, 'yyyy-MM-dd')
      this.baseService.action('admin/sub-admin/add_subadmin/', data).subscribe(
        (res: any) => {
          console.log('res is as ::', res)
          if (res.status == true){
            this.alert.success("Added successfully", "Success");
            this.router.navigate(['admin/subadmin-dashboard'])
          }
          else
            this.alert.error(res.error.message, "Error")
          this.loader.hide()
        }
      ),err =>{
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

  goBack(){
    this.location.back()
  }
}
