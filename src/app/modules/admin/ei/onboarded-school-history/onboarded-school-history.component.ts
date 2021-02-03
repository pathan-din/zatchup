import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Pagination } from '../modals/education-institute.modal';
@Component({
  selector: 'app-onboarded-school-history',
  templateUrl: './onboarded-school-history.component.html',
  styleUrls: ['./onboarded-school-history.component.css']
})
export class OnboardedSchoolHistoryComponent implements OnInit {
  recordCount: any
  eiId: any;
  pagination: Pagination
  displayedColumns: string[] = ['position', 'date_time',
    'message', 'emp_name'];

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
  ) {
    this.pagination = new Pagination()
  }

  ngOnInit(): void {
    this.eiId = this.activeRoute.snapshot.params.id;
    this.getEIHistory()
  }

  getEIHistory(page?: any) {
    this.loader.show();

    let listParams = {
      "school_id": this.eiId,
      "module_name": "EDUCATIONINSTITUTE",
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
          this.recordCount = this.baseService.getCountsOfPage()
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

  goBack() {
    this.location.back()
  }

}
