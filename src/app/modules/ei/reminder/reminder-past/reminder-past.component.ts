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

  dataSource = ELEMENT_DATA;
  images: any=[];
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
      this.baseService.getData("chat/chat_reminder_notification_past/").subscribe((res:any)=>{
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
  fileType(file: any) {
    return file.split('.').pop();
  }
  viewImage(src) {
    this.images = []
    this.images.push(src);
  }
 
}
