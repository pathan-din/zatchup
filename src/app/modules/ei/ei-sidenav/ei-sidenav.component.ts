import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router} from '@angular/router';
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
permission:any;
notificationCount:any;
subscriptionActive:boolean= true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    small = false;
    userProfile:any={};
  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private baseService : BaseService,
    private alert:NotificationService) {

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
    
    if(localStorage.getItem("token")){
      this.getDasboardDetails();
    }
    if(sessionStorage.getItem("permission")){
      this.permission = JSON.parse(sessionStorage.getItem("permission"));
    }
    this.getRegistrationStep();
  }
  getDasboardDetails(){
	  try{
      this.SpinnerService.show(); 
     
      this.eiService.getEiProfileData().subscribe(res => {
        
        let response:any={};
        response=res;
        if(response.status==true)
        {
          this.SpinnerService.hide(); 
		      this.userProfile=response;
        }else{
          this.SpinnerService.hide(); 
		    
        }
        
        
       
        },(error) => {
          this.SpinnerService.hide(); 
          console.log(error);
        });
    }catch(err){
      this.SpinnerService.hide(); 
      console.log(err);
    }	
  }
  logout(){
    this.SpinnerService.hide(); 
    localStorage.clear();
    sessionStorage.clear();
	  this.router.navigate(['ei/login']);
  }

  isValidModule(module_code){
    let moduleList:any={};
    if(this.permission!==undefined && this.permission!==null && this.permission!==''){
        moduleList = this.permission;
        var data = moduleList.find(el => {
          return el.module_code ==   module_code
        })
         
        
        if(data)
        {
          return data.is_access;
        }else{
          return false;
        }
        
    }else{
      return true;
    }
    
    
  }
  getNotificationList(){
    this.router.navigate(["ei/notification"]);
  }
   /**Find the step of the register process for all Users */
   getRegistrationStep(){
    try {
      this.baseService.getData('user/reg-step-count/').subscribe(res=>{
        let response:any={};
        response = res;
        console.log(response);
        localStorage.setItem("getreject",JSON.stringify(response))
        this.notificationCount = response.unread_notification_count;
        if(response.status){
          this. subscriptionActive=response.is_subscription_active;
          if(response.role=='EIREPRESENTATIVE' && !response.rejected_reason && !response.is_approved)
          {
           
            if(response.reg_step==1){
              this.router.navigate(['ei/payment']);
            }else if(response.reg_step==2){
              this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '1' } });
            }else if(response.reg_step==3){
              this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '2' } });
            }else if(response.reg_step==4){
              this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '3' } });
            }else if(response.reg_step==5){
              this.router.navigate(['ei/onboarding-process'],{ queryParams: { reg_steps: '4' } });
            }else if(response.reg_step==6){
              this.router.navigate(['ei/ei-profile-preview']);
            }

            
           // this.router.navigate(["ei/school-reminder"]);
          }else{

          }
    
          
        }
      },(error=>{
          this.alert.warning("Data not Fetched","Warning");
      }))
    } catch (e) {
      this.alert.error("Something went wrong, Please contact administrator.","Error");
    }
  }
}
