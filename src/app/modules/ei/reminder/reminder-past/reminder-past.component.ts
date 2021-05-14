import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

export interface subAdminManagementElement {
  SNo: number;
  reminder : string;
  time: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [];

@Component({
  selector: 'app-reminder-past',
  templateUrl: './reminder-past.component.html',
  styleUrls: ['./reminder-past.component.css']
})
export class ReminderPastComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'message','attachment', 'recieved_date'];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };
  dataSource = ELEMENT_DATA;
  images: any=[];
  model:any={}
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router,
    private baseService : BaseService,
    private loader:NgxSpinnerService,
    private alert:NotificationService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.getPastReminder("");
  }
  getPastReminder(page){
    try {
      this.model.page=page;
      this.baseService.getData("chat/chat_reminder_notification_past/",this.model).subscribe((res:any)=>{
        if(res.status==true){
          this.alert.success("Data get successfully","Success");
          this.dataSource=res.results
          this.pageSize = res.page_size;
          this.model.page_size=this.pageSize
          this.totalNumberOfPage = res.count;
          if (!page) { page = 1 }
          var i = (this.pageSize * (page - 1)) + 1;
          this.config.itemsPerPage = this.pageSize
          this.config.currentPage = page
          this.config.totalItems = this.totalNumberOfPage
        }
      },error=>{
        this.loader.hide()
      })
    } catch (error) {
      this.loader.hide()
    }
  } 
  fileType(file: any) {
    return file.split('.').pop();
  }
  viewImage(src) {
    this.images = []
    this.images.push(src);
  }
 
}
