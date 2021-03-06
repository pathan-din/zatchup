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
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})

export class ReminderListComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'message', 'recieved_date'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router,
    private baseService : BaseService,
    private loader:NgxSpinnerService,
    private alert:NotificationService) { }

  ngOnInit(): void {
    this.getPastReminder();
  }
  getPastReminder(){
    try {
      this.baseService.getData("chat/chat_reminder_notification_present/").subscribe((res:any)=>{
        if(res.status==true){
          this.alert.success("Data get successfully","Success");
          this.dataSource=res.results
        }
      },error=>{
        this.loader.hide()
      })
    } catch (error) {
      this.loader.hide()
    }
  }  
}
