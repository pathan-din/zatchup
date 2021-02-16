import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-user-education-profile',
  templateUrl: './admin-user-education-profile.component.html',
  styleUrls: ['./admin-user-education-profile.component.css']
})
export class AdminUserEducationProfileComponent implements OnInit {
  userData: any;
  educationDetails: any = [];
  userId: any;

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
    this.getUserEducationProfileDetails()
  }

  getUserEducationProfileDetails(){
    this.loader.show();

    this.baseService.getData('admin/user/user_profile/', {'id': this.userId}).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.userData = res.data[0]
          this.educationDetails = res.data[0].educationdetail
          console.log('education details ::',this.educationDetails)
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
}
