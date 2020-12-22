import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { RejectedEIList } from '../modals/education-institute.modal';

@Component({
  selector: 'app-admin-ei-reject-details',
  templateUrl: './admin-ei-reject-details.component.html',
  styleUrls: ['./admin-ei-reject-details.component.css']
})
export class AdminEiRejectDetailsComponent implements OnInit {
  rejectEI: RejectedEIList

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location,
  ) {
    this.rejectEI = new RejectedEIList();
    this.rejectEI.maxDate = new Date()
  }

  ngOnInit(): void {
    this.getRejectedEIList();
    this.getAllState()
  }

  getRejectedEIList(page?: any) {
    this.loader.show();

    this.rejectEI.modal = {
      "date_from": this.rejectEI.filterFromDate !== undefined ? this.datePipe.transform(this.rejectEI.filterFromDate, 'yyyy-MM-dd') : '',
      "date_to": this.rejectEI.filterToDate !== undefined ? this.datePipe.transform(this.rejectEI.filterToDate, 'yyyy-MM-dd') : '',
      "city": this.rejectEI.cityId ? this.getValue(this.rejectEI.allCities, this.rejectEI.cityId, 'city') : '',
      "state": this.rejectEI.stateId ? this.getValue(this.rejectEI.allStates, this.rejectEI.stateId, 'state') : '',
      "university": this.rejectEI.university,
      "page_size": this.rejectEI.page_size,
      "page": page
    }

    try {
      this.baseService.getData('admin/ei-rejected-list/', this.rejectEI.modal).subscribe(
        (res: any) => {
          if (res.status == true) {
            if (!page)
              page = this.rejectEI.config.currentPage
            this.rejectEI.startIndex = res.page_size * (page - 1) + 1;
            this.rejectEI.config.itemsPerPage = res.page_size;
            this.rejectEI.page_size = res.page_size
            this.rejectEI.config.currentPage = page
            this.rejectEI.config.totalItems = res.count;

            if (res.count > 0)
              this.rejectEI.dataSource = res.results
            else
              this.rejectEI.dataSource = undefined
          }

          else
            this.alert.error(res.error.message[0], 'Error')
          this.loader.hide();
        }
      ), (err: any) => {
        this.alert.error(err, 'Error')
        this.loader.hide();
      }
    } catch (error) {
      this.alert.error(error, 'Error')
        this.loader.hide();
    }
  }

  generateExcel() {
    delete this.rejectEI.modal.page_size;
    delete this.rejectEI.modal.page;
    this.rejectEI.modal['export_csv'] = true
    this.baseService.generateExcel('admin/export-ei-pending-list/', 'EI-pending-for-approval', this.rejectEI.modal);
  }

  // action(user) {
  //   this.rejectEI.userId = user.id
  // }

  // cancel() {
  //   this.rejectEI.userId = undefined
  // }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.rejectEI.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.rejectEI.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.rejectEI.allCities = res.results
      }
    )
  }

  getValue(data, id, value) {
    let find = data.find(val => {
      return val.id == id
    })

    return find[value];
  }

  goBack(): void {
    this.location.back();
  }

}
