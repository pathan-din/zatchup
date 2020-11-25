import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-kyc-configure',
  templateUrl: './admin-kyc-configure.component.html',
  styleUrls: ['./admin-kyc-configure.component.css']
})
export class AdminKycConfigureComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  retriggerHistory: any;
  retriggerCount: any;
  addCount: any;
  isModelShow: boolean = true;

  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { }

  ngOnInit() {
    this.getKycRetriggerCount()
    this.getKycRetriggerHistory();
  }

  getKycRetriggerHistory() {
    this.loader.show()
    this.baseService.getData('admin/kyc/get_kyc_history/').subscribe(
      (res: any) => {
        if (res.status == true && res.count != 0)
          this.retriggerHistory = res.results;
        else if (res.status == true && res.count > 0)
          this.retriggerHistory = undefined
        else {
          this.alert.error(res.error.message[0], 'Error');
        }
        this.loader.hide()
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err.error, 'Error');
    }
  }

  getKycRetriggerCount() {
    this.loader.show()
    this.baseService.getData('admin/kyc/kyc_retrigger_add_list/').subscribe(
      (res: any) => {
        if (res.status == true)
          this.retriggerCount = res.data.count
        else
          this.alert.error(res.error.message, 'Error');
        this.loader.hide()
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err.error, 'Error')
    }
  }

  changeCount() {
    this.loader.show();
    let data = {
      "count": this.addCount
    }
    this.baseService.action('admin/kyc/kyc_retrigger_add_list/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.getKycRetriggerCount();
          this.getKycRetriggerHistory();
          this.alert.success(res.message, 'Success');
        } else {
          this.alert.error(res.error.message, 'Error');
        }
        this.closeModel();
        this.loader.hide();
      }
    ), err => {
      this.alert.error(err.error, 'Error');
      this.loader.hide();
    }
  }

  closeModel() {
    this.closebutton.nativeElement.click()
  }
}
