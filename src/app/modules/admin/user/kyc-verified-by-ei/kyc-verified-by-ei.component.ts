import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { KycVerifiedByEi } from '../modals/admin-user.modal';

@Component({
  selector: 'app-kyc-verified-by-ei',
  templateUrl: './kyc-verified-by-ei.component.html',
  styleUrls: ['./kyc-verified-by-ei.component.css']
})
export class KycVerifiedByEiComponent implements OnInit {
  kycVerifiedByEi: KycVerifiedByEi

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) { 
    this.kycVerifiedByEi = new KycVerifiedByEi();
  }

  ngOnInit(): void {
    this.getKycVerifiedByEiList('')
  }

  getKycVerifiedByEiList(page?: any) {
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
    this.kycVerifiedByEi.listParams = {
      'date_from': this.kycVerifiedByEi.filterFromDate !== undefined ? this.datePipe.transform(this.kycVerifiedByEi.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.kycVerifiedByEi.filterToDate !== undefined ? this.datePipe.transform(this.kycVerifiedByEi.filterToDate, 'yyyy-MM-dd') : '',
      // "city": cityFind ? cityFind.city : '',
      // "state": stateFind ? stateFind.state : '',
      // "university": this.onboardList.university,
      // "stage_pending": this.onboardList.stagePending,
      "page_size": this.kycVerifiedByEi.page_size,
      "page": page
    }

    this.baseService.getData('admin/user/users_verified_ei_list/', this.kycVerifiedByEi.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.kycVerifiedByEi.config.currentPage
          this.kycVerifiedByEi.startIndex = res.page_size * (page - 1) + 1;
          this.kycVerifiedByEi.config.itemsPerPage = res.page_size;
          this.kycVerifiedByEi.page_size = res.page_size
          this.kycVerifiedByEi.config.currentPage = page
          this.kycVerifiedByEi.config.totalItems = res.count;
          if (res.count > 0)
            this.kycVerifiedByEi.dataSource = res.results
          else
            this.kycVerifiedByEi.dataSource = undefined
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
    delete this.kycVerifiedByEi.listParams.page_size;
    delete this.kycVerifiedByEi.listParams.page;
    // this.onboardList.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/user/export_users_verified_ei_list/', 'kyc-verified-by-ei', this.kycVerifiedByEi.listParams);
  }

  goBack(){
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

}
