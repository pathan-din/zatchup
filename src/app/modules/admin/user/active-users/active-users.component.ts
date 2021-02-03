import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ActiveUsers } from '../modals/admin-user.modal';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  activeUsers: ActiveUsers
  kycApproved: any= '';
  status: any= '';
  maxDate: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.activeUsers = new ActiveUsers();
    this.maxDate = new Date()
   }

  ngOnInit(): void {
    this.activeUsers.lastLoginParams = this.route.snapshot.queryParamMap.get('lastLoginParams');
    if(this.activeUsers.lastLoginParams)
    {
      this.activeUsers.loginFromDate = JSON.parse(this.activeUsers.lastLoginParams).start_date;
      this.activeUsers.loginToDate = JSON.parse(this.activeUsers.lastLoginParams).end_date;
    }
    this.getActiveUsersList('');
    this.getAllState();
    this.activeUsers.pageCount = this.baseService.getCountsOfPage();
  }

  getActiveUsersList(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.activeUsers.allStates && this.activeUsers.stateId) {
      stateFind = this.activeUsers.allStates.find(val => {
        return val.id == this.activeUsers.stateId
      })
    }
    if (this.activeUsers.allCities) {
      cityFind = this.activeUsers.allCities.find(val => {
        return val.id == this.activeUsers.cityId
      })
    }
    this.activeUsers.listParams = {
      'date_from': this.activeUsers.filterFromDate !== undefined ? this.datePipe.transform(this.activeUsers.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.activeUsers.filterToDate !== undefined ? this.datePipe.transform(this.activeUsers.filterToDate, 'yyyy-MM-dd') : '',
      'last_login_from': this.activeUsers.loginFromDate !== undefined ? this.datePipe.transform(this.activeUsers.loginFromDate, 'yyyy-MM-dd') : '',
      'last_login_to': this.activeUsers.loginToDate !== undefined ? this.datePipe.transform(this.activeUsers.loginToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "page_size": this.activeUsers.page_size,
      "page": page,
      "current_ei": this.activeUsers.currentEi,
      "previous_ei": this.activeUsers.previousEi,
      "age_group": this.activeUsers.ageGroup,
      "kyc_aprroved": this.activeUsers.kycApproved !== undefined ? this.activeUsers.kycApproved: '',
      "school_verified": this.activeUsers.schoolStatus !== undefined ? this.activeUsers.schoolStatus : '',
      "zatchupId": this.activeUsers.zatchupId,
    }

    this.baseService.getData('admin/user/active_users_list/', this.activeUsers.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.activeUsers.config.currentPage
          this.activeUsers.startIndex = res.page_size * (page - 1) + 1;
          this.activeUsers.config.itemsPerPage = res.page_size;
          this.activeUsers.page_size = res.page_size
          this.activeUsers.config.currentPage = page
          this.activeUsers.config.totalItems = res.count;
          if (res.count > 0){
            this.activeUsers.dataSource = res.results
          }
          else
            this.activeUsers.dataSource = undefined
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
    delete this.activeUsers.listParams.page_size;
    delete this.activeUsers.listParams.page;
    // this.onboardList.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/user/export_active_users_list/', 'active-users', this.activeUsers.listParams);
  }

  goBack(){
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }
  getAllState(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count >0)
        this.activeUsers.allStates = res.results
      }
    )
  }
  getCities(){
    this.baseService.getData('user/getcitybystateid/' + this.activeUsers.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
        this.activeUsers.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }

  userProfile(id: any){
    this.router.navigate(['admin/user-profile', id])
  }

}
