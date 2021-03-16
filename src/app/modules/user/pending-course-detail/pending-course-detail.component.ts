import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pending-course-detail',
  templateUrl: './pending-course-detail.component.html',
  styleUrls: ['./pending-course-detail.component.css']
})
export class PendingCourseDetailComponent implements OnInit {
  displayedColumns: string[] = ['name_of_school', 'state', 'city', 'course_name', 'joining_standard_name', 'last_standard_name', 'class_name'];
  dataSource = [];
  constructor(private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getSubadminPendingRequest();
  }

  goBack(): void {
    this.location.back()
  }

  getSubadminPendingRequest(page?: any) {
    this.loader.show();
    this.baseService.getData('user/pending-course-list-of-user/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.dataSource = res.data;
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


}
