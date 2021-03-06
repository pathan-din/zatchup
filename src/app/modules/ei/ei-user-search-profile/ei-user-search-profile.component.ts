import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';
import { Location } from '@angular/common'



@Component({
  selector: 'app-ei-user-search-profile',
  templateUrl: './ei-user-search-profile.component.html',
  styleUrls: ['./ei-user-search-profile.component.css']
})
export class EiUserSearchProfileComponent implements OnInit {
  userId: any;
  userProfile: any;
  currentUser: any;
  profession: any;
  coverPic: any;
  profilePic: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userId = this.route.snapshot.queryParamMap.get('id')
    this.currentUser = localStorage.getItem('userId')
    this.getProfile();
    this.getSocialMediaProfiles();
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

  getProfilePicUrl(file: any) {
    this.userProfile.profile_pic = file.data[0].profile_pic_url;
    this.communicationService.setImageUrl(this.userProfile.profile_pic)
  }

  getCoverPicUrl(file: any) {
    this.userProfile.cover_pic = file.data[0].cover_pic_url;
  }

  getSocialMediaProfiles() {
    try {
      this.loader.show();
      this.baseService.getData('user/socia_media_profile_and_cover_pic/', { "user_id": this.userId }).subscribe(
        (res: any) => {
          if (res.cover_pic.socialmedia_coverpic)
            this.coverPic = res.cover_pic.socialmedia_coverpic
          if (res.profile_pic.socialmedia_profilepic)
            this.profilePic = res.profile_pic.socialmedia_profilepic
          this.loader.hide()
        },
        err => {
          this.loader.hide()
        }
      )
    } catch (error) {
      this.loader.hide()
    }
  }

}
