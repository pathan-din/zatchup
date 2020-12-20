import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import {Location} from '@angular/common';
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
    private location:Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void{
    this.location.back()
  }
  getSubAdminHistory(){
    try {
      
    this.baseService.getData("ei/history-for-subadmin-list/").subscribe(res=>{
      let response : any ={};
      response = res;
      if(response.stattus==true){
        this.historyList=response.results;
      }
      
    },(error=>{

    }))
    } catch (e) {
    
    }
  }
}
