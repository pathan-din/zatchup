import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-my-assigned-ei-history',
  templateUrl: './my-assigned-ei-history.component.html',
  styleUrls: ['./my-assigned-ei-history.component.css']
})
export class MyAssignedEiHistoryComponent implements OnInit {
  eiHistory: any;
  order: any = '';

  constructor(
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.getEIHistory()
  }

  getEIHistory() {
    this.loader.show()
    let params ={
      "ascending":  this.order
    }
    this.baseService.getData('admin/my-assigned-ei-history/').subscribe(
      (res: any) => {
        if (res.status == true)
          this.eiHistory = res.results
        this.loader.hide()
      }
    ), err => {
      this.loader.hide()
    }
  }

}
