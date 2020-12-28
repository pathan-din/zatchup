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
    this.getSignupUsersList('');
    this.getAllState();
  }

  getSignupUsersList(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.signupUsers.allStates && this.signupUsers.stateId) {
      stateFind = this.signupUsers.allStates.find(val => {
        return val.id == this.signupUsers.stateId
      })
    }
    if (this.signupUsers.allCities) {
      cityFind = this.signupUsers.allCities.find(val => {
        return val.id == this.signupUsers.cityId
      })
    }
    this.signupUsers.listParams = {
      'date_from': this.signupUsers.filterFromDate !== undefined ? this.datePipe.transform(this.signupUsers.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.signupUsers.filterToDate !== undefined ? this.datePipe.transform(this.signupUsers.filterToDate, 'yyyy-MM-dd') : '',
      'login_from': this.signupUsers.loginFromDate !== undefined ? this.datePipe.transform(this.signupUsers.loginFromDate, 'yyyy-MM-dd') : '',
      'login_to': this.signupUsers.loginToDate !== undefined ? this.datePipe.transform(this.signupUsers.loginToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "page_size": this.signupUsers.page_size,
      "page": page,
      "current_ei": this.signupUsers.currentEi,
      "previous_ei": this.signupUsers.previousEi,
      "age_group": this.signupUsers.ageGroup,
      "kyc_approved": this.signupUsers.kycApproved !== undefined ? this.signupUsers.kycApproved: '',
      "status": this.signupUsers.status !== undefined ? this.signupUsers.status : '',
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
          if(res.count > 0){
            this.signupUsers.dataSource = res.results
            this.signupUsers.pageCount = this.baseService.getCountsOfPage()
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
    // this.onboardList.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/user/export_signed_up_users_list/', 'signup-users', this.signupUsers.listParams);
  }

  goBack(){
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

  userProfile(id: any){
    this.router.navigate(['admin/user-profile', id], {queryParams: { returnUrl: 'admin/signed-up-users'}})
  }
  getAllState(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count >0)
        this.signupUsers.allStates = res.results
      }
    )
  }
  getCities(){
    this.baseService.getData('user/getcitybystateid/' + this.signupUsers.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
        this.signupUsers.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }
}
