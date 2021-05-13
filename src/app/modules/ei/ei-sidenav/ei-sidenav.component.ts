import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from '../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';

@Component({
  selector: 'app-ei-sidenav',
  templateUrl: './ei-sidenav.component.html',
  styleUrls: ['./ei-sidenav.component.css']
})
export class EiSidenavComponent implements OnDestroy {
  permission: any;
  notificationCount: any;
  subscriptionActive: boolean = true;
  isApproved: boolean = false;
  params: any;
  userRoleDetails: any = {};
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  small = false;
  userProfile: any = {};
  isLogin: any;
  subscription: Subscription
  searchConfig: any = {
    "api_endpoint": "user/search-list-for-school-student/",
    "displayImage": true,
    "route": "ei/ei-search",
    "viewZatchupId": true,
    "resultsLength": 5,
    "seeMoreResults": true,
    "viewSubMenu": true,
    "rightIcon": true,
    "viewCity": true

  }
  searchItem: any = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    private baseService: BaseService,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private confirmDialogService: ConfirmDialogService,
    private communicationService: CommunicationService
  ) {

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.small = true;
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        } else {
          this.small = false;
        }
      });

      this.subscription = this.communicationService.getImageUrl().subscribe(res => {
        if (res) {
          this.userProfile.profile_pic = res.url;
        } 
      });

  }

  ngOnInit(): void {
    this.isLogin = this.baseService.isLoggedIn()
    if (localStorage.getItem("token")) {
      this.getDasboardDetails();
    }
    if (sessionStorage.getItem("permission")) {
      this.permission = JSON.parse(sessionStorage.getItem("permission"));
    }
    this.getRegistrationStep();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getDasboardDetails() {
    try {
      this.loader.show();
      this.baseService.getData('ei/auth-user-info/').subscribe(res => {
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.userProfile = response;
          localStorage.setItem("userprofile", JSON.stringify(response));
        } else { }
        this.loader.hide();
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }

  async logout() {
    this.loader.hide();
    await this.confirmDialogService.confirmThis('Are you sure you want to Logout?', () =>{
     
      this.firebaseService.setPresence('offline')
      if(localStorage.getItem('getreject')){
        var getUserDetails=JSON.parse(localStorage.getItem('getreject'));
        if(getUserDetails.role == 'EISUBADMIN') {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['ei/login-subadmin'])
        }
        else {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['ei/login']);
        }
      }
     
    },() =>{}
    );
  }

  isValidModule(module_code) {
    let moduleList: any = {};
    if (this.permission !== undefined && this.permission !== null && this.permission !== '') {
      moduleList = this.permission;
      var data = moduleList.find(el => {
        return el.module_code == module_code
      })
      if (data) {
        return data.is_access;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  getNotificationList() {
    this.router.navigate(["ei/notification"]);
  }

  getRegistrationStep() {
    try {
      var arrMenuList = ['poc-details', 'manage-courses', 'notification', 'manage-courses-add', 'personal-information', 'add-more-document', 'information-and-bank-details', 'invoice-list/:invoice', 'invoices', 'manage-courses-details/:id', 'manage-courses-details', 'school-profile', 'add-subscription', 'onboarding', 'subscription', 'change-password'];
      let thisUrl: any = '';
      let parameter: any = {};

      if (Object.keys(this.route.snapshot.queryParams).length !== 0) {
        parameter = this.route.snapshot.queryParams;
        console.log(parameter);
        
      } else {
        parameter = this.route.snapshot.params;
      }
      this.route.snapshot.url.map(url => { thisUrl = url.path; })
      thisUrl = this.route.routeConfig.path ? this.route.routeConfig.path : thisUrl;
      this.baseService.getData('user/reg-step-count/').subscribe((response: any) => {
        this.userRoleDetails = response;
        localStorage.setItem("getreject", JSON.stringify(response))
        this.notificationCount = response.unread_notification_count;
        if (response.status) {
          localStorage.setItem("is_subscription_active", response.is_subscription_active);
          if (!response.is_approved){
            localStorage.setItem("is_ei_approved", "0");
            this.subscriptionActive = response.is_subscription_active;
          }
           
          else{
            localStorage.setItem("is_ei_approved", "1");
            this.subscriptionActive = response.is_subscription_active;
          }
            
          this.isApproved = !response.is_approved ? false : true;
          if (response.role == 'EIREPRESENTATIVE') {
            if (!response.rejected_reason && !response.is_approved) {
              if (response.reg_step == 1) {
                this.router.navigate(['ei/payment']);
              } else if (response.reg_step == 2) {
                this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '1' } });
              } else if (response.reg_step == 3) {
                this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '2' } });
              } else if (response.reg_step == 4) {
                this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '3' } });
              } else if (response.reg_step == 5) {
                this.router.navigate(['ei/onboarding-process'], { queryParams: { reg_steps: '4' } });
              } else if (response.reg_step == 6) {
                this.router.navigate(['ei/ei-profile-preview']);
              } else if (!response.rejected_reason && !response.is_approved && !this.subscriptionActive) {
                var nUrl = arrMenuList.includes(thisUrl);
                if (nUrl) {
                  if (this.route.snapshot.params.invoice == 'onboarding') {
                    this.router.navigate(['ei/invoice-list/' + this.route.snapshot.params.invoice]);
                  }
                  else {
                    if (typeof (parameter) == 'object') {
                      var arrUrl = thisUrl.split(":");
                      if (Object.keys(parameter).length === 1) {

                        this.router.navigate(['ei/' + arrUrl[0] + '/' + parameter[Object.keys(parameter)[0]]]);

                      } else {
                        this.router.navigate(['ei/' + thisUrl], { queryParams: parameter });
                      }


                    }
                    else {
                      this.router.navigate(['ei/' + thisUrl]);
                    }
                  }

                } else {
                  this.router.navigate(['ei/information-and-bank-details']);
                }

              }
            } else if (!response.rejected_reason && response.is_approved && !this.subscriptionActive) {

              var nUrl = arrMenuList.includes(thisUrl);
              if (nUrl) {
                if (this.route.snapshot.params.invoice == 'onboarding') {
                  this.router.navigate(['ei/invoice-list/' + this.route.snapshot.params.invoice]);
                } else
                if (typeof (parameter) == 'object') {
                  var arrUrl = thisUrl.split(":");
                  if (Object.keys(parameter).length === 1) {

                    this.router.navigate(['ei/' + arrUrl[0] + '/' + parameter[Object.keys(parameter)[0]]]);

                  } else {
                    this.router.navigate(['ei/' + thisUrl], { queryParams: parameter });
                  }
                }
                else {
                  this.router.navigate(['ei/' + thisUrl]);
                }
              }
            } else if (response.rejected_reason && !response.is_approved && !this.subscriptionActive) {
              localStorage.clear();
              this.alert.info(response.rejected_reason, "Information");
              this.router.navigate(['ei/login']);
            }else{

            }
          } else if (response.role == 'EISUBADMIN') {
            if (!response.is_kyc_rejected && !response.rejected_reason && !response.is_approved) {
            } else if (response.reg_step <= 4 && !response.is_approved && response.is_kyc_rejected) {
              if (response.ekyc_rejected_reason) {
                this.alert.info("Your Profile has been rejected reason by " + response.ekyc_rejected_reason + " Remark : " + response.ekyc_rejected_remark, "Rejected");
                this.router.navigate(['ei/kyc-verification']);
              } else {
                if (response.reg_step == 4) {
                }
              }
            }
            else if (response.rejected_reason && response.is_approved) {
              localStorage.clear();
              this.alert.info(response.rejected_reason, "Information");
              this.router.navigate(['ei/login-subadmin']);
            }
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
    this.router.navigate(['ei/student-profile'], { queryParams: { 'stId': data.id } });
     
  }

  setValue(data: any){
    this.searchItem = data.display
  }
}
