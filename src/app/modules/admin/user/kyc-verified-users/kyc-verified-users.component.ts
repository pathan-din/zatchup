import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { KycVerifiedUsers } from '../modals/admin-user.modal';

@Component({
  selector: 'app-kyc-verified-users',
  templateUrl: './kyc-verified-users.component.html',
  styleUrls: ['./kyc-verified-users.component.css']
})
export class KycVerifiedUsersComponent implements OnInit {
  kycVerified: KycVerifiedUsers;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.kycVerified = new KycVerifiedUsers()
   }

  ngOnInit(): void {
    this.getKycVerifiedUsersList('')
  }

  getKycVerifiedUsersList(page?: any) {
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
    this.kycVerified.listParams = {
      'date_from': this.kycVerified.filterFromDate !== undefined ? this.datePipe.transform(this.kycVerified.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.kycVerified.filterToDate !== undefined ? this.datePipe.transform(this.kycVerified.filterToDate, 'yyyy-MM-dd') : '',
      // "city": cityFind ? cityFind.city : '',
      // "state": stateFind ? stateFind.state : '',
      // "university": this.onboardList.university,
      // "stage_pending": this.onboardList.stagePending,
      "page_size": this.kycVerified.pageSize,
      "page": page
    }

    this.baseService.getData('admin/user/kyc_verified_list/', this.kycVerified.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.kycVerified.config.currentPage
          this.kycVerified.startIndex = res.page_size * (page - 1) + 1;
          this.kycVerified.config.itemsPerPage = res.page_size;
          this.kycVerified.pageSize = res.page_size
          this.kycVerified.config.currentPage = page
          this.kycVerified.config.totalItems = res.count;
          if (res.count > 0)
            this.kycVerified.dataSource = res.results
          else
            this.kycVerified.dataSource = undefined
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
    delete this.kycVerified.listParams.page_size;
    delete this.kycVerified.listParams.page;
    // this.onboardList.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/user/export_kyc_verified_list/', 'kyc-verified-users', this.kycVerified.listParams);
  }

  goBack(){
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

}
