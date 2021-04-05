import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  schoolId: any;
  schoolProfile: any;

  constructor(
    private router: Router,
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.schoolId = this.route.snapshot.queryParamMap.get('school_id')
    this.getProfile();
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
      this.baseService.getData('user/profile-detail-of-school/', { "school_id": this.schoolId }).subscribe(
        (res: any) => {
          if (res.status == true)
            this.schoolProfile = res.data[0];
          else {
            this.alert.error(res.error, 'Error')
          }
        }, (error) => {
          this.loader.hide();
          console.log(error)
        });
    } catch (err) {
      this.loader.hide();
      console.log(err);
    }
  }

}
