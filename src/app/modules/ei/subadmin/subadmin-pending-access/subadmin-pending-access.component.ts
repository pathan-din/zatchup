import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { Location } from '@angular/common';

export interface subAdminManagementElement {
  'SNo': number;
  zatchUpID: string;
  Name: string;
  employeelID: string;
  Designation: string;
  Module: string;
  subModule: string;
  class: string;
  remarks: string;
  viewSubAdmin: string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [];

@Component({
  selector: 'app-subadmin-pending-access',
  templateUrl: './subadmin-pending-access.component.html',
  styleUrls: ['./subadmin-pending-access.component.css']
})
export class SubadminPendingAccessComponent implements OnInit {
  @ViewChild('closeRejectModal') closeRejectModal: any;
  displayedColumns: string[] = ['SNo', 'zatchup_id', 'Name', 'employee_num', 'designation', 'module','sub_module', 'class_list',
    'remarks', 'viewSubAdmin', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  subAdminList: any = [];
  model: any = {};
  collection = { count: 60, data: [] };
  startIndex=1;
  modelReason: any = {};
  errorDisplay: any = {};
  userId: any;
  pageCounts: any;
  constructor(
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public base: BaseService,
    private alert: NotificationService,
    private confirmDialogService: ConfirmDialogService,
    private ValidationService: GenericFormValidationService,
    private location: Location) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };

    this.getPendingAccessRequest('');
  }
  getPendingAccessRequest(page?:any) {
    try {
      this.SpinnerService.show();
      //base
      this.model.page=page;

      //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
      this.base.getData('ei/pending-access-subadmin-list-by-ei/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

       
        this.pageSize = response.page_size;
        this.model.page_size = this.pageSize
        this.totalNumberOfPage = response.count;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage
         
        if (!page) { page = 1 }
        this.startIndex= (this.pageSize * (page - 1)) + 1;
         if(response.results.length>0)
         {
          this.dataSource = response.results;
          this.pageCounts = this.base.getCountsOfPage()
         }else{
          this.dataSource =[];
         }

       
        if (response.status == false) {
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
        // console.log(error);
        // this.alert.error(response.message[0], 'Error')
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
      // this.alert.error(err, 'Error')
    }
  }
  approveUser(id: any): any {
    this.confirmDialogService.confirmThis('Are you sure you want to approve this user?', () => {
      let data = {
       
        "module_access_id": id
      }
      this.SpinnerService.show()
      this.base.action('ei/approve-pending-access-subadmin-by-ei/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getPendingAccessRequest('');
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.SpinnerService.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.SpinnerService.hide();
      }
    }, () => {
    });
  }
  redirectToDetailPage(id) {
    this.router.navigate(['ei/subadmin-details'], { queryParams: { id: id } });
  }
  rejectUserModal(id: any) {
    this.modelReason.module_access_id = id
  }
  rejectUser(): any {
    this.errorDisplay = {};
    this.errorDisplay = this.ValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show()
      this.base.action('ei/reject-pending-access-subadmin-by-ei/', this.modelReason).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.closeRejectModal.nativeElement.click();
            this.alert.success(res.message, "Success")
            this.getPendingAccessRequest('');
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.SpinnerService.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.SpinnerService.hide();
      }
    } catch (err) {
      this.SpinnerService.hide();
    }

  }
  generateExcel() { }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.ValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  goBack(): void{
    this.location.back()
  }
}
