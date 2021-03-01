import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ChangeInBankDetailView } from '../modals/change-details.modal';
import {  Location } from '@angular/common';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';


@Component({
  selector: 'app-change-in-bank-details-view',
  templateUrl: './change-in-bank-details-view.component.html',
  styleUrls: ['./change-in-bank-details-view.component.css']
})
export class ChangeInBankDetailsViewComponent implements OnInit {
  @ViewChild('approveCloseButton') approveCloseButton: any;
  title =  'approve';
  errorDisplay: any = {};
  changeInBankDetailView : ChangeInBankDetailView
  constructor(
    private router: Router,
    private alert: NotificationService,
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private route: ActivatedRoute,
    private validationService: GenericFormValidationService

  ) {
    this.changeInBankDetailView = new ChangeInBankDetailView()
   }

  ngOnInit(): void {
    this.getBankDetailView();
    this.changeInBankDetailView.approveOrReject = 'approve'
    console.log(this.changeInBankDetailView.approveOrReject,'dddddddd')
  }

  getBankDetailView(){
    this.loader.show();
    this.baseService.getData('admin/ei_bank_change_details_list/', {"id": this.route.snapshot.params.id}).subscribe(
      (res: any) => {
        if(res.status == true) {
          this.changeInBankDetailView = res.results[0];
        }
        else{
          this.alert.error(res.error.message, 'Error')
        }  
        this.loader.hide();
      }),
      (err: any) => {
        this.alert.error(err, 'Error')
      }
  }
  approveRejectBankDetails(){
    this.errorDisplay = {}
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    let data = {
      "request_type": this.title,
      "change_id": this.changeInBankDetailView.id,
      "reason": this.changeInBankDetailView.rejectionReason,
      "remarks": this.changeInBankDetailView.rejectionRemark
    }
    this.loader.show()
    this.baseService.action('admin/approve_ei_bank_change_details_list/', data).subscribe(
      (res: any)=>{
        if(res.status == true){
          this.approveCloseButton.nativeElement.click();
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/change-in-bank-details-pending'])
        }
        else{
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide()
      }),
      (err : any) => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
  }

  radioChange(event: any){
    this.title = event.value
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  goBack(){
    this.location.back()
  }
}
