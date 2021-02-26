import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

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
  ) { }

  ngOnInit(): void {
    this.pageCounts = this.baseService.getCountsOfPage()
    this.getSubadminCompletedRequest('')
  }

  goBack(): void {
    this.location.back()
  }

  getSubadminCompletedRequest(page?: any) {
    this.loader.show();
    this.listParams = {
      "page_size": this.pageSize,
      "page": page
    }
    this.baseService.getData('ei/subadmin-lists-by-ei/', this.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.config.currentPage
          this.startIndex = res.page_size * (page - 1) + 1;
          this.config.itemsPerPage = res.page_size
          this.pageSize = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count;
          if (res.count > 0) {
            this.dataSource = res.results;
          } else {
            this.dataSource = []
          }
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
          this.loader.hide();
        }
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
