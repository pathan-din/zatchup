import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../../services/notification/notification.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';
@Component({
  selector: 'app-ei-school-profile',
  templateUrl: './ei-school-profile.component.html',
  styleUrls: ['./ei-school-profile.component.css']
})
export class EiSchoolProfileComponent implements OnInit {

  postOption: string = "matrix";
  postOptionActiveImage: string = 'dead';
  postOptionActiveMatrix: string = 'active';
  profile_pic: any = '';
  uploadCoverInfo: any = {
    "image_type": "cover_pic",
    "url": "ei/cover-profile-update/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload back-cover-photo border-0 bg-light-black text-white p-2"
  }
  uploadInfo: any = {
    "image_type": "profile_pic",
    "url": "ei/cover-profile-update/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }
  
 
  userProfile: any = {};
  cover_pic: any = '';

  constructor(
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    public alert: NotificationService,
    private firebase: FirebaseService,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
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
  goToEiVerifiedAlumniPage() {
    this.router.navigate(['ei/alumni-list'], { queryParams: { approved: 1 } });
  }
  goToEiVerifiedStudentPage() {
    this.router.navigate(['ei/student-verified-list'], { queryParams: { approved: 1 } });
  }
  goToEISchoolPostPage() {
    this.router.navigate(['ei/school-post']);

  }

  getProfile() {
    try {
      this.SpinnerService.show();
      this.eiService.getEiProfileDetails().subscribe(res => {
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        this.userProfile = response;
        //console.log(this.userProfile );

        this.firebase.updatePhotoOnChatUser(this.userProfile);
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }

  uploadProfilePic(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
      this.SpinnerService.hide();
      this.alert.error("File format not supported", 'Error');
      return
    }
    try {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append('profile_pic', fileData);
      this.eiService.updateCoverPic(formData).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.userProfile.profile_pic = response.data[0].profile_pic_url;

        } else {
          this.SpinnerService.hide();
          console.log("Error:Data not update");
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
    }
  }

  uploadCoverPic(file) {

    console.log(file);

    try {
      this.SpinnerService.show();
      let fileList: FileList = file;


      let fileData: File = fileList[0];
      if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
        this.SpinnerService.hide();
        this.alert.error("File format not supported", 'Error');
        return
      }
      const formData = new FormData();
      formData.append('cover_pic', fileData);
      this.eiService.updateCoverPic(formData).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.userProfile.cover_pic = response.data[0].cover_pic_url;
        } else {
          this.SpinnerService.hide();
          console.log("Error:Data not update");
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
    }


  }

  getProfilePicUrl(file: any) {
    this.userProfile.profile_pic = file.data[0].profile_pic_url;
    this.communicationService.setImageUrl(this.userProfile.profile_pic)
  }

  getCoverPicUrl(file: any) {
    this.userProfile.cover_pic = file.data[0].cover_pic_url;
  }
}
