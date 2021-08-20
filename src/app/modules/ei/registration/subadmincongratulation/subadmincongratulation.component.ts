import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-subadmincongratulation',
  templateUrl: './subadmincongratulation.component.html',
  styleUrls: ['./subadmincongratulation.component.css']
})
export class SubadmincongratulationComponent implements OnInit {
  regStep: any;
  kycApproved: any;
  schoolApproved: any;

  constructor(public router:Router,
    private baseService : BaseService
    ) { }

  ngOnInit(): void {
    this.getRegStep()
  }
  goToUserLandingPage(){
    // if(this.regStep >= 4 && this.kycApproved == true ){
    //   this.router.navigate(['ei/my-profile'])
    // }
    // else {
     
    // }
    localStorage.clear();
    this.router.navigate(['ei/login-subadmin']);
	
  }

  getRegStep(){
    this.baseService.getData('user/reg-step-count/').subscribe(
      (res: any) => {
        if(res.status == true){
          this.regStep = res.reg_step
          this.kycApproved = res.is_kyc_approved
          this.schoolApproved = res.is_approved
          console.log(this.regStep);
          
        }
      }
    )
  }
}
