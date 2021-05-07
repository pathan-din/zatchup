import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  userId: any;
  userProfile: any;
  currentUser: any;
  profession: any;
  uploadInfo: any = {};
  coverPic: any;
  profilePic: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userId = this.route.snapshot.queryParamMap.get('id')
    this.currentUser = localStorage.getItem('userId');
    this.uploadInfo = {
      "image_type": "socialmedia_profilepic",
      "url": "user/socia_media_image_uplode/",
      "icon": "fa fa-camera",
      "params": { "user": this.userId, "socialmedia_coverpic": null },
      "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
    }
    this.getProfile();
    this.getSocialMediaProfiles();
  }

  goToLoginPage() {
    this.router.navigate(['user/login']);
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
    // this.getProfile();
    this.getSocialMediaProfiles();
  }

  getCoverPicUrl(file: any) {
    this.userProfile.cover_pic = file.data[0].cover_pic_url;
  }

  getSocialMediaProfiles() {
    try {
      this.loader.show();
      this.baseService.getData('user/socia_media_profile_and_cover_pic/', { "user_id": this.userId }).subscribe(
        (res: any) => {
          if (res.cover_pic)
            this.coverPic = res.cover_pic.socialmedia_coverpic
          if (res.profile_pic)
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

  uploadCoverPic(file) {
    try {
      this.loader.show();
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
        this.loader.hide();
        this.alert.error("File format not supported", 'Error');
        return
      }
      const formData = new FormData();
      formData.append('socialmedia_coverpic', fileData);
      formData.append('socialmedia_profilepic', null);
      formData.append('user', this.userId)
      this.baseService.action('user/socia_media_image_uplode/', formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.alert.success(res.message[0], 'Success')
            // this.getProfile()
            this.getSocialMediaProfiles();
          } else {
            this.loader.hide();
            console.log("Error:Data not update");
          }

        }, (error) => {
          this.loader.hide();
          console.log(error);

        });
    } catch (err) {
      this.loader.hide();
      console.log("vaeryfy Otp Exception", err);
    }
  }
}
