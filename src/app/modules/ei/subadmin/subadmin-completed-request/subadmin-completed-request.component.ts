import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubadminCompleteRequest } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-subadmin-completed-request',
  templateUrl: './subadmin-completed-request.component.html',
  styleUrls: ['./subadmin-completed-request.component.css']
})
export class SubadminCompletedRequestComponent implements OnInit {
  // displayedColumns: string[] = ['SNo', 'ZatchUpID', 'EmployeeID',
  //   'Name', 'EmailID', 'phone', 'Action'];
  displayedColumns: string[] = ['SNo', 'Name', 'zatchUpID', 'profilePicture', 'dateOfBirth', 'emailId',
    'phone', 'EmployeeID', 'Action'];
     subadminCompleteRequest : SubadminCompleteRequest
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  dataSource: any = [];
  modelReason: any = {};
  errorDisplay: any = {};
  userId: any;
  pageCounts: any;


  constructor(
    private location: Location,
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService
  ) {
    this.subadminCompleteRequest = new SubadminCompleteRequest ()
   }

  ngOnInit(): void {
    this.getSubadminCompletedRequest('')
  }

  goBack(): void {
    this.location.back()
  }

  getSubadminCompletedRequest(page?: any) {
    this.loader.show();
    this.subadminCompleteRequest.listParams = {
      "page_size": this.subadminCompleteRequest.page_size,
      "page": page
    }
    this.baseService.getData('ei/subadmin-lists-by-ei/', this.subadminCompleteRequest.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
          page = this.subadminCompleteRequest.config.currentPage
          this.subadminCompleteRequest.startIndex = res.page_size * (page- 1) + 1;
          this.subadminCompleteRequest.page_size = res.page_size
          this.subadminCompleteRequest.config.itemsPerPage = this.subadminCompleteRequest.page_size
          this.subadminCompleteRequest.config.currentPage = page
          this.subadminCompleteRequest.config.totalItems = res.count
          if(res.count > 0) {
            this.subadminCompleteRequest.dataSource = res.results;
            this.subadminCompleteRequest.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.subadminCompleteRequest.dataSource = undefined
            this.subadminCompleteRequest.pageCounts = undefined
          }
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
          
        }
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  redirectToDetailPage(id) {
    this.router.navigate(['ei/subadmin-details'], { queryParams: { id: id } });
  }
}
