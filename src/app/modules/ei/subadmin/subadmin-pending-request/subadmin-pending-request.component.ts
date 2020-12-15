import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-subadmin-pending-request',
  templateUrl: './subadmin-pending-request.component.html',
  styleUrls: ['./subadmin-pending-request.component.css']
})
export class SubadminPendingRequestComponent implements OnInit {
  @ViewChild('closeRejectModal') closeRejectModal: any;
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
  modelReason: any = {};
  errorDisplay: any = {};
  userId: any;

  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private confirmDialogService: ConfirmDialogService,
    private ValidationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    this.getSubadminPendingRequest('')
  }

  generateExcel() {
    this.baseService.generateExcel('admin/export_ei_subadmin_pending_requests/', 'subadmin-pending-request')
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

  approveUser(id: any): any {
    this.confirmDialogService.confirmThis('Are you sure you want to approve this user?', () => {
      let data = {
        "subadmin_id": id,
        "approve_subadmin": 1
      }
      this.loader.show()
      this.baseService.action('ei/subadmin-approve-by-ei/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getSubadminPendingRequest('');
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

  rejectUserModal(id: any) {
    this.modelReason.subadmin_id = id
  }

  rejectUser(): any {
    this.errorDisplay = {};
    this.errorDisplay = this.ValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show()
      this.baseService.action('ei/reject-subadmin-by-ei/', this.modelReason).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.closeRejectModal.nativeElement.click();
            this.alert.success(res.message, "Success")
            this.getSubadminPendingRequest('');
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    } catch (err) {
      this.loader.hide();
    }

  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.ValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
}
