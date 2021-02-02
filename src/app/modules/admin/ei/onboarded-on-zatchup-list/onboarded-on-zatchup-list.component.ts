import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OnboardedZatchup } from '../modals/ei-pending-approval.modal';
import { Location } from '@angular/common'

@Component({
  selector: 'app-onboarded-on-zatchup-list',
  templateUrl: './onboarded-on-zatchup-list.component.html',
  styleUrls: ['./onboarded-on-zatchup-list.component.css']
})
export class OnboardedOnZatchupListComponent implements OnInit {
  onboardedZatchup: OnboardedZatchup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location
  ) {
    this.onboardedZatchup = new OnboardedZatchup();
    this.onboardedZatchup.maxDate = new Date();
  }

  ngOnInit(): void {
    this.subscriptionType(this.route.snapshot.params.type)
    this.getAllState();
    this.getOnboardedZatchup();
    this.onboardedZatchup.pageCounts = this.baseService.getCountsOfPage()
  }

  onboardedView(data) {
    this.router.navigate(['admin/ei-onboarded-view', data.id])
  }

  getOnboardedZatchup(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.onboardedZatchup.allStates && this.onboardedZatchup.stateId) {
      stateFind = this.onboardedZatchup.allStates.find(val => {
        return val.id == this.onboardedZatchup.stateId
      })
    }
    if (this.onboardedZatchup.allCities) {
      cityFind = this.onboardedZatchup.allCities.find(val => {
        return val.id == this.onboardedZatchup.cityId
      })
    }

    this.onboardedZatchup.listParams = {
      "search": this.onboardedZatchup.search,
      'date_from': this.onboardedZatchup.filterFromDate !== undefined ? this.datePipe.transform(this.onboardedZatchup.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.onboardedZatchup.filterToDate !== undefined ? this.datePipe.transform(this.onboardedZatchup.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      // "university": this.onboardedZatchup.university,
      "is_disabled": this.onboardedZatchup.isDisabled,
      "is_subscription_active": this.onboardedZatchup.subStatus,
      "page_size": this.onboardedZatchup.pageSize,
      "page": page
    }
    this.baseService.getData('admin/ei-onboarded_zatchup-list/', this.onboardedZatchup.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.onboardedZatchup.config.currentPage
          this.onboardedZatchup.startIndex = res.page_size * (page - 1) + 1;
          this.onboardedZatchup.config.itemsPerPage = res.page_size
          this.onboardedZatchup.config.currentPage = page
          this.onboardedZatchup.config.totalItems = res.count;
          if (res.count > 0) {
            this.onboardedZatchup.dataSource = res.results;
          }
          else
            this.onboardedZatchup.dataSource = undefined
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

  searchList(page?: any) {
    let stateFind: any;
    let cityFind: any;
    if (this.onboardedZatchup.allStates && this.onboardedZatchup.stateId) {
      stateFind = this.onboardedZatchup.allStates.find(val => {
        return val.id == this.onboardedZatchup.stateId
      })
    }
    if (this.onboardedZatchup.allCities) {
      cityFind = this.onboardedZatchup.allCities.find(val => {
        return val.id == this.onboardedZatchup.cityId
      })
    }
    this.onboardedZatchup.listParams = {
      "search": this.onboardedZatchup.search,
      'date_from': this.onboardedZatchup.filterFromDate !== undefined ? this.datePipe.transform(this.onboardedZatchup.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.onboardedZatchup.filterToDate !== undefined ? this.datePipe.transform(this.onboardedZatchup.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      // "university": this.onboardedZatchup.university,
      "is_onboarded": '1',
      "page_size": this.onboardedZatchup.pageSize,
      "is_subscription_active": this.onboardedZatchup.subStatus,
      "page": page
    }
    this.loader.show();
    this.baseService.getData('admin/ei_search/', this.onboardedZatchup.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.onboardedZatchup.config.currentPage
          this.onboardedZatchup.startIndex = res.page_size * (page - 1) + 1;
          this.onboardedZatchup.pageSize = res.page_size;
          this.onboardedZatchup.config.itemsPerPage = res.page_size;
          this.onboardedZatchup.pageSize = res.page_size;
          this.onboardedZatchup.config.currentPage = page
          this.onboardedZatchup.config.totalItems = res.count;

          if (res.count > 0)
            this.onboardedZatchup.dataSource = res.results
          else
            this.onboardedZatchup.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    )
  }

  generateExcel() {
    delete this.onboardedZatchup.listParams.page_size;
    delete this.onboardedZatchup.listParams.page;
    this.onboardedZatchup.listParams['export_csv'] = true
    this.baseService.generateExcel('', 'onboarded-zatchup-list', this.onboardedZatchup.listParams);
  }


  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.onboardedZatchup.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.onboardedZatchup.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.onboardedZatchup.allCities = res.results
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  filterData(page) {
    if (this.onboardedZatchup.search)
      this.searchList(page)
    else
      this.getOnboardedZatchup(page)
  }

  subscriptionType(type: any) {
    if (type != 'list') {
      if (type == 'active')
        this.onboardedZatchup.subStatus = "true";
      else
        this.onboardedZatchup.subStatus = "false"
    }
  }
}



