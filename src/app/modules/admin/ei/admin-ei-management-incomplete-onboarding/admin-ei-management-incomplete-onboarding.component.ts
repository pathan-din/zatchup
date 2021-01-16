import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { OnBoardList } from '../modals/ei-pending-approval.modal';
import { DatePipe } from '@angular/common';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { Location } from '@angular/common'
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';



@Component({
  selector: 'app-admin-ei-management-incomplete-onboarding',
  templateUrl: './admin-ei-management-incomplete-onboarding.component.html',
  styleUrls: ['./admin-ei-management-incomplete-onboarding.component.css'],
  providers: [DatePipe]
})
export class AdminEiManagementIncompleteOnboardingComponent implements OnInit {
  @ViewChild('closeSendMailButton') closeSendMailButton: any;
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
  onboardList: OnBoardList;

  dataSource: any;
  educationInstitute: any;
  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private confirmDialogService: ConfirmDialogService,
    private validationService: GenericFormValidationService,
    private location: Location,
  ) {
    this.onboardList = new OnBoardList();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getONBoardList('');
    this.getAllState();
    this.onboardList.pageCounts = this.baseService.getCountsOfPage();
  }

  goToAdminEiMangIncopleteOnboardViewPage(id) {
    this.router.navigate(['admin/ei-profile-details', id]);
  }

  getONBoardList(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.onboardList.allStates && this.onboardList.stateId) {
      stateFind = this.onboardList.allStates.find(val => {
        return val.id == this.onboardList.stateId
      })
    }
    if (this.onboardList.allCities) {
      cityFind = this.onboardList.allCities.find(val => {
        return val.id == this.onboardList.cityId
      })
    }
    this.onboardList.listParams = {
      'date_from': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university": this.onboardList.university,
      "is_payment": this.onboardList.stagePending,
      "page_size": this.onboardList.pageSize ? this.onboardList.pageSize : 5,
      "page": page ? page : 1
    }

    this.baseService.getData('admin/ei/get_incomplete_ei_list/', this.onboardList.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.onboardList.config.currentPage
          this.onboardList.startIndex = res.page_size * (page - 1) + 1;
          this.onboardList.config.itemsPerPage = res.page_size
          this.onboardList.config.currentPage = page
          this.onboardList.config.totalItems = res.count;
          if (res.count > 0) {
            this.onboardList.dataSource = res.results;
          }
          else
            this.onboardList.dataSource = undefined
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
    delete this.onboardList.listParams.page_size;
    delete this.onboardList.listParams.page;
    this.onboardList.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/ei/export_incomplete_ei_data/', 'incomplete-ei-data', this.onboardList.listParams);
  }


  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.onboardList.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.onboardList.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.onboardList.allCities = res.results
      }
    )
  }

  deleteEI(id: any): any {
    this.confirmDialogService.confirmThis('Are you sure to delete ?', () => {
      this.loader.show()
      this.baseService.action('admin/ei/delete_incomplete_ei/', { "ei_id": id }).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getONBoardList('');
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }
  getEI_ID(id: any) {
    this.onboardList.eiId = id
  }

  sendMail() {
    this.onboardList.errorDisplay = {};
    this.onboardList.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.onboardList.errorDisplay.valid) {
      return false;
    }
    this.loader.show()
    let data = {
      "ei_id": parseInt(this.onboardList.eiId),
      "msg": this.onboardList.message
    }
    this.baseService.action('admin/send_email_to_ei/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, "Success");
        } else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.closeSendMailButton.nativeElement.click();
        this.loader.hide();
      }
    ), err => {
      this.alert.error(err.error, 'Error')
      this.loader.hide();
    }
  }
  goBack(): void {
    this.location.back();
    console.log(location)
  }

  searchList(page?: any) {
    let stateFind: any;
    let cityFind: any;
    if (this.onboardList.allStates && this.onboardList.stateId) {
      stateFind = this.onboardList.allStates.find(val => {
        return val.id == this.onboardList.stateId
      })
    }
    if (this.onboardList.allCities) {
      cityFind = this.onboardList.allCities.find(val => {
        return val.id == this.onboardList.cityId
      })
    }

    this.onboardList.listParams = {
      "search": this.onboardList.search,
      'date_from': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university": this.onboardList.university,
      "page_size": this.onboardList.pageSize,
      "page": page
    }
    this.loader.show();
    this.baseService.getData('admin/ei_search/', this.onboardList.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.onboardList.config.currentPage
          this.onboardList.startIndex = res.page_size * (page - 1) + 1;
          this.onboardList.pageSize = res.page_size;
          this.onboardList.config.itemsPerPage = res.page_size
          this.onboardList.config.currentPage = page
          this.onboardList.config.totalItems = res.count;

          if (res.count > 0)
            this.onboardList.dataSource = res.results
          else
            this.onboardList.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    )
  }

  filterData(page) {
    if (this.onboardList.search)
      this.searchList(page)
    else
      this.getONBoardList(page)
  }
}