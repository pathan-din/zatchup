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
  maxDate: any;
  kycApproved: any = '';
  status: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.kycVerifiedByEi = new KycVerifiedByEi();
    this.maxDate = new Date();

  }

  ngOnInit(): void {
    this.getKycVerifiedByEiList('');
    this.getAllState();
    this.kycVerifiedByEi.pageCount = this.baseService.getCountsOfPage();
  }

  getKycVerifiedByEiList(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.kycVerifiedByEi.allStates && this.kycVerifiedByEi.stateId) {
      stateFind = this.kycVerifiedByEi.allStates.find(val => {
        return val.id == this.kycVerifiedByEi.stateId
      })
    }
    if (this.kycVerifiedByEi.allCities) {
      cityFind = this.kycVerifiedByEi.allCities.find(val => {
        return val.id == this.kycVerifiedByEi.cityId
      })
    }
    this.kycVerifiedByEi.listParams = {
      'date_from': this.kycVerifiedByEi.filterFromDate !== undefined ? this.datePipe.transform(this.kycVerifiedByEi.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.kycVerifiedByEi.filterToDate !== undefined ? this.datePipe.transform(this.kycVerifiedByEi.filterToDate, 'yyyy-MM-dd') : '',
      'last_login_from': this.kycVerifiedByEi.loginFromDate !== undefined ? this.datePipe.transform(this.kycVerifiedByEi.loginFromDate, 'yyyy-MM-dd') : '',
      'last_login_to': this.kycVerifiedByEi.loginToDate !== undefined ? this.datePipe.transform(this.kycVerifiedByEi.loginToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "page_size": this.kycVerifiedByEi.page_size,
      "page": page,
      "current_ei": this.kycVerifiedByEi.currentEi,
      "previous_ei": this.kycVerifiedByEi.previousEi,
      "age_group": this.kycVerifiedByEi.ageGroup,
      "kyc_approved": this.kycVerifiedByEi !== undefined ? this.kycVerifiedByEi : '',
      "is_disabled": this.kycVerifiedByEi.status !== undefined ? this.kycVerifiedByEi.status : '',
      "zatchupId": this.kycVerifiedByEi.zatchupId,
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
          if (res.count > 0) {
            this.kycVerifiedByEi.dataSource = res.results
          }
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

  goBack() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count > 0)
          this.kycVerifiedByEi.allStates = res.results
      }
    )
  }
  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.kycVerifiedByEi.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.kycVerifiedByEi.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }

  userProfile(id: any) {
    this.router.navigate(['admin/user-profile', id])
  }
}
