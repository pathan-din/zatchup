import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private datePipe: DatePipe,
    private router: Router,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
  ) { 
    this.changeDetailRequestsPending = new ChangeDetailRequestsPending()
  }

  ngOnInit(): void {
    this.getChangeRequestList('')
    this.getAllState();
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
    }

    this.baseService.getData('admin/ei_change_details_list/', this.changeDetailRequestsPending.modal).subscribe(
      (res: any) => {
        if (res.status == true) {
          // this.changeDetailRequestsPending.dataSource = res.results
          if (!page)
            page = this.changeDetailRequestsPending.config.currentPage
          this.changeDetailRequestsPending.startIndex = res.page_size * (page - 1) + 1;
          this.changeDetailRequestsPending.page_size = res.page_size
          this.changeDetailRequestsPending.config.itemsPerPage = this.changeDetailRequestsPending.page_size
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
    ), (err: any) => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }
  generateExcel() {
    delete this.changeDetailRequestsPending.modal.page_size;
    delete this.changeDetailRequestsPending.modal.page;
    // this.changeDetailRequestsPending.modal['export_csv'] = true
    this.baseService.generateExcel('admin/ei/export-all-ei-list/', 'change-detail-pending-request', this.changeDetailRequestsPending.modal);
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
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
        console.log('get state res ::', res)
      }
    )
  }

  goBack() {
    this.location.back()
  }
}
