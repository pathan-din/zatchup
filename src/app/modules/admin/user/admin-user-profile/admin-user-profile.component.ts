import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {
  userId: any;
  userData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.getUserProfile();
  }



  goToUserEducationDetail() {
    this.router.navigate(['admin/user-education-details'], { queryParams: { 'user_id': this.userData.user_id}});
  }

  userProfileHistory(){
    this.router.navigate(['admin/user-profile-history'], { queryParams: { 'user_id': this.userData.user_id}});
  }

  getUserProfile() {
    this.loader.show();

    this.baseService.getData('admin/user/get_user_profile/' + this.userId).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.userData = res.data
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
