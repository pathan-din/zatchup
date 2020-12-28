import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from 'src/app/services/base/base.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-school-management',
  templateUrl: './admin-school-management.component.html',
  styleUrls: ['./admin-school-management.component.css']
})
export class AdminSchoolManagementComponent implements OnInit {
  responseJson: any;
  error: any;
  feeData: any;
  reportedEI: any;
  feeReceivedFromDate: any;
  feeReceivedToDate: any;
  reportedEiFromDate: any;
  reportedEiToDate: any;
  errorDisplay: any = {};
  maxDate: any;
  feeReceived: any;
  search: string = ''

  constructor(
    private validationService: GenericFormValidationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private alert: NotificationService
  ) {
    this.maxDate = new Date();
    console.log(this.router.url)
  }

  ngOnInit() {
    this.getDashboardCount();
  }

  getDashboardCount() {
    this.error = [];
    try {
      /**Api For the dashboard count */

      this.SpinnerService.show();

      this.baseService.getData('admin/ei/get_school_ei_dashboard_summary/').subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          this.responseJson = response.data;
          this.feeData = response.data.fees_received;
          this.reportedEI = response.data.reported;
        } else {
          this.SpinnerService.hide();
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


  goToAdminEIDatabase() {
    this.router.navigate(['admin/ei-database-list'], { queryParams: { returnUrl: 'admin/school-management' } })
  }

  goToEIOnboardedOnZatchupList(type: any) {
    this.router.navigate(['admin/onboarded-on-zatchup-list', type])
  }

  goToAdminEiManagementIncompleteOnBoardingPage() {
    this.router.navigate(['admin/ei-management-incomplete-onboarding']);
  }

  goToAdminEiAddedByUserNotOnZatchUpPage() {
    this.router.navigate(['admin/ei-management-added-by-user-not-to-zatchup']);
  }

  goToAdminEiManagementPendingForApprovalPage() {
    this.router.navigate(['admin/ei-management-pending-for-approval']);
  }

  changeDetailRequestsPending(){
    this.router.navigate(['admin/change-detail-requests-pending']);
  }

  rejectedEI(){
    this.router.navigate(['admin/rejected-ei-list']);
  }


  filteredFeeAndReported(fromDate: any, toDate: any, type: any, form: any) {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[form].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    let data = {
      "from_date": fromDate ? this.datePipe.transform(fromDate, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "to_date": toDate ? this.datePipe.transform(toDate, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "request_type": type ? type : ''
    }
    this.baseService.action('admin/ei/get_fees_reports_summary/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (type == 'Fee')
            this.feeData = res.data.fees_received
          else
            this.reportedEI = res.data.reported
        }
      }
    )
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  getFirstDay() {
    let date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  searchRoute() {
    if (this.search.length > 1)
      this.router.navigate(['admin/ei-search', this.search])
    else
      this.alert.error('Search text must be greater than 1 keyword', 'Error')
  }

  addEducationInstitute() {
    this.router.navigate(['admin/add-education-institute'])
  }
}
