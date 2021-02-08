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
isCheck:any;
userProfile:any={};
  constructor(private router: Router,
    private baseService : BaseService,
    private alert:NotificationService) { }
     authCheck : boolean=false;

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.authCheck=true;
      this.getRegistrationStep();
      this.getDasboardDetails() 
    }else{
      localStorage.removeItem('approved')
      this.authCheck=false;
    }
    this.isCheck='0';
    if(localStorage.getItem('approved')){
      this.isCheck = localStorage.getItem('approved');

    }

    
  }
  goToSetting(){
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
  logout(){
    
	  localStorage.clear();
	  this.router.navigate(['user/login']);
  }
  /**Find the step of the register process for all Users */
  getRegistrationStep(){
    // try {
    //   this.baseService.getData('user/reg-step-count/').subscribe(res=>{
    //       let response:any={};
    //       response = res;
    //       localStorage.setItem("userRejectData",JSON.stringify(response))
    //       if(response.reg_step==6 && !response.is_approved && response.is_kyc_rejected){
    //         if( response.rejected_reason){
    //           this.alert.error("Your Profile has been rejected reason by " + response.rejected_reason+" Remark : "+response.rejected_remark,"Rejected"); 
    //         }
    //         if( response.ekyc_rejected_reason){
    //           this.alert.error("Your Profile has been rejected reason by " + response.ekyc_rejected_reason+" Remark : "+response.ekyc_rejected_remark,"Rejected");
    //         }
    //         if(response.role=='STUDENTS' && response.reg_step>3 && response.reg_step<6 && response.is_kyc_rejected){
    //           this.router.navigate(['user/add-ei']);
              
    //         }else if(response.role=='ALUMNI' && response.reg_step>3  && response.reg_step<6 && response.is_kyc_rejected){
    //           this.router.navigate(['user/add-past-ei']);
    //         }else if(response.is_kyc_rejected){
    //           localStorage.setItem("isrejected",response.is_kyc_rejected);
    //           this.router.navigate(["user/kyc-verification"]);
    //         }
            
    //       }else if(response.reg_step<6 && !response.is_approved && response.is_kyc_rejected){
    //         localStorage.setItem("isrejected",response.is_kyc_rejected);
    //         if( response.rejected_reason){
    //           this.alert.error("Your Profile has been rejected reason by " + response.rejected_reason+" Remark : "+response.rejected_remark,"Rejected"); 
    //         }
    //         if( response.ekyc_rejected_reason){
    //           this.alert.error("Your Profile has been rejected reason by " + response.ekyc_rejected_reason+" Remark : "+response.ekyc_rejected_remark,"Rejected");
    //         }
    //         this.router.navigate(["user/kyc-verification"]);
    //       }
    //       else if(response.reg_step==6 && !response.is_approved && !response.is_kyc_rejected){
    //         this.router.navigate(["user/my-educational-profile"]);
    //       }
    //   },(error=>{
    //       this.alert.warning("Data not Fetched","Warning");
    //   }))
    // } catch (e) {
    //   this.alert.error("Something went wrong, Please contact administrator.","Error");
    // }
  }
}
