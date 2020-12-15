import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-support-management',
  templateUrl: './support-management.component.html',
  styleUrls: ['./support-management.component.css']
})
export class SupportManagementComponent implements OnInit {
  dashboardData: any;

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.getSupportMgmtData()
  }

  ticketsOnboardingList() {
    this.router.navigate(['admin/tickets-onboarding-list'])
  }

  getSupportMgmtData() {
    this.loader.show();
    this.baseService.getData('admin/support_dashboard_summary/').subscribe(
      (res: any) => {
        if (res.status == true)
          this.dashboardData = res.data
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err.message, "Error");
      this.loader.hide();
    }
  }
}
