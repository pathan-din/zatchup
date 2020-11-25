import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { EIPendingApproval } from '../modals/ei-pending-approval.modal'
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-ei-management-pending-for-approval',
  templateUrl: './admin-ei-management-pending-for-approval.component.html',
  styleUrls: ['./admin-ei-management-pending-for-approval.component.css']
})
export class AdminEiManagementPendingForApprovalComponent implements OnInit {
  eIPendingApproval: EIPendingApproval;

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.eIPendingApproval = new EIPendingApproval();
    this.eIPendingApproval.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getEIApprovalList();
    this.getAllState();
  }


  goToAdminEiManagementIncompleteOnboardingViewPage(data) {
    this.router.navigate(['admin/ei-profile-details', data.id]);
  }

  getEIApprovalList(page?: any) {
    this.loader.show();

    this.eIPendingApproval.listParams = {
      "date_from": this.eIPendingApproval.filterFromDate !== undefined ? this.datePipe.transform(this.eIPendingApproval.filterFromDate, 'yyyy-MM-dd') : '',
      "date_to": this.eIPendingApproval.filterFromDate !== undefined ? this.datePipe.transform(this.eIPendingApproval.filterFromDate, 'yyyy-MM-dd') : '',
      "city": this.eIPendingApproval.cityId ? this.getValue(this.eIPendingApproval.allCities, this.eIPendingApproval.cityId, 'city'): '',
      "state": this.eIPendingApproval.stateId ? this.getValue(this.eIPendingApproval.allStates, this.eIPendingApproval.stateId, 'state'): '',
      "university": this.eIPendingApproval.university,
      "addition_type": this.eIPendingApproval.additionType,
      "page_size": this.eIPendingApproval.pageSize ? this.eIPendingApproval.pageSize : 5,
      "page": page ? page : 1
    }

    this.baseService.getData('admin/ei-pending-list/', this.eIPendingApproval.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.eIPendingApproval.config.currentPage
          this.eIPendingApproval.startIndex = res.page_size * (page - 1) + 1;
          this.eIPendingApproval.config.itemsPerPage = res.page_size
          this.eIPendingApproval.config.currentPage = page
          this.eIPendingApproval.config.totalItems = res.count;

          if (res.count > 0)
            this.eIPendingApproval.dataSource = res.results
          else
            this.eIPendingApproval.dataSource = undefined
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

  generateExcel() {
    delete this.eIPendingApproval.listParams.page_size;
    delete this.eIPendingApproval.listParams.page;
    this.eIPendingApproval.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/export-ei-pending-list/', 'EI-pending-for-approval', this.eIPendingApproval.listParams);
  }

  action(user) {
    this.eIPendingApproval.userId = user.id
  }

  cancel() {
    this.eIPendingApproval.userId = undefined
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.eIPendingApproval.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.eIPendingApproval.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.eIPendingApproval.allCities = res.results
      }
    )
  }

  getValue(data, id, value) {
    let find = data.find(val => {
      return val.id == id
    })

    return find[value];
  }
}
