import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {
  displayedColumns: string[] = ['field_name', 'old_value', 'new_value'];
  dataSource: any;
  kycReqDataSource: any;
  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSubadminPendingRequest();
    this.getEKycPendingRequest();
  }

  goBack(): void {
    this.location.back()
  }

  getSubadminPendingRequest(page?: any) {
    this.loader.show();
    let data = {
      "page_size": 100,
      "page": 1
    }
    this.baseService.getData('user/pending-user-change-detail-list/', data).subscribe(
      (res: any) => {
        this.loader.hide();
        if (res.status == true) {
          if (res.count > 0) {
            this.dataSource = res.results;
          } else {
            this.dataSource = undefined
          }
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  getEKycPendingRequest(page?: any) {
    this.loader.show();
    let data = {
      "page_size": 100,
      "page": 1
    }
    this.baseService.getData('user/upload-ekyc-for-detail-change-list/', data).subscribe(
      (res: any) => {
        this.loader.hide();
        if (res.status == true) {
          if (res.count != 0) {
            this.kycReqDataSource = res.results;
          } else {
            this.kycReqDataSource = undefined
          }
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }
}
