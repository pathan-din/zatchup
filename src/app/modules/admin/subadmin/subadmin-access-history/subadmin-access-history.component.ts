import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubAdminAccessHistory } from '../common/subadmin.model';

@Component({
  selector: 'app-subadmin-access-history',
  templateUrl: './subadmin-access-history.component.html',
  styleUrls: ['./subadmin-access-history.component.css']
})
export class SubadminAccessHistoryComponent implements OnInit {
  accessHistoryModel: SubAdminAccessHistory;
  pageCount: any;
  pageSize: any = 5
  accessHistory: any
  userProfileId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) {
    this.accessHistoryModel = new SubAdminAccessHistory()
  }

  ngOnInit(): void {
    this.userProfileId = this.route.snapshot.queryParamMap.get("user_profile");
    this.pageCount = this.baseService.getCountsOfPage()
    this.getAccessHistory('');
  }

  getAccessHistory(page: any) {
    this.loader.show()
    let params = {
      "id": this.userProfileId,
      "page_size": this.accessHistoryModel.page_size,
      "page": page
    }
    this.baseService.getData('admin/sub-admin/get_all_permissions_history/', params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.accessHistoryModel.config.currentPage
          this.accessHistoryModel.startIndex = res.page_size * (page - 1) + 1;
          this.accessHistoryModel.config.itemsPerPage = res.page_size
          this.accessHistoryModel.page_size = res.page_size;
          this.accessHistoryModel.config.currentPage = page;
          this.accessHistoryModel.page_size = res.page_size;
          this.accessHistoryModel.config.totalItems = res.count;

          if (res.count > 0) {
            this.accessHistoryModel.dataSource = res.results;
          }
          else
            this.accessHistoryModel.dataSource = undefined
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

  pagination() {

  }

  goBack(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    this.router.navigate([returnUrl], { queryParams: { "returnUrl": "admin/subadmin-dashboard" } })
  }

}
