import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['SNo', 'NotificationMessage', 'Time'];

  constructor(
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNorificationList();
  }

  getNorificationList() {
    try {
      this.loader.show();
      this.baseService.getData("ei/notification-fetch-list/").subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.dataSource = res.results
          } else {
            this.loader.hide();
            this.dataSource = [];
          }
        })
    } catch (e) {
      this.loader.hide();
    }


  }

  goBack(): void {
    this.location.back()
  }

}
