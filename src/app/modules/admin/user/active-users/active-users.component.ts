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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.activeUsers = new ActiveUsers();
   }

  ngOnInit(): void {
    this.getActiveUsersList('')
  }

  getActiveUsersList(page?: any) {
    this.loader.show();
    // let stateFind: any;
    // let cityFind: any;
    // if (this.onboardList.allStates && this.onboardList.stateId) {
    //   stateFind = this.onboardList.allStates.find(val => {
    //     return val.id == this.onboardList.stateId
    //   })
    // }
    // if (this.onboardList.allCities) {
    //   cityFind = this.onboardList.allCities.find(val => {
    //     return val.id == this.onboardList.cityId
    //   })
    // }
    this.activeUsers.listParams = {
      'date_from': this.activeUsers.filterFromDate !== undefined ? this.datePipe.transform(this.activeUsers.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.activeUsers.filterToDate !== undefined ? this.datePipe.transform(this.activeUsers.filterToDate, 'yyyy-MM-dd') : '',
      // "city": cityFind ? cityFind.city : '',
      // "state": stateFind ? stateFind.state : '',
      // "university": this.onboardList.university,
      // "stage_pending": this.onboardList.stagePending,
      "page_size": this.activeUsers.pageSize,
      "page": page
    }

    this.baseService.getData('admin/user/active_users_list/', this.activeUsers.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.activeUsers.config.currentPage
          this.activeUsers.startIndex = res.page_size * (page - 1) + 1;
          this.activeUsers.config.itemsPerPage = res.page_size;
          this.activeUsers.pageSize = res.page_size
          this.activeUsers.config.currentPage = page
          this.activeUsers.config.totalItems = res.count;
          if (res.count > 0)
            this.activeUsers.dataSource = res.results
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

}
