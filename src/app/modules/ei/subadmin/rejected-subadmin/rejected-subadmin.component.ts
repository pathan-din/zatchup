import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-rejected-subadmin',
  templateUrl: './rejected-subadmin.component.html',
  styleUrls: ['./rejected-subadmin.component.css']
})
export class RejectedSubadminComponent implements OnInit {
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  dataSource: any = [];
  modelReason: any = {};
  errorDisplay: any = {};
  userId: any;
  pageCounts: any;
  model: {};
  sabadminId: any;
  empNumber: any;
  subadminId: any;
  displayedColumns: string[] = ['SNo', 'Name', 'zatchUpID', 'profilePicture', 'dateOfBirth', 'emailId',
  'phoneNumber', 'employeelID', 'comment', 'status'];

  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private confirmDialogService: ConfirmDialogService,
    private ValidationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    this.getSubadminRejectedList()
  }

  getSubadminRejectedList(page?: any) {
    this.loader.show();
    this.listParams = {
      "page_size": this.pageSize,
      "page": page
    }
    this.baseService.getData('ei/subadmin-reject-lists-by-ei/', this.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.config.currentPage
          this.startIndex = res.page_size * (page - 1) + 1;
          this.config.itemsPerPage = res.page_size
          this.pageSize = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count;
          if (res.count > 0) {
            this.dataSource = res.results;
            this.pageCounts = this.baseService.getCountsOfPage()
          } else {
            this.dataSource = []
          }
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
          this.loader.hide();
        }
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  goBack(){
    this.location.back()
  }
}
