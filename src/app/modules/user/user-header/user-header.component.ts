import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseService } from '../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  isCheck: any;
  userProfile: any = {};
  regProfile: any = {};
  authCheck: boolean = false;
  searchConfig: any = {
    "api_endpoint": "user/search-list-for-school-student/"
  }
  constructor(
    private router: Router,
    private baseService: BaseService,
    private alert: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.authCheck = true;
      this.getRegistrationStep();
      this.getDasboardDetails()
    } else {
      localStorage.removeItem('approved')
      this.authCheck = false;
    }
    this.isCheck = '0';
    if (localStorage.getItem('approved')) {
      this.isCheck = localStorage.getItem('approved');

    }


  }
  goToSetting() {
    this.router.navigate(["user/setting"]);
  }
  
  getDasboardDetails() {
    try {
      this.baseService.getData("ei/auth-user-info").subscribe(res => {

        let response: any = {};
        response = res;
        if (response.status == true) {

          this.userProfile = response;
        }


      }, (error) => {

        console.log(error);
      });
    } catch (err) {

      console.log(err);
    }
  }
  notificationList() {
    this.router.navigate(["user/notifications"]);
  }
  logout() {

    localStorage.clear();
    this.router.navigate(['user/login']);
  }
  /**Find the step of the register process for all Users */
  getRegistrationStep() {
    try {
      this.baseService.getData('user/reg-step-count/').subscribe((res: any) => {
        this.regProfile = res;
        localStorage.setItem("res.reg_step",res.reg_step);
        if (this.route.snapshot.routeConfig.path == "user/notifications") {
        } else {
          if (res.reg_step <= 7 && !res.is_approved && res.is_kyc_rejected) {
            if (res.ekyc_rejected_reason) {
              this.alert.info("Your Profile has been rejected reason by " + res.ekyc_rejected_reason + " Remark : " + res.ekyc_rejected_remark, "Rejected");
              if(res.is_deleted){
                localStorage.clear();
                this.router.navigate(['user/login']);

              }else{
                this.router.navigate(['user/kyc-verification']);
              }
            } else {
              if (res.reg_step == 6) {
                this.router.navigate(['user/my-educational-profile']);

              }
            }
          } else if (res.reg_step <= 7 && res.is_approved && res.is_kyc_rejected) {
            if (res.ekyc_rejected_reason) {
              this.alert.info("Your Profile has been rejected reason by " + res.ekyc_rejected_reason + " Remark : " + res.ekyc_rejected_remark, "Rejected");
              if(res.is_deleted){
                localStorage.clear();
                this.router.navigate(['user/login']);
              }else{
                this.router.navigate(['user/kyc-verification']);
              }
            } else {
              if (res.reg_step == 7) {
                this.router.navigate(['user/my-school']);

              }
            }
          } else {
            
          }
        }
      }, (error => {
        this.alert.warning("Data not Fetched", "Warning");
      }))
    } catch (e) {
      this.alert.error("Something went wrong, Please contact administrator.", "Error");
    }
  }

  getSearchResult(data: any) {
    if (data.user_type == 'SCHOOL')
      this.router.navigate(['user/school-profile'], { queryParams: { "school_id": data.school_id } })
    else
      this.router.navigate(['user/profile'], { queryParams: { "id": data.id } })
  }
}
