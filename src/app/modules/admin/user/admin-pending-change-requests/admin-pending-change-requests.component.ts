import { DatePipe, Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { count } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PendingChangeRequests } from '../modals/kyc.modal';

@Component({
  selector: 'app-admin-pending-change-requests',
  templateUrl: './admin-pending-change-requests.component.html',
  styleUrls: ['./admin-pending-change-requests.component.css']
})
export class AdminKycPendingChangeRequestsComponent implements OnInit {
  pendingChangeRequests: PendingChangeRequests

  constructor(
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private location: Location,
    private datePipe: DatePipe
  ) {
    this.pendingChangeRequests = new PendingChangeRequests();
    this.pendingChangeRequests.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getKycPendingChangeRequests();
  }

  getKycPendingChangeRequests(page?: any) {
    this.pendingChangeRequests.params = {
      'date_from': this.pendingChangeRequests.filterFromDate !== undefined ? this.datePipe.transform(this.pendingChangeRequests.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.pendingChangeRequests.filterToDate !== undefined ? this.datePipe.transform(this.pendingChangeRequests.filterToDate, 'yyyy-MM-dd') : '',
      'page_size': this.pendingChangeRequests.pageSize,
      'page': page
    }
    this.baseService.getData('admin/kyc/request_for_change_details/', this.pendingChangeRequests.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.pendingChangeRequests.config.currentPage
          this.pendingChangeRequests.startIndex = res.page_size * (page - 1) + 1;
          this.pendingChangeRequests.config.itemsPerPage = res.page_size
          this.pendingChangeRequests.pageSize = res.page_size
          this.pendingChangeRequests.config.currentPage = page
          this.pendingChangeRequests.config.totalItems = res.count;

          this.pendingChangeRequests.pageCount = this.baseService.getCountsOfPage();
          if (res.count == 0)
            this.pendingChangeRequests.dataSource = undefined
          else
            this.pendingChangeRequests.dataSource = res.results
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

  goBack(): void {
    this.location.back();
  }

}
