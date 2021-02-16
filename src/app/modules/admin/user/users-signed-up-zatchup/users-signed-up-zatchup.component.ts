import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SignupUsers } from '../modals/admin-user.modal';


@Component({
  selector: 'app-users-signed-up-zatchup',
  templateUrl: './users-signed-up-zatchup.component.html',
  styleUrls: ['./users-signed-up-zatchup.component.css']
})
export class UsersSignedUpZatchupComponent implements OnInit {
  signupUsers: SignupUsers
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe,
  ) {
    this.signupUsers = new SignupUsers();
    this.signupUsers.maxDate = new Date();
  }
  ngOnInit(): void {
    this.signupUsers.filterParams = this.route.snapshot.queryParamMap.get("filterParams");
    if(this.signupUsers.filterParams)
    {
      this.signupUsers.filterFromDate = JSON.parse(this.signupUsers.filterParams).from_date;
      this.signupUsers.filterToDate = JSON.parse(this.signupUsers.filterParams).to_date;
    }

    if(this.signupUsers.lastLoginParams)
    {
      debugger
      this.signupUsers.loginFromDate = JSON.parse(this.signupUsers.lastLoginParams).start_date;
      this.signupUsers.loginToDate = JSON.parse(this.signupUsers.lastLoginParams).end_date;
    }
    this.getSignupUsersList('');
    this.getAllState();
    this.signupUsers.pageCount = this.baseService.getCountsOfPage()
  }

  getSignupUsersList(page?: any) {
    this.loader.show();
    this.signupUsers.listParams = {
      'start_date': this.signupUsers.filterFromDate !== undefined ? this.datePipe.transform(this.signupUsers.filterFromDate, 'yyyy-MM-dd') : '',
      'end_date': this.signupUsers.filterToDate !== undefined ? this.datePipe.transform(this.signupUsers.filterToDate, 'yyyy-MM-dd') : '',
      'last_login_from': this.signupUsers.loginFromDate !== undefined ? this.datePipe.transform(this.signupUsers.loginFromDate, 'yyyy-MM-dd') : '',
      'last_login_to': this.signupUsers.loginToDate !== undefined ? this.datePipe.transform(this.signupUsers.loginToDate, 'yyyy-MM-dd') : '',
      "kyc_aprroved": this.signupUsers.kycApproved !== undefined ? this.signupUsers.kycApproved : '',
      "is_disabled": this.signupUsers.status !== undefined ? this.signupUsers.status : '',
      "school_verified": this.signupUsers.schoolStatus !== undefined ? this.signupUsers.schoolStatus : '',
      "zatchupId": this.signupUsers.zatchupId,
      "page_size": this.signupUsers.page_size,
      "page": page,
    }

    this.baseService.getData('admin/user/signed_up_users_list/', this.signupUsers.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.signupUsers.config.currentPage
          this.signupUsers.startIndex = res.page_size * (page - 1) + 1;
          this.signupUsers.page_size = res.page_size
          this.signupUsers.config.itemsPerPage = this.signupUsers.page_size
          this.signupUsers.config.currentPage = page
          this.signupUsers.config.totalItems = res.count;
          if (res.count > 0) {
            this.signupUsers.dataSource = res.results
          }
          else
            this.signupUsers.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }
  generateExcel() {
    delete this.signupUsers.listParams.page_size;
    delete this.signupUsers.listParams.page;
    this.baseService.generateExcel('admin/user/export_signed_up_users_list/', 'signup-users', this.signupUsers.listParams);
  }

  goBack() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

  userProfile(id: any) {
    this.router.navigate(['admin/user-profile', id], { queryParams: { returnUrl: 'admin/signed-up-users' } })
  }
  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.signupUsers.allStates = res.results
      }
    )
  }
  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.signupUsers.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.signupUsers.allCities = res.results
      }
    )
  }
}
