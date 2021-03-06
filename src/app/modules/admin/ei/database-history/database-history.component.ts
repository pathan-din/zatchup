import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DatabaseHistory } from '../modals/education-institute.modal';

@Component({
  selector: 'app-database-history',
  templateUrl: './database-history.component.html',
  styleUrls: ['./database-history.component.css']
})
export class DatabaseHistoryComponent implements OnInit {
  databaseHistory: DatabaseHistory
  fromMaxDate: any;
  toMaxDate: any;
  filterFromDate:any;
  filterToDate:any;
  constructor(
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { 
    this.databaseHistory = new DatabaseHistory();
    this.fromMaxDate = new Date();
    this.toMaxDate = new Date();
    
  }

  ngOnInit(): void {
    // this.databaseHistory.isDeleted = true;
    
    this.getEIHistory('');
  }
  changeFilterToDate(date) {
    if (date)
      this.fromMaxDate = new Date(date)
  }
  getEIHistory(page?: any) {
    this.loader.show();
    this.databaseHistory.filterFromDate = this.baseService.getDateFormat(this.filterFromDate);
    this.databaseHistory.filterToDate = this.baseService.getDateFormat(this.filterToDate);
    let listParams = {
      "is_deleted": "true",
      'start_date':this.databaseHistory.filterFromDate, 
      'end_date':this.databaseHistory.filterToDate, 
      "page_size": this.databaseHistory.page_size,
      "page": page
    }
    this.baseService.getData('admin/ei_database_history/', listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.databaseHistory.config.currentPage
          this.databaseHistory.startIndex = res.page_size * (page - 1) + 1;
          this.databaseHistory.config.itemsPerPage = res.page_size
          this.databaseHistory.config.currentPage = page;
          this.databaseHistory.page_size = res.page_size;
          this.databaseHistory.config.totalItems = res.count;
          if (res.count > 0) {
            this.databaseHistory.dataSource = res.results;
          }
          else
            this.databaseHistory.dataSource = undefined
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

  goBack() {
    this.location.back();
  }

}
