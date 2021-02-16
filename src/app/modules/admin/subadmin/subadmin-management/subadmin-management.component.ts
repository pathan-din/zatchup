import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


export interface subAdminManagementElement {

  'position': number;
  Name: string;
  EmployeeID: string;
  EmailID: string;
  Phone_no: string
  Action: string;

}

@Component({
  selector: 'app-subadmin-management',
  templateUrl: './subadmin-management.component.html',
  styleUrls: ['./subadmin-management.component.css']
})
export class SubadminManagementComponent implements OnInit {
  pageSize: any = 5;
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  startIndex: any
  displayedColumns: string[] = ['position', 'Name', 'EmployeeID', 'EmailID', 'Phone_no', 'Action'];

  dataSource: any;
  pageCount: any;

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { }

  goToSubadminAddPage() {
    this.router.navigate(['admin/subadmin-add'],{ queryParams: { "returnUrl": "admin/subadmin-dashboard" } });
  }

  goToSubadminAccessHistoryPage() {
    this.router.navigate(['admin/subadmin-access-history'], { queryParams: { "returnUrl": "admin/subadmin-dashboard" } });
  }

  goToSubadminAuthorirtyPage(data) {
    this.router.navigate(['admin/subadmin-authorization-access-view', data.id], { queryParams: { "returnUrl": "admin/subadmin-dashboard" } });
  }
  ngOnInit(): void {
    this.getSubadminList('')
  }

  getSubadminList(page: any = '') {
    try {
      this.loader.show();
      let params = {
        "page_size": this.pageSize ? this.pageSize : 5,
        "page": page ? page : 1
      }
      this.baseService.getData('admin/sub-admin/subadmin_management_list/', params).subscribe(
        (res: any) => {
          if (res.status == true) {
            if (!page)
              page = this.config.currentPage
            this.startIndex = res.page_size * (page - 1) + 1;
            this.config.itemsPerPage = res.page_size
            this.config.currentPage = page
            this.config.totalItems = res.count
            this.dataSource = res.results;
            this.pageCount = this.baseService.getCountsOfPage();
          }
          else {
            this.dataSource = undefined;
            this.alert.error(res.error, 'Error');
          }
          this.loader.hide();
        }
      ), err => {
        this.loader.hide();
      }
    } catch (e) {
      this.loader.hide();
    }
  }

  generateExcel() {
    this.baseService.generateExcel('admin/sub-admin/export_subadmin_management_list/', 'subadmin-list')
  }
}
