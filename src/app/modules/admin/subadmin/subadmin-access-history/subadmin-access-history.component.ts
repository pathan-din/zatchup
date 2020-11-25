import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-subadmin-access-history',
  templateUrl: './subadmin-access-history.component.html',
  styleUrls: ['./subadmin-access-history.component.css']
})
export class SubadminAccessHistoryComponent implements OnInit {
  pageSize: any = 5
  accessHistory: any

  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.getAccessHistory()
  }

  getAccessHistory(){
    let params = {
      "page_size": this.pageSize,
      "page": 1
    }
    this.baseService.getData('admin/sub-admin/get_admin_access_list/', params).subscribe(
      (res: any) =>{
        if(res.status == true && res.count != 0){
          this.accessHistory = res.results
        }
      }
    )
  }

}
