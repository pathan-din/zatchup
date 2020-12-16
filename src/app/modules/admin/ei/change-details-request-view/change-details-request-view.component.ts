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
    this.baseService.getData('admin/ei_change_details_list/',{"id": this.route.snapshot.params.id}).subscribe(
      (res: any) => {
        if (res.status == true) {
         this.changeDetails.changeDetailsView = res.results[0]
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

  radioChange(event: any){
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

}
