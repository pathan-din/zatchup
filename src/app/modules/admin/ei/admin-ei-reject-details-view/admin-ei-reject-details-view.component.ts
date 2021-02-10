import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-admin-ei-reject-details-view',
  templateUrl: './admin-ei-reject-details-view.component.html',
  styleUrls: ['./admin-ei-reject-details-view.component.css']
})
export class AdminEiRejectDetailsViewComponent implements OnInit {
  @ViewChild('closeEiEditModel') closeEiEditModel: any;
  eiId: any;
  eiData: any;
  eiExData: any;
  errorDisplay: any = {};

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.eiId = this.activeRoute.snapshot.params.id;
    this.getProfileData();
  }

  getProfileData() {
    this.loader.show()
    let url = 'admin/ei-pending-profile/' + this.eiId
    this.baseService.getData(url).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.eiData = res.data;
          this.eiExData = res.data.existing_data;
          if (Object.keys(this.eiExData).length == 0) {
            this.eiExData = undefined;
          }
        } else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  editEI(): any {
    this.confirmDialogService.confirmThis('Are you sure you want to send for re-verification ?', () => {
      this.loader.show()
      let data = {
        "user_id": this.eiData.id
      }
      this.baseService.action('admin/edit_rejected_school/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.router.navigate(['admin/rejected-ei-list'])
          } else {
            this.alert.error(res.error.message, 'Error')
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

  goBack(): void {
    this.router.navigate(['admin/rejected-ei-list'])
  }
}
