import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { ApprovalSchoolList } from '../common/starclass-model';


@Component({
  selector: 'app-school-approval-list',
  templateUrl: './school-approval-list.component.html',
  styleUrls: ['./school-approval-list.component.css']
})
export class SchoolApprovalListComponent implements OnInit {
  approvalSchoolList : ApprovalSchoolList

  constructor(
    private router: Router,
    private location: Location,
    private baseService : BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private route : ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) {
    this.approvalSchoolList = new ApprovalSchoolList()
   }

  ngOnInit(): void {
   this.getApprovalSchoolList()
  }

  getApprovalSchoolList(page? : any){
    try {
      this.loader.show()
  

      this.approvalSchoolList.params = {
        'page' :page,
        'page_size':this.approvalSchoolList.page_size,
        'status': this.route.snapshot.queryParamMap.get('status')? this.route.snapshot.queryParamMap.get('status') : '' 
       
      }
      this.baseService.getData('user/sent_for_approval_view_status/', this.approvalSchoolList.params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.approvalSchoolList.config.currentPage
            this.approvalSchoolList.startIndex = res.page_size * (page- 1) + 1;
            this.approvalSchoolList.page_size = res.page_size
            this.approvalSchoolList.config.itemsPerPage = this.approvalSchoolList.page_size
            this.approvalSchoolList.config.currentPage = page
            this.approvalSchoolList.config.totalItems = res.count
            if(res.count > 0) {
              this.approvalSchoolList.dataSource = res.results;
              this.approvalSchoolList.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.approvalSchoolList.dataSource = undefined
              this.approvalSchoolList.pageCounts = undefined
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

  goToAddEiPage(schoolId){
    this.router.navigate(['user/add-ei'], {queryParams: {'school_id': schoolId}})
  }

  goBack(){
    this.location.back()
  }

}