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
  // eiId: string;
  eiData: any;
  user_type: any;
  id: any;

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
    if (this.activeRoute.snapshot.params.id) {
      this.id = this.activeRoute.snapshot.params.id
      this.getDatabaseView(this.id);
    }
    // if (localStorage.getItem('user_type'))
    // this.user_type = localStorage.getItem('user_type')

  }

  conversationComments() {
    this.router.navigate(['admin/ei-onboarding-conversation-comments', this.eiData.id])
  }

  eiRequestHistory() {
    this.router.navigate(['admin/ei-onboarding-request-history'])
  }

  getDatabaseView(id) {
    this.loader.show()
    let url = 'admin/ei-pending-profile/' + this.id
    this.baseService.getData(url).subscribe(
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
