import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from '../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

export interface NotificationElement {
  'SNo': number;
  NotificationMessage : string;
  Time : string;
}

const ELEMENT_DATA: NotificationElement[] = [];

@Component({
  selector: 'app-ei-notification',
  templateUrl: './ei-notification.component.html',
  styleUrls: ['./ei-notification.component.css']
})
export class EiNotificationComponent implements OnInit {
  displayedColumns: string[] = ['SNo', 'NotificationMessage', 'Time'];

  dataSource = ELEMENT_DATA;
  notificationList:any=[];
  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getNorificationList()
  }
getNorificationList(){
  try {
    this.loader.show();
    this.baseService.getData("ei/notification-fetch-list/").subscribe(res=>{
      let response:any={};
      response=res;
      if(response.status==true)
      {
        this.loader.hide();
        this.dataSource = response.results
      }else{
        this.loader.hide();
        this.dataSource=[];
      }
    })
  } catch (e) {
    this.loader.hide();
  }

  
}

goBack(): void{
  this.location.back()
}
}
