import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  countJson: any;
  filteredResponse: any;
  constructor(private genericFormValidationService: GenericFormValidationService, private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService) { }

  ngOnInit(): void {
    this.getDashboardCount();
  }

  getDashboardCount() {
    this.error = [];
    try {
      /**Api For the dashboard count */

      this.SpinnerService.show();

      this.adminService.displayCourseList().subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          this.countJson = response.data;
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          errorCollection = this.adminService.getErrorResponse(this.SpinnerService, response.error);
          alert(errorCollection);

        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  filterRecords() {
    this.error = [];
    this.errorDisplay = {};
    // this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }
    this.model = {
      "from_date": "2020-10-01",
      "to_date": "2020-10-10"
    }
    try {
      /**Api For the record filter */

      this.SpinnerService.show();

      this.adminService.getFilterdRecords(this.model).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          this.filteredResponse = response.data;
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          errorCollection = this.adminService.getErrorResponse(this.SpinnerService, response.error);
          alert(errorCollection);
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

}
