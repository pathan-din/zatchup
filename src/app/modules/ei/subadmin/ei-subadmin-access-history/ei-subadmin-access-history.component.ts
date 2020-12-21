import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import {Location} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-ei-subadmin-access-history',
  templateUrl: './ei-subadmin-access-history.component.html',
  styleUrls: ['./ei-subadmin-access-history.component.css']
})
export class EiSubadminAccessHistoryComponent implements OnInit {
   historyList:any;

  constructor(
    private router: Router,
    private baseService : BaseService,
    private alert:NotificationService,
    private location:Location,
    private loader: NgxSpinnerService 
  ) { }

  ngOnInit(): void {
    this.getSubAdminHistory();
  }

  goBack(): void{
    this.location.back()
  }
  getSubAdminHistory(){
    try {
    this.loader.show();  
    this.baseService.getData("ei/history-for-subadmin-list/").subscribe(res=>{
      this.loader.hide();  
      let response : any ={};
      response = res;
      this.historyList=response.results;
      if(response.stattus==true){
        this.historyList=response.results;
      }else{
        this.loader.hide();
      }
      
    },(error=>{
      this.loader.hide();
    }))
    } catch (e) {
      this.loader.hide();
    }
  }
}
