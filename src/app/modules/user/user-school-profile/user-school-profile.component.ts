import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-user-school-profile',
  templateUrl: './user-school-profile.component.html',
  styleUrls: ['./user-school-profile.component.css']
})
export class UserSchoolProfileComponent implements OnInit {
  postOption: string = "matrix";
  postOptionActiveImage: string = 'dead';
  postOptionActiveMatrix: string = 'active';

  constructor(
    private router: Router,
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
  }
  postTabFunction(event) {
    this.postOption = event;
    if (event === 'matrix') {
      this.postOptionActiveMatrix = 'active';
      this.postOptionActiveImage = 'dead';
    }
    if (event === 'image') {
      this.postOptionActiveMatrix = 'dead';
      this.postOptionActiveImage = 'active';
    }
  }

  goBack() {
    this.location.back()
  }

  getProfile() {
    try {
      this.loader.show();
      this.baseService.getData('user/profile-detail-of-users/').subscribe(res => {
        let response: any = {};
        response = res;
        this.loader.hide();
        // this.userProfile = response;
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
