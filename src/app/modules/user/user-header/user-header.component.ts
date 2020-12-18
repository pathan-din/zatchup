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

  constructor(private router: Router,
    private baseService : BaseService,
    private alert:NotificationService) { }
  authCheck : boolean=false;
  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.authCheck=true;
    }else{
      this.authCheck=false;
    }
    if(localStorage.getItem('token')){
      this.getRegistrationStep();
    }
    
  }
  logout(){
	  localStorage.clear();
	  this.router.navigate(['user/login']);
  }
  /**Find the step of the register process for all Users */
  getRegistrationStep(){
    try {
      this.baseService.getData('user/reg-step-count/').subscribe(res=>{

      },(error=>{
          this.alert.warning("Data not Fetched","Warning");
      }))
    } catch (e) {
      this.alert.error("Something went wrong, Please contact administrator.","Error");
    }
  }
}
