import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Pagination } from '../modals/admin-user.modal';

@Component({
  selector: 'app-admin-user-profile-history',
  templateUrl: './admin-user-profile-history.component.html',
  styleUrls: ['./admin-user-profile-history.component.css']
})
export class AdminUserProfileHistoryComponent implements OnInit {
  pagination: Pagination
  params: any = {};
  userId: any;
  displayedColumns: string[] = [
    'index', 'date_time', 'message', 'old_value', 'new_value'
  ]

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) {
    this.pagination = new Pagination();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get('user_id');
    this.getUserProfileHistory('')
  }

  goBack() {
    this.location.back();
  }

  getUserProfileHistory(page: any) {
    this.loader.show()
    this.params = {
      "user_id": this.userId,
      "module_name": "STUDENT",
      "page_size": this.pagination.page_size,
      "page": page
    }
    this.baseService.getData('admin/common_history/', this.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.pagination.config.currentPage
          this.pagination.startIndex = res.page_size * (page - 1) + 1;
          this.pagination.config.itemsPerPage = res.page_size
          this.pagination.config.currentPage = page;
          this.pagination.page_size = res.page_size;
          this.pagination.config.totalItems = res.count;
          this.pagination.countData = this.baseService.getCountsOfPage()
          if (res.count > 0) {
            this.pagination.dataSource = res.results;
          }
          else
            this.pagination.dataSource = undefined
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, "Error")
      this.loader.hide()
    }
  }
}
