import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from 'src/app/modules/admin/subadmin/common/subadmin.model';

@Component({
  selector: 'app-subadmin-history',
  templateUrl: './subadmin-history.component.html',
  styleUrls: ['./subadmin-history.component.css']
})
export class SubadminHistoryComponent implements OnInit {
  historyList: any;
  pageCount: any;
  pagination: Pagination
  userProfileId: any;
  displayedColumns: string[] = ['position', 'action', 'actionDate', 'message'];

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private location: Location,
    private loader: NgxSpinnerService
  ) {
    this.pagination = new Pagination();
   }

  ngOnInit(): void {
    this.userProfileId = this.route.snapshot.queryParamMap.get("user_profile");
    this.pageCount = this.baseService.getCountsOfPage()
    this.getAccessHistory('');
  }

  goBack(): void {
    this.location.back()
  }
  // getSubAdminHistory() {
  //   try {
  //     this.loader.show();
  //     this.baseService.getData("ei/history-for-subadmin-list/").subscribe(res => {
  //       this.loader.hide();
  //       let response: any = {};
  //       response = res;
  //       this.historyList = response.results;
  //       if (response.stattus == true) {
  //         this.historyList = response.results;
  //       } else {
  //         this.loader.hide();
  //       }

  //     }, (error => {
  //       this.loader.hide();
  //     }))
  //   } catch (e) {
  //     this.loader.hide();
  //   }
  // }

  getAccessHistory(page: any) {
    this.loader.show()
    let params = {
      "subadmin_id": this.route.snapshot.queryParamMap.get('subadmin_id'),
      "page_size": this.pagination.page_size,
      "page": page
    }
    this.baseService.getData('admin/get-subadmin-history-details/', params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.pagination.config.currentPage
          this.pagination.startIndex = res.page_size * (page - 1) + 1;
          this.pagination.config.itemsPerPage = res.page_size
          this.pagination.page_size = res.page_size;
          this.pagination.config.currentPage = page;
          this.pagination.page_size = res.page_size;
          this.pagination.config.totalItems = res.count;

          if (res.count > 0) {
            this.pagination.dataSource = res.results;
          }
          else
            this.pagination.dataSource = undefined
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      },
      err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    )
  }

}
