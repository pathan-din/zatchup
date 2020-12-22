import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Pagination } from '../modals/education-institute.modal';

@Component({
  selector: 'app-institute-history',
  templateUrl: './institute-history.component.html',
  styleUrls: ['./institute-history.component.css']
})
export class InstituteHistoryComponent implements OnInit {
  errorDisplay: any = {}
  eiId: any;
  comment: any;
  isDeleted: any = '';
  pagination: Pagination

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService
  ) { 
    this.pagination = new Pagination()
  }

  ngOnInit(): void {
    this.eiId = this.activeRoute.snapshot.params.id;
    this.getEIHistory()
  }

  addComment() {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    this.loader.show()
    let data = {
      'user_id': this.eiId,
      'comments': this.comment,
    }
    this.baseService.action('admin/onboarding-comments/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, 'Success')

        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }, err => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
    )
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  getEIHistory(page?: any) {
    this.loader.show();

    let listParams = {
      "eid": this.eiId,
      "module_name": "EDUCATIONINSTITUTE",
      "is_deleted": this.isDeleted,
      "page_size": this.pagination.page_size,
      "page": page
    }
    this.baseService.getData('admin/common_history/', listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.pagination.config.currentPage
          this.pagination.startIndex = res.page_size * (page - 1) + 1;
          this.pagination.config.itemsPerPage = res.page_size
          this.pagination.config.currentPage = page;
          this.pagination.page_size = res.page_size;
          this.pagination.config.totalItems = res.count;
          if (res.count > 0) {
            this.pagination.dataSource = res.results;
          }
          else
            this.pagination.dataSource = undefined
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

  goBack(){
    this.location.back()
  }
}
