import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

export interface PendingRequestForUserElement {
 
  field_name: string;
  old_value: string;
  new_value: string;
}

const ELEMENT_DATA: PendingRequestForUserElement[] = [];
@Component({
  selector: 'app-pending-request-for-user',
  templateUrl: './pending-request-for-user.component.html',
  styleUrls: ['./pending-request-for-user.component.css']
})
export class PendingRequestForUserComponent implements OnInit {
  displayedColumns: string[] = ['field_name','old_value', 'new_value'];
  dataSource = ELEMENT_DATA;


  constructor( private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getSubadminPendingRequest();
  }

  goBack(): void {
    this.location.back()
  }
  
  getSubadminPendingRequest(page?: any) {
    this.loader.show();
     

    this.baseService.getData('user/pending-user-change-detail-list/').subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            
          if (res.count > 0){
            this.dataSource = res.results;
            
          }else {
            this.dataSource = []
        }}
        else{
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }}
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

}
