import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {  SchoolApprovalList } from '../../registration/modal/contact-us.mdal';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-approval-list-for-teacher',
  templateUrl: './approval-list-for-teacher.component.html',
  styleUrls: ['./approval-list-for-teacher.component.css']
})
export class ApprovalListForTeacherComponent implements OnInit {
  schoolApprovalList : SchoolApprovalList
  data: any;
  model: {};
  constructor(
    private router: Router,
    private location: Location,
    private baseService : BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private route : ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) {
    this.schoolApprovalList = new SchoolApprovalList()
   }

  ngOnInit(): void {
    this.getSchoolList()
  }

  goBack(){
    this.location.back()
  }

  getSchoolList(page? : any){
    try {
      this.loader.show()
      
      let params = {
        'page' :page,
        'page_size':this.schoolApprovalList.page_size,
    
      }
      
      this.baseService.getData('subadmin/get-request-ei-list/', params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.schoolApprovalList.config.currentPage
            this.schoolApprovalList.startIndex = res.page_size * (page- 1) + 1;
            this.schoolApprovalList.page_size = res.page_size
            this.schoolApprovalList.config.itemsPerPage = this.schoolApprovalList.page_size
            this.schoolApprovalList.config.currentPage = page
            this.schoolApprovalList.config.totalItems = res.count
            if(res.count > 0) {
              this.schoolApprovalList.dataSource = res.results;
              this.schoolApprovalList.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.schoolApprovalList.dataSource = undefined
              this.schoolApprovalList.pageCounts = undefined
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

  goToSchoolConfirm(schoolId){
    try {
      this.loader.show()
     this.model = {
       'school_id': schoolId
     }
      this.baseService.getData('subadmin/logout_view_status_sub_admin/', this.model).subscribe(
        (res:any) => {
          if(res.status == true){
            this.loader.hide()
            this.data = res.data
            this.data.approved = res.data.approved_by
            this.data.schoolId = res.data.school_id
            
            
            console.log(this.data.approved, 'approved');
            console.log(this.data.schoolId, 'school');
            
           
              if(this.data.approved == 0){
                this.router.navigate(['ei/subadmin-school-confirm'], {queryParams:{"school_id" : this.data.schoolId}})
              }
              else if(this.data.approved == 1){
               
                this.router.navigate(['ei/add-ei'], {queryParams: {'school_id': schoolId}})
   
              }
            
          }
          else{
            this.data = undefined
          }
          this.loader.hide()
        }
      )
    } catch (error) {
      this.loader.hide()
    }
  }

  
}
