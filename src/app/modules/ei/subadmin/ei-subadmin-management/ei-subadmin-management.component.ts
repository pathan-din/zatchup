import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-subadmin-management',
  templateUrl: './ei-subadmin-management.component.html',
  styleUrls: ['./ei-subadmin-management.component.css']
})

export class EiSubadminManagementComponent implements OnInit {
  dasboardSummery: any

  constructor(
    private router: Router,
    public baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSubadminDashboardSummry()
  }


  getSubadminDashboardSummry() {
    try {
      this.loader.show();
      this.baseService.getData('admin/ei_subadmin_dashboard_summary/').subscribe(
        (res: any) => {
          if (res.status == true) {
            this.dasboardSummery = res.data;
          }
          else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide()
        }, (error) => {
          this.alert.error(error.message, 'Error');
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
      console.log(err);
    }
  }

  goToEiSubadminModuleWisePage() {
    this.router.navigate(['ei/subadmin-module-wise']);
  }

  goToEiSubadminAccessHistoryPage() {
    this.router.navigate(['ei/subadmin-access-history']);
  }

  goToEiSubadminAccessPage() {
    this.router.navigate(['ei/subadmin-add']);
  }

  goToEiSubadminViewStatusPage(status) {
    this.router.navigate(['ei/subadmin-view-status'], { queryParams: { 'status': status } });
  }

  subadminPendingAccessRequest() {
    this.router.navigate(['ei/subadmin-pending-access']);
  }

  subadminPendingRequest() {
    this.router.navigate(['ei/subadmin-pending-request']);
  }

  subadminCompletedRequest() {
    this.router.navigate(['ei/subadmin-completed-request']);
  }

  subadminChangeRequest() {
    this.router.navigate(['ei/subadmin-change-request']);
  }
}
