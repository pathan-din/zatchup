import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DormantUsers } from '../modals/admin-user.modal';

@Component({
  selector: 'app-dormant-users',
  templateUrl: './dormant-users.component.html',
  styleUrls: ['./dormant-users.component.css']
})
export class DormantUsersComponent implements OnInit {
  dormantUsers: DormantUsers

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) { 
    this.dormantUsers = new DormantUsers()
  }

  ngOnInit(): void {
    this.getDormantUsersList('')
  }

  getDormantUsersList(page?: any) {
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
    this.dormantUsers.listParams = {
      'date_from': this.dormantUsers.filterFromDate !== undefined ? this.datePipe.transform(this.dormantUsers.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.dormantUsers.filterToDate !== undefined ? this.datePipe.transform(this.dormantUsers.filterToDate, 'yyyy-MM-dd') : '',
      // "city": cityFind ? cityFind.city : '',
      // "state": stateFind ? stateFind.state : '',
      // "university": this.onboardList.university,
      // "stage_pending": this.onboardList.stagePending,
      "page_size": this.dormantUsers.page_size,
      "page": page
    }

    this.baseService.getData('admin/user/dormant_users_list/', this.dormantUsers.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.dormantUsers.config.currentPage
          this.dormantUsers.startIndex = res.page_size * (page - 1) + 1;
          this.dormantUsers.config.itemsPerPage = res.page_size;
          this.dormantUsers.page_size = res.page_size
          this.dormantUsers.config.currentPage = page
          this.dormantUsers.config.totalItems = res.count;
          if (res.count > 0)
            this.dormantUsers.dataSource = res.results
          else
            this.dormantUsers.dataSource = undefined
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
    delete this.dormantUsers.listParams.page_size;
    delete this.dormantUsers.listParams.page;
    // this.onboardList.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/user/export_dormant_users_list/', 'kyc-verified-users', this.dormantUsers.listParams);
  }

  goBack(){
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

}
