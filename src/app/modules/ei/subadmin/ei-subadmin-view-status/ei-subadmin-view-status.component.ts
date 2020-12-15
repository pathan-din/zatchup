import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-subadmin-view-status',
  templateUrl: './ei-subadmin-view-status.component.html',
  styleUrls: ['./ei-subadmin-view-status.component.css']
})
export class EiSubadminViewStatusComponent implements OnInit {
  displayedColumns: string[] = ['SNo', 'date', 'ZatchUpID', 'Name', 'EmailID_phone', 'Designation', 'EmployeeID',
    'status', 'Action'];
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  dataSource: any;

  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getEIStatus('');
  }

  goBack(): void {
    this.location.back()
  }

  getEIStatus(page?: any) {
    this.loader.show();
    this.listParams = {
      "page_size": this.pageSize,
      "page": page,
      
    }
    let url:any ='';
    this.route.queryParams.subscribe(params=>{
      if(params['status']!='rejected'){
        this.listParams.status =params['status'];
        url ='ei/sent-for-approval-subadmin-list-by-ei/';
      }else{
        this.listParams.status='';
        url ='ei/rejected-by-zatchup-subadmin-list-by-ei/';
      }
      
    })
   
    
    this.baseService.getData(url , this.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.config.currentPage
          this.startIndex = res.page_size * (page - 1) + 1;
          this.config.itemsPerPage = res.page_size
          this.pageSize = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count;
          if (res.count > 0)
            this.dataSource = res.results
          else
            this.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }
}
