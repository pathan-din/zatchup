import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-subadmin-profile',
  templateUrl: './subadmin-profile.component.html',
  styleUrls: ['./subadmin-profile.component.css']
})
export class SubadminProfileComponent implements OnInit {
  subData: any;

  constructor(
    private alert : NotificationService,
    private loader : NgxSpinnerService,
    private baseService : BaseService,
  ) { }

  ngOnInit(): void {
    this.getSubadminDetails()
  }

  getSubadminDetails(){
    try {
      this.loader.show()
      this.baseService.getData('admin/subadmin_profile_details/').subscribe(
        (res : any) => {
          if(res.status == true){
            this.subData = res.data
           }
           else{
             this.loader.hide()
             this.alert.error(res.error.message, 'Error')
           }
           this.loader.hide()
        }
      ), err => {
        this.loader.hide()
      }
    } catch (error) {
      this.loader.hide()
    }
  }
}
