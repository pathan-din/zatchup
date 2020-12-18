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
  status: any ='';
  kycApproved: any ='';
  maxDate: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.kycVerified = new KycVerifiedUsers();
    this.maxDate = new Date()
   }

  ngOnInit(): void {
    this.getKycVerifiedUsersList('')
  }

  getKycVerifiedUsersList(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.kycVerified.allStates && this.kycVerified.stateId) {
      stateFind = this.kycVerified.allStates.find(val => {
        return val.id == this.kycVerified.stateId
      })
    }
    if (this.kycVerified.allCities) {
      cityFind = this.kycVerified.allCities.find(val => {
        return val.id == this.kycVerified.cityId
      })
    }
    this.kycVerified.listParams = {
      'date_from': this.kycVerified.filterFromDate !== undefined ? this.datePipe.transform(this.kycVerified.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.kycVerified.filterToDate !== undefined ? this.datePipe.transform(this.kycVerified.filterToDate, 'yyyy-MM-dd') : '',
      'login_from': this.kycVerified.loginFromDate !== undefined ? this.datePipe.transform(this.kycVerified.loginFromDate, 'yyyy-MM-dd') : '',
      'login_to': this.kycVerified.loginToDate !== undefined ? this.datePipe.transform(this.kycVerified.loginToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "page_size": this.kycVerified.page_size,
      "page": page,
      "current_ei": this.kycVerified.currentEi,
      "previous_ei": this.kycVerified.previousEi,
      "age_group": this.kycVerified.ageGroup,
      "kyc_approved": this.kycApproved !== undefined ? this.kycApproved: '',
      "status": this.status !== undefined ? this.status : '',
    }

    this.baseService.getData('admin/user/kyc_verified_list/', this.kycVerified.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
          page = this.kycVerified.config.currentPage
          this.kycVerified.startIndex = res.page_size * (page - 1) + 1;
          this.kycVerified.page_size = res.page_size
          this.kycVerified.config.itemsPerPage = this.kycVerified.page_size
          this.kycVerified.config.currentPage = page
          this.kycVerified.config.totalItems = res.count;
          if(res.count > 0)
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

  getAllState(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count >0)
        this.kycVerified.allStates = res.results
      }
    )
  }
  getCities(){
    this.baseService.getData('user/getcitybystateid/' + this.kycVerified.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
        this.kycVerified.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }

  userProfile(id){
    this.router.navigate(['admin/user-profile',id])
  }

}
