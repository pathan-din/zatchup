import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';



@Component({
  selector: 'app-subscription-history',
  templateUrl: './subscription-history.component.html',
  styleUrls: ['./subscription-history.component.css']
})
export class SubscriptionHistoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'fieldChange', 'oldDetails', 'newDetails',
  'status'];   

  dataSource = [];
  constructor(private router:Router,
    private alert:NotificationService,
    private loader:NgxSpinnerService,
    private baseService : BaseService
    ) { }

  ngOnInit(): void {
    this.getSubscriptionHistory();
  }
  getSubscriptionHistory(){
   try {
   this.loader.show();
   this.baseService.getData("ei/get-user-subscription-list/").subscribe((res:any)=>{
    if(res.status == true){
      this.loader.show();
    }else{
      this.loader.show();
    }
   },(error)=>{
    this.loader.show();
   })
   } catch (e) {
    this.loader.show();
   } 
  }
}
