import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from '../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-remainders',
  templateUrl: './user-remainders.component.html',
  styleUrls: ['./user-remainders.component.css']
})
export class UserRemaindersComponent implements OnInit {

  remaindersList: any = [];
  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getReminders()
  }
  getReminders() {
    try {
      this.loader.show();
      this.baseService.getData("user/get-all-reminders/").subscribe((res: any) => {
        if (res.status == true) {
          if (res.count <= 0)
            this.remaindersList = undefined
          else
            this.remaindersList = res.results
        } else {
          // this.notificationList = [];
        }
        this.loader.hide();
      })
    } catch (e) {
      this.loader.hide();
    }


  }

  goBack(): void {
    this.location.back()
  }

}
