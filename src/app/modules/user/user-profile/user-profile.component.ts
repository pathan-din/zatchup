import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: any;
  userProfile: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {

    this.userId = this.route.snapshot.queryParamMap.get('id')
    this.getProfile();
  }

  goBack() {
    this.location.back()
  }

  getProfile() {
    try {
      this.loader.show();
      this.baseService.getData('user/profile-detail-of-users/', { "user_id": this.userId }).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true)
            this.userProfile = res.data[0];
        }, (error) => {
          this.loader.hide();
          console.log(error);
        });
    } catch (err) {
      this.loader.hide();
      console.log(err);
    }
  }
}
