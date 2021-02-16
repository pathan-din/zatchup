import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

declare var $: any;
export interface PeriodicElement {
  position: number;
  fieldChange: string;
  oldDetails: string;
  newDetails: string;
  viewAttachments: string;
  status: string;
  remarks: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-request-change-details',
  templateUrl: './request-change-details.component.html',
  styleUrls: ['./request-change-details.component.css']
})
export class RequestChangeDetailsComponent implements OnInit {
  startIndex:any;
  requestStatusList:any;//,'action'
  displayedColumns: string[] = ['position', 'fieldChange', 'oldDetails', 'newDetails',
  'status'];   

  dataSource = ELEMENT_DATA;
  pageSize:any=1;
  totalNumberOfPage:any=10;
  config: any;
  collection = { count: 60, data: [] };
  model:any={};
  constructor( private baseService: BaseService,
    private validationService: GenericFormValidationService,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    private alert: NotificationService,
    private router: Router,
    private location : Location) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
  this.getViewChangesRequestStatus('');
  }
  getViewChangesRequestStatus(page){
    
    try {
      let data:any={};
      if(page){
        data=this.model;
        data.page= page 
      }else{data=this.model;}
      this.loader.show();
      this.baseService.getData('ei/request-change-student-list-of-ei',data).subscribe(res=>{
       let responce :any={};
       responce = res;
       this.pageSize=responce.page_size;
       this.model.page_size=this.pageSize;
       this.totalNumberOfPage=responce.count;
       this.config.itemsPerPage=this.pageSize
       this.config.currentPage=page
       this.config.totalItems=this.totalNumberOfPage
       if(responce.status==false){
         this.loader.hide();
         
         return;
       }
       this.loader.hide();
      
       if(!page){page=1;}
       var i= (this.pageSize*(page-1))+1;
       this.startIndex = i;
       let arrDataList:any=[];
       responce.results.forEach(objData=>{
         let objList:any={};
       
         objList.position=i;
         objList.fieldChange=objData.field_name.replace(/_/g, ' ').charAt(0).toUpperCase()+objData.field_name.replace(/_/g, ' ').slice(1);
         objList.oldDetails=objData.old_value;
         objList.newDetails=objData.new_value;
          
         objList.status=objData.approved?'Accepted':'Pending';
         
       //  objList.action='';
         arrDataList.push(objList);
        })
        this.dataSource = arrDataList;
       
       
      },(error)=>{
       this.loader.hide();
       this.alert.error("Something went wrong",'Error');
      })
     } catch (e) {
      this.loader.hide();
      this.alert.error(e,'Error');
     }
  }

  goBack(): void{
    this.location.back()
  }

}
