import { Location } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('closeRetriggerModel') closeRetriggerModel: any;
  userId: any;
  userData: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) {
    // this.userData = new UserData()
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.getUserProfile();
  }



  goToUserEducationDetail() {
    this.router.navigate(['admin/user-education-details'], { queryParams: { 'user_id': this.userData.user_id } });
  }

  userProfileHistory() {
    this.router.navigate(['admin/user-profile-history'], { queryParams: { 'user_id': this.userData.user_id } });
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

  kycRetriggeredRequest() {
    this.loader.show();

    let data = {
      'user_id': this.userData.id,
      'comments': this.userData.comments,
      'reason': this.userData.reason
    }
    this.baseService.action(['admin/kyc/kyc_retrigger_update/'], data).subscribe(
      (res: any) => {
        if (res.status == true) {
          // this.userData = res.data
          this.closeRetriggerModel.nativeElement.click();
          this.alert.success(res.message, 'Success');
          // form.resetForm();
          this.goBack();
        }
        else {
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide();
      }
    ), (err: any) => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }


  goBack() {
    this.location.back()
  }

  getGender(data: any) {
    if (data)
      return this.baseService.getGender(data)
    return ''
  }
}
