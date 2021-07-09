import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ChangeDetailsView } from '../modals/change-details.modal';

@Component({
  selector: 'app-change-details-request-view',
  templateUrl: './change-details-request-view.component.html',
  styleUrls: ['./change-details-request-view.component.css']
})
export class ChangeDetailsRequestViewComponent implements OnInit {
  @ViewChild('approveCloseButton') approveCloseButton: any;
  changeDetails: ChangeDetailsView

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private validationService: GenericFormValidationService
  ) {
    this.changeDetails = new ChangeDetailsView()
  }

  ngOnInit(): void {
    this.getChangeRequestData()
  }

  getChangeRequestData() {
    this.loader.show();
    this.baseService.getData('admin/ei_change_details_list/', { "id": this.route.snapshot.params.id }).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.changeDetails.changeDetailsView = res.results[0];
          if (this.changeDetails.changeDetailsView)
            this.getChangeRequestHistory();
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();

      }
    ), (err: any) => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  ApproveRejectChangeRequest() {
    this.changeDetails.errorDisplay = {};
    this.changeDetails.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.changeDetails.errorDisplay.valid) {
      return false;
    }

    let data = {
      "request_type": this.changeDetails.approveOrReject,
      "change_id": this.changeDetails.changeDetailsView.id,
      "reason": this.changeDetails.rejectionReason,
      "remarks": this.changeDetails.rejectionRemark
    }
    this.loader.show()
    this.baseService.action('admin/approve_reject_ei_change_details/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.approveCloseButton.nativeElement.click();
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/change-detail-requests-pending'])
        } else {
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, "Error")
      this.loader.hide()
    }
  }

  radioChange(event: any) {
    this.changeDetails.approveOrReject = event.value
  }
  goBack() {
    this.location.back()
  }

  isValid() {
    if (Object.keys(this.changeDetails.errorDisplay).length !== 0) {
      this.changeDetails.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  getChangeRequestHistory(page?: any) {
    this.loader.show();

    let listParams = {
      "school_id": this.changeDetails.changeDetailsView.school_id,
      "module_name": "EDUCATIONINSTITUTE",
      "page_size": this.changeDetails.page_size,
      "page": page
    }
    this.baseService.getData('admin/common_history/', listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.changeDetails.config.currentPage
          this.changeDetails.startIndex = res.page_size * (page - 1) + 1;
          this.changeDetails.config.itemsPerPage = res.page_size
          this.changeDetails.config.currentPage = page;
          this.changeDetails.page_size = res.page_size;
          this.changeDetails.config.totalItems = res.count;
          this.changeDetails.pageCounts = this.baseService.getCountsOfPage()
          if (res.count > 0) {
            this.changeDetails.dataSource = res.results;
          }
          else
            this.changeDetails.dataSource = undefined
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

  fileType(file: any) {
    return file.split('.').pop();
  } 

  download_file(fileURL) {
    window.open(fileURL, '_blank');
  }

}
