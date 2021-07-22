import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubadminViewStatus } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-subadmin-view-status',
  templateUrl: './ei-subadmin-view-status.component.html',
  styleUrls: ['./ei-subadmin-view-status.component.css']
})
export class EiSubadminViewStatusComponent implements OnInit {
  subadminViewStatus : SubadminViewStatus
  
  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private route: ActivatedRoute,
  ) {
    this.subadminViewStatus = new SubadminViewStatus()
   }


  ngOnInit(): void {
    this.getEIStatus('');
  }

  goBack(): void {
    this.location.back()
  }

  // getEIStatus(page?: any) {
  //   this.loader.show();
  //   this.listParams = {
  //     "page_size": this.pageSize,
  //     "page": page,
      
  //   }
  //   let url:any ='';
  //   this.route.queryParams.subscribe(params=>{
  //     if(params['status']=='approved'){
  //       this.listParams.status =params['status'];
  //       url ='ei/approved-subadmin-list-by-ei/';
  //     }else if(params['status']=='rejected'){
  //       this.listParams.status='';
  //       url ='ei/rejected-by-zatchup-subadmin-list-by-ei/';
  //     }else{
  //       this.listParams.status =params['status'];
  //       url ='ei/sent-for-approval-subadmin-list-by-ei/';
  //     }
      
  //   })
  //  this.baseService.getData(url , this.model).subscribe(
  //     (res: any) => {
  //       if (res.status == true) {
  //         if (!page)
  //           page = this.config.currentPage
  //         this.startIndex = res.page_size * (page - 1) + 1;
  //         this.config.itemsPerPage = res.page_size
  //         this.pageSize = res.page_size
  //         this.config.currentPage = page
  //         this.config.totalItems = res.count;
  //         if (res.count > 0){
  //           console.log("yes");
  //           this.pageCounts = this.baseService.getCountsOfPage()
  //           this.dataSource = res.results
  //         }
          
  //         else{
  //           console.log("yes");
  //           this.dataSource = undefined
  //           this.dataSource =[];
  //         }
          
  //       }
  //       else
  //         this.alert.error(res.error.message[0], 'Error')
  //       this.loader.hide();
  //     }
  //   ), (err: any) => {
  //     this.alert.error(err, 'Error')
  //     this.loader.hide();
  //   }
  // }

  getEIStatus(page? : any){
    try {
      this.loader.show()
      let url: any ='';
      if(this.route.snapshot.queryParamMap.get('status') == 'SENTFORSIGNUP'){
        url = 'ei/sent-for-approval-subadmin-list-by-ei/'
        this.subadminViewStatus.params = {
          'page' :page,
          'page_size':this.subadminViewStatus.page_size,
      
        }
      }
      else if(this.route.snapshot.queryParamMap.get('status') == 'approved') {
        url = 'ei/approved-subadmin-list-by-ei/'
        this.subadminViewStatus.params = {
          'page' :page,
          'page_size':this.subadminViewStatus.page_size,
          'status': 'APPROVBYUSER'
      
        }
      }

      else if(this.route.snapshot.queryParamMap.get('status') == 'rejected') {
        url = 'ei/approved-subadmin-list-by-ei/'
        this.subadminViewStatus.params = {
          'page' :page,
          'page_size':this.subadminViewStatus.page_size,
          'status': 'REJECTBYUSER'
      
        }
      }

      
      
      this.baseService.getData(url,  this.subadminViewStatus.params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.subadminViewStatus.config.currentPage
            this.subadminViewStatus.startIndex = res.page_size * (page- 1) + 1;
            this.subadminViewStatus.page_size = res.page_size
            this.subadminViewStatus.config.itemsPerPage = this.subadminViewStatus.page_size
            this.subadminViewStatus.config.currentPage = page
            this.subadminViewStatus.config.totalItems = res.count
            if(res.count > 0) {
              this.subadminViewStatus.dataSource = res.results;
              this.subadminViewStatus.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.subadminViewStatus.dataSource = undefined
              this.subadminViewStatus.pageCounts = undefined
            }
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ), 
      err => {
        console.log(err);
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  deleteRow(id){
    try {
      this.loader.show()
    this.baseService.action("ei/delete-request-for-signup-students/",{id:id}).subscribe((res:any)=>{
      if(res.status == true){
        this.loader.hide()
        this.alert.success(res.message,"Success")
        this.getEIStatus('');
      }else{
        this.loader.hide()
        this.alert.error(res.error.message[0],"Error")
      }
    },(error)=>{
      this.alert.error(error.error,"Error")
    })
    } catch (e) {
    
    }
  }
}
