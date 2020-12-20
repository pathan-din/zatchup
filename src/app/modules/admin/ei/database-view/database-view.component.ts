import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatabaseView } from '../modals/ei-pending-approval.modal';
import { Location } from '@angular/common'

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent implements OnInit {
  databaseView: DatabaseView;
  eiData: any;
  user_type: any;
  dataUrl: any;
  params: any;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private alert: NotificationService,
    private location: Location,
    private loader: NgxSpinnerService,
  ) {
    this.databaseView = new DatabaseView();
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getDatabaseView();
    });
  }

  conversationComments() {
    this.router.navigate(['admin/ei-onboarding-conversation-comments', this.eiData.id])
  }

  eiRequestHistory() {
    this.router.navigate(['admin/ei-onboarding-request-history'])
  }

  getDatabaseView() {
    this.loader.show()
    if (this.params.id)
      this.dataUrl = 'admin/ei-profile-added-by-admin/' + this.params.id
    else
      this.dataUrl = 'admin/ei-pending-profile/' + this.params.user_id
    this.baseService.getData(this.dataUrl).subscribe(
      (res: any) => {
        if (res.status == true)
          this.eiData = res.data
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ),
      err => {
        this.alert.error(err, 'Error');
        this.loader.hide();
      }
  }

  goBack(): void {
    this.location.back();
  }
}
