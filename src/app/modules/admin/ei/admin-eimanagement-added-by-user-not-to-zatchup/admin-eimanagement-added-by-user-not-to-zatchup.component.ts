import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { notOnZatchup } from '../modals/ei-pending-approval.modal';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common'
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-admin-eimanagement-added-by-user-not-to-zatchup',
  templateUrl: './admin-eimanagement-added-by-user-not-to-zatchup.component.html',
  styleUrls: ['./admin-eimanagement-added-by-user-not-to-zatchup.component.css'],
  providers: [DatePipe]
})
export class AdminEIManagementAddedByUserNotToZatchupComponent implements OnInit {

  notOnZatchup: notOnZatchup;
  maxDate: Date;
  filterFromDate: any;
  filterToDate: any;
  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.notOnZatchup = new notOnZatchup();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getnotOnZatchup('');
    this.getAllStates();
  }

  getnotOnZatchup(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.notOnZatchup.allStates && this.notOnZatchup.stateId) {
      cityFind = this.notOnZatchup.allCities.find(val => {
        return val.id == this.notOnZatchup.cityId
      })
    }
    if (this.notOnZatchup.allCities) {
      stateFind = this.notOnZatchup.allStates.find(val => {
        return val.id == this.notOnZatchup.stateId
      })
    }
    this.notOnZatchup.listParams = {
      "date_from": this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      "date_to": this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university": this.notOnZatchup.university,
      "page_size": this.notOnZatchup.pageSize,
      "page": page
    }

    this.baseService.getData('admin/ei/get_ei_list_not_onZatchUp/', this.notOnZatchup.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.notOnZatchup.config.currentPage
          this.notOnZatchup.startIndex = res.page_size * (page - 1) + 1;
          this.notOnZatchup.config.itemsPerPage = res.page_size
          this.notOnZatchup.config.currentPage = page
          this.notOnZatchup.config.totalItems = res.count;
          if (res.count > 0){
            this.notOnZatchup.dataSource = res.results
            this.notOnZatchup.pageCount = this.baseService.getCountsOfPage()
          }
          else
            this.notOnZatchup.dataSource = undefined
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
    delete this.notOnZatchup.listParams.page_size;
    delete this.notOnZatchup.listParams.page;
    this.notOnZatchup.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/ei/export_users_not_on_zatchup/', 'not-on-zatchup', this.notOnZatchup.listParams);
  }

  getAllStates() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.notOnZatchup.allStates = res.results
      }
    )
  }
  getcities() {
    this.baseService.getData('user/getcitybystateid/' + this.notOnZatchup.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.notOnZatchup.allCities = res.results
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  searchList(page?: any) {
    this.notOnZatchup.listParams = {
      "search": this.notOnZatchup.search,
      'date_from': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
      "city": this.notOnZatchup.cityName,
      "state": this.notOnZatchup.stateName,
      "university": this.notOnZatchup.university,
      "page_size": this.notOnZatchup.pageSize,
      "page": page
    }
    this.loader.show();
    this.baseService.getData('admin/ei_search/', this.notOnZatchup.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.notOnZatchup.config.currentPage
          this.notOnZatchup.startIndex = res.page_size * (page - 1) + 1;
          this.notOnZatchup.pageSize = res.page_size;
          this.notOnZatchup.config.itemsPerPage = res.page_size
          this.notOnZatchup.config.currentPage = page
          this.notOnZatchup.config.totalItems = res.count;

          if (res.count > 0)
            this.notOnZatchup.dataSource = res.results
          else
            this.notOnZatchup.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    )
  }

  filterData(page) {
    if (this.notOnZatchup.search)
      this.searchList(page)
    else
      this.getnotOnZatchup(page)
  }

  editEI(id: any) {
    this.router.navigate(['admin/add-education-institute', id])
  }

  removeEI(id: any): any {
    this.confirmDialogService.confirmThis('Are you sure to delete ?', () => {
      this.loader.show()
      this.baseService.action('admin/ei/delete_users_not_on_zatchup/', { "ei_id": id }).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success");
            this.filterData(this.notOnZatchup.config.currentPage);
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }
}
