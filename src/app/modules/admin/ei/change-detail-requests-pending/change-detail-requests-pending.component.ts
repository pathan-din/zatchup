import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ChangeDetailRequestsPending } from '../modals/change-details.modal';

@Component({
  selector: 'app-change-detail-requests-pending',
  templateUrl: './change-detail-requests-pending.component.html',
  styleUrls: ['./change-detail-requests-pending.component.css']
})
export class ChangeDetailRequestsPendingComponent implements OnInit {
  changeDetailRequestsPending: ChangeDetailRequestsPending

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
  ) {
    this.changeDetailRequestsPending = new ChangeDetailRequestsPending();
    this.changeDetailRequestsPending.maxDate = new Date()
  }

  ngOnInit(): void {
    this.changeDetailRequestsPending.eId = this.route.snapshot.queryParamMap.get('ei_id')
    this.getChangeRequestList('')
    this.getAllState();
    this.changeDetailRequestsPending.pageCount = this.baseService.getCountsOfPage()
  }

  getChangeRequestList(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.changeDetailRequestsPending.allStates && this.changeDetailRequestsPending.stateId) {
      stateFind = this.changeDetailRequestsPending.allStates.find(val => {
        return val.id == this.changeDetailRequestsPending.stateId
      })
    }

    if (this.changeDetailRequestsPending.allCities) {
      cityFind = this.changeDetailRequestsPending.allCities.find(val => {
        return val.id == this.changeDetailRequestsPending.cityId
      })
    }


    this.changeDetailRequestsPending.modal = {
      'date_from': this.changeDetailRequestsPending.filterFromDate !== undefined ? this.datePipe.transform(this.changeDetailRequestsPending.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.changeDetailRequestsPending.filterToDate !== undefined ? this.datePipe.transform(this.changeDetailRequestsPending.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university": this.changeDetailRequestsPending.university,
      "field_name": this.changeDetailRequestsPending.changeField,
      'page': page,
      'page_size': this.changeDetailRequestsPending.page_size,
      'ei_id': this.changeDetailRequestsPending.eId
    }

    this.baseService.getData('admin/ei_change_details_list/', this.changeDetailRequestsPending.modal).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.changeDetailRequestsPending.config.currentPage
          this.changeDetailRequestsPending.startIndex = res.page_size * (page - 1) + 1;
          this.changeDetailRequestsPending.page_size = res.page_size
          this.changeDetailRequestsPending.config.itemsPerPage = this.changeDetailRequestsPending.page_size
          this.changeDetailRequestsPending.config.currentPage = page
          this.changeDetailRequestsPending.config.totalItems = res.count;
          if (res.count > 0) {
            this.changeDetailRequestsPending.dataSource = res.results
          }
          else
            this.changeDetailRequestsPending.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();


      }
    ), (err: any) => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }
  generateExcel() {
    delete this.changeDetailRequestsPending.modal.page_size;
    delete this.changeDetailRequestsPending.modal.page;
    this.baseService.generateExcel('admin/export_ei_change_details_list/', 'change-detail-pending-request', this.changeDetailRequestsPending.modal);
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.changeDetailRequestsPending.allStates = res.results
      }
    )
  }
  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.changeDetailRequestsPending.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.changeDetailRequestsPending.allCities = res.results
      }
    )
  }

  goBack() {
    this.router.navigate(['admin/school-management'])
  }

  searchList(page?: any) {
    let stateFind: any;
    let cityFind: any;
    if (this.changeDetailRequestsPending.allStates && this.changeDetailRequestsPending.stateId) {
      stateFind = this.changeDetailRequestsPending.allStates.find(val => {
        return val.id == this.changeDetailRequestsPending.stateId
      })
    }
    if (this.changeDetailRequestsPending.allCities) {
      cityFind = this.changeDetailRequestsPending.allCities.find(val => {
        return val.id == this.changeDetailRequestsPending.cityId
      })
    }

    this.changeDetailRequestsPending.modal = {
      "search": this.changeDetailRequestsPending.search,
      'date_from': this.changeDetailRequestsPending.filterFromDate !== undefined ? this.datePipe.transform(this.changeDetailRequestsPending.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.changeDetailRequestsPending.filterToDate !== undefined ? this.datePipe.transform(this.changeDetailRequestsPending.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university": this.changeDetailRequestsPending.university,
      "page_size": this.changeDetailRequestsPending.page_size,
      "page": page
    }
    this.loader.show();
    this.baseService.getData('admin/ei_search/', this.changeDetailRequestsPending.modal).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.changeDetailRequestsPending.config.currentPage
          this.changeDetailRequestsPending.startIndex = res.page_size * (page - 1) + 1;
          this.changeDetailRequestsPending.page_size = res.page_size;
          this.changeDetailRequestsPending.config.itemsPerPage = res.page_size
          this.changeDetailRequestsPending.config.currentPage = page
          this.changeDetailRequestsPending.config.totalItems = res.count;

          if (res.count > 0)
            this.changeDetailRequestsPending.dataSource = res.results
          else
            this.changeDetailRequestsPending.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    )
  }

  filterData(page) {
    if (this.changeDetailRequestsPending.search)
      this.searchList(page)
    else
      this.getChangeRequestList(page)
  }
}
