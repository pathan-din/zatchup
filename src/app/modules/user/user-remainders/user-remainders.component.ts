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
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };
  model:any={}
  totalItems:any;
  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit() {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.getReminders("")
  }
  getReminders(page) {
    try {
      this.loader.show();
      this.model.page_size=20;
      this.model.page=page
      this.baseService.getData("user/get-all-reminders/",this.model).subscribe((res: any) => {
        if (res.status == true) {
          if (res.count <= 0)
            this.remaindersList = undefined
          else
            this.remaindersList = res.results
            this.pageSize = res.page_size;
            this.model.page_size=this.pageSize
            this.totalNumberOfPage = res.count;
            if (!page) { page = 1 }
            var i = (this.pageSize * (page - 1)) + 1;
            this.config.itemsPerPage = this.pageSize
            this.config.currentPage = page
            this.config.totalItems = this.totalNumberOfPage
        } else {
          // this.notificationList = [];
        }
        this.loader.hide();
      })
    } catch (e) {
      this.loader.hide();
    }


  }
  openAccordian($event){
    console.log($event);
    
  }
  goBack(): void {
    this.location.back()
  }

  reminderReply(reminderText, reminderFireBaseId){
    localStorage.setItem('uuid', reminderFireBaseId);
    // localStorage.setItem('friendlidt_id', userFriendId)
    localStorage.setItem('reminderText' , reminderText);
    this.router.navigate(["user/chat"]);
  }


}
