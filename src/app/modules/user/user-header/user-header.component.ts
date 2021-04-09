import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  ids: Array<any> = [];
  searchConfig: any = {
    "api_endpoint": "user/search-list-for-school-student/",
    "displayImage": true,
    "route": "user/search",
    "viewZatchupId": true,
    "resultsLength": 5,
    "seeMoreResults": true,
    "viewSubMenu": true,
    "rightIcon": true,
    "viewCity": true

  }
  messageData: any = [];
  currentUser: any = "";
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private notifypush: FirebaseService,
    private firestore: AngularFirestore,
    private loader: NgxSpinnerService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.ids = new Array<any>();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.baseService.isLoggedIn();
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

    if (this.isLoggedIn) {
      this.notifypush.receiveMessage();
      this.notifypush.requestPermission();
      if (localStorage.getItem("fbtoken")) {
        this.currentUser = localStorage.getItem("fbtoken");
        //this.getUsersWithModeratorRole(localStorage.getItem("fbtoken"));
      }
    }
  }



  getRecepintUserDetails(uuid: any) {
    if (uuid) {
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
        console.log('recipants details is as ::', res.data())
      });
    }
    return ''
  }

  goToSetting() {
    this.router.navigate(["user/setting"]);
  }

  getDasboardDetails() {
    try {
      this.loader.show();
      this.baseService.getData("ei/auth-user-info").subscribe(res => {
        this.loader.hide();
        let response: any = {};
        response = res;
        if (response.status == true) {

          this.userProfile = response;
          localStorage.setItem('userId', this.userProfile.user_id)
        }
      }, (error) => {
        this.loader.hide();
        console.log(error);
      });
    } catch (err) {
      this.loader.hide();
      console.log(err);
    }
  }
  reminderList() {
    this.router.navigate(["user/remainders"]);
  }
  notificationList() {
    this.router.navigate(["user/notifications"]);
  }
  logout() {
    this.confirmDialogService.confirmThis('Are you sure you want to Logout?', () => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['user/login']);
    }, () => { }
    );
  }
  /**Find the step of the register process for all Users */
  getRegistrationStep() {
    try {
      this.loader.show()
      this.baseService.getData('user/reg-step-count/').subscribe((res: any) => {
        this.loader.hide()
        this.regProfile = res;
        localStorage.setItem("res.reg_step", res.reg_step);
        if (this.route.snapshot.routeConfig.path == "user/notifications") {
        } else {
          if (res.reg_step <= 7 && !res.is_approved && res.is_kyc_rejected) {
            if (res.ekyc_rejected_reason) {
              this.alert.info("Your Profile has been rejected reason by " + res.ekyc_rejected_reason + " Remark : " + res.ekyc_rejected_remark, "Rejected");
              if (res.is_deleted) {
                localStorage.clear();
                this.router.navigate(['user/login']);

              } else {
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
              if (res.is_deleted) {
                localStorage.clear();
                this.router.navigate(['user/login']);
              } else {
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
        this.alert.error("Data not Fetched", "Error");
        this.loader.hide();
      }))
    } catch (e) {
      this.alert.error("Something went wrong, Please contact administrator.", "Error");
      this.loader.hide();
    }
  }

  getSearchResult(data: any) {
    if (data.user_type == 'SCHOOL')
      this.router.navigate(['user/school-profile'], { queryParams: { "school_id": data.school_id } })
    else
      this.router.navigate(['user/profile'], { queryParams: { "id": data.id } })
  }
}
