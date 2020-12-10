import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-subadmin-pending-request',
  templateUrl: './subadmin-pending-request.component.html',
  styleUrls: ['./subadmin-pending-request.component.css']
})
export class SubadminPendingRequestComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'Name', 'zatchUpID', 'profilePicture', 'dateOfBirth', 'emailId',
  'phoneNumber', 'employeelID', 'Action'];

  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  dataSource: any;

  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSubadminPendingRequest('')
  }

  generateExcel(){
    this.baseService.generateExcel('admin/export_ei_subadmin_pending_requests/','subadmin-pending-request')
  }

  goBack(): void {
    this.location.back()
  }

  getSubadminPendingRequest(page?: any) {
    this.loader.show();
    this.listParams = {
      "page_size": this.pageSize,
      "page": page
    }
    this.baseService.getData('admin/ei_subadmin_pending_requests/', this.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.config.currentPage
          this.startIndex = res.page_size * (page - 1) + 1;
          this.config.itemsPerPage = res.page_size
          this.pageSize = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count;
          if (res.count > 0)
            this.dataSource = res.results
          else
            this.dataSource = undefined
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
}
