import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from '../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-sidenav',
  templateUrl: './ei-sidenav.component.html',
  styleUrls: ['./ei-sidenav.component.css']
})
export class EiSidenavComponent {
  permission: any;
  notificationCount: any;
  subscriptionActive: boolean = true;
  isApproved: boolean = false;
  params:any;
  userRoleDetails:any={};
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  small = false;
  userProfile: any = {};

  isLogin: any 

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private baseService: BaseService,
    private alert: NotificationService,
    private route: ActivatedRoute) {

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
  getDasboardDetails() {
    try {
      this.SpinnerService.show();

      this.eiService.getEiProfileData().subscribe(res => {

        let response: any = {};
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.userProfile = response;
          localStorage.setItem("userprofile",JSON.stringify(response));
        } else {
          this.SpinnerService.hide();

        }



      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  logout() {
    this.SpinnerService.hide();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['ei/login']);
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
  /**Find the step of the register process for all Users */
  getRegistrationStep() {
    try {
      var arrMenuList = ['poc-details','manage-courses','notification','manage-courses-add','personal-information','add-more-document', 'information-and-bank-details','invoice-list/:invoice', 'invoices','manage-courses-details/:id','manage-courses-details', 'school-profile', 'add-subscription','onboarding','subscription'];
      let thisUrl: any = '';
      let parameter : any ={};
      
      if (Object.keys(this.route.snapshot.queryParams).length !== 0) { 
        parameter = this.route.snapshot.queryParams;
      }else{
        parameter = this.route.snapshot.params;
      }
      
      
     
      this.route.snapshot.url.map(url => {thisUrl = url.path; })
      thisUrl=this.route.routeConfig.path?this.route.routeConfig.path: thisUrl;

      this.baseService.getData('user/reg-step-count/').subscribe((response:any) => {
        
        
        this.userRoleDetails = response;
        localStorage.setItem("getreject", JSON.stringify(response))
        this.notificationCount = response.unread_notification_count;
        if (response.status) {
          localStorage.setItem("is_subscription_active",response.is_subscription_active);
          if(!response.is_approved)
          localStorage.setItem("is_ei_approved","0");
          else
          localStorage.setItem("is_ei_approved","1");
          
          this.subscriptionActive = response.is_subscription_active;
          this.isApproved = !response.is_approved ? false : true;
          if(response.role == 'EIREPRESENTATIVE' ){
            if ( !response.rejected_reason && !response.is_approved) {

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
                  if(this.route.snapshot.params.invoice=='onboarding'){
                   
                    console.log('dfdfdf'+this.route.snapshot.params.invoice,parameter);
                    this.router.navigate(['ei/invoice-list/' +this.route.snapshot.params.invoice]);
                  }
                  else{
                    console.log(this.route.snapshot.params.invoice,parameter);
                    if(typeof(parameter)=='object'){
                      console.log(Object.keys(parameter).length);
                      var arrUrl = thisUrl.split(":");
                      if (Object.keys(parameter).length === 1) { 
                        
                        this.router.navigate(['ei/' + arrUrl[0]+'/'+parameter[Object.keys(parameter)[0]]]);
                        
                      }else{
                        this.router.navigate(['ei/' + thisUrl],{queryParams:parameter});
                      }
                      
                      
                    }
                    else{
                      console.log(this.route.snapshot.params.invoice,parameter);
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
              if(this.route.snapshot.params.invoice=='onboarding'){
                   
                
                this.router.navigate(['ei/invoice-list/' +this.route.snapshot.params.invoice]);
              }else
                this.router.navigate(['ei/' + thisUrl]);
              }
  
            }else if (response.rejected_reason && !response.is_approved && !this.subscriptionActive) {
              localStorage.clear();
              this.alert.info(response.rejected_reason,"Information");
              this.router.navigate(['ei/login']);
            }
          } else if(response.role == 'EISUBADMIN' ){
            if (!response.is_kyc_rejected && !response.rejected_reason && !response.is_approved) {

              // if (response.reg_step == 1) {
              //   this.router.navigate(['ei/kyc-verification']);
              // } else if (response.reg_step == 2) {
              //   this.router.navigate(['ei/add-ei']);
              // } else if (response.reg_step == 3) {
              //   this.router.navigate(['ei/subadminprofile'], { queryParams: { reg_steps: '2' } });
              // } else if (response.reg_step == 4) {
               
              // }else{} 
               
  
              }else if (response.reg_step <= 4 && !response.is_approved && response.is_kyc_rejected) {
                if (response.ekyc_rejected_reason) {
                  this.alert.info("Your Profile has been rejected reason by " + response.ekyc_rejected_reason + " Remark : " + response.ekyc_rejected_remark, "Rejected");
                  this.router.navigate(['ei/kyc-verification']);
                } else {
                  if (response.reg_step == 4) {
                    //this.router.navigate(['user/my-educational-profile']);
    
                  }
                }
              } 
              else if ( response.rejected_reason && response.is_approved) {
  
                localStorage.clear();
                this.alert.info(response.rejected_reason,"Information");
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
}
