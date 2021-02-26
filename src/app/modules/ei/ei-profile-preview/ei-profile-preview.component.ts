import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';

@Component({
  selector: 'app-ei-profile-preview',
  templateUrl: './ei-profile-preview.component.html',
  styleUrls: ['./ei-profile-preview.component.css']
})
export class EiProfilePreviewComponent implements OnInit {
  displayError: any = "";
  userProfile: any = [];
  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private eiService: EiServiceService) { }

  ngOnInit(): void {
    this.getEiProfileData();
  }
  redirectToOnboardingSecondSepEdit() {
    this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '2', "redirect_url": "ei-profile-preview" } });
  }
  redirectToOnboardingFirstSepEdit() {
    this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '1', "redirect_url": "ei-profile-preview" } });
  }
  redirectToOnboardingThirdSepEdit() {
    this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '3', "redirect_url": "ei-profile-preview", "action": "edit" } });
  }
  redirectToOnboardingFourthSepEdit() {
    this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '4', "redirect_url": "ei-profile-preview" } });
  }
  getEiProfileData() {
    try {
      this.loader.show();
      this.baseService.getData('ei/onboarding-preview/').subscribe(res => {
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.userProfile = response.data[0];
          this.loader.hide();
        } else {
          this.loader.hide();
          this.displayError = this.eiService.getErrorResponse(this.loader, response.error);
          this.alert.error(this.displayError, "Error");
        }
      }, (error) => {
        this.loader.hide();
        this.alert.error("Something went wrong.", "Error");
      })
    } catch (e) {

    }
  }
  redirectToLoginPage() {
    try {
      this.loader.show()
      this.baseService.action("ei/send-for-approval-for-admin/", {}).subscribe((res: any) => {
        if (res.status == true) {
          this.loader.hide();
          this.router.navigate(['ei/dashboard']);
        } else {
          this.loader.hide();
        }

      }, (error) => {
        this.loader.hide();
      })
    } catch (e) {
      this.loader.hide();
    }

  }
  getDuration(classdata) {
    console.log(classdata);

  }

  fileType(file: any) {
    return file.split('.').pop();
  }

  download_file(fileURL) {
    window.open(fileURL, '_blank');
  }
}
