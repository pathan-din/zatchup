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
  currentUser: any;
  profession: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userId = this.route.snapshot.queryParamMap.get('id')
    this.currentUser = localStorage.getItem('userId')
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
          if (res.status == true) {
            this.userProfile = res.data[0];
            if (this.userProfile.work_detail.length > 0) {
              this.profession = this.userProfile.work_detail[this.userProfile.work_detail.length - 1].work_department;
            }

          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }

  getDocumentsChat(uuid) {
    localStorage.setItem('uuid', uuid);
    this.router.navigate(["user/chat"]);
  }

  getGender(data: any) {
    let custom: any
    if (data.custom_gender)
      custom = data.custom_gender.trim() ? 'pronoun' : ''
    if (data)
      return this.baseService.getGender(data, custom)
    return ''
  }
}
