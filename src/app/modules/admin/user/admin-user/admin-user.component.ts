import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserDashboard } from '../modals/admin-user.modal';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  dashboardData: any;
  userDashboard: UserDashboard

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService
  ) { 
    this.userDashboard = new UserDashboard()
  }

  ngOnInit(): void {
    this.getUserDashboardData()
  }

  getUserDashboardData() {
    this.loader.show();
    this.baseService.getData('admin/user/get_user_dashboard_summary/').subscribe(
      (res: any) => {
        if (res.status == true){
          this.dashboardData = res.data
          this.userDashboard = res.data;
          console.log(this.userDashboard)
        }
        else
          this.alert.error(res.error.message, 'Error')
        this.loader.hide()
      }
    ), err => {
      this.loader.hide()
    }
  }

}
