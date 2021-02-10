import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-dashboard',
  templateUrl: './ei-dashboard.component.html',
  styleUrls: ['./ei-dashboard.component.css']
})
export class EiDashboardComponent implements OnInit {
  model:any={}
  dashboardCount:any={};
  userProfile:any={};
  fromDateValue: Date;
  toDateValue: Date;
  dashboardPremission:boolean =false;
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService,
    private alert: NotificationService) { }

  ngOnInit(): void {
	  this.getDasboardDetails();
    this.fromDateValue = new Date();
    this.toDateValue = new Date();

    
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  getDate(event){
    console.log(event,this.model)
  }
  goToEiAlumniListPage(){
    this.router.navigate(['ei/alumni-list']);
  }

  goToEiVerifiedAlumniPage(){
    this.router.navigate(['ei/alumni-list'],{queryParams:{'approved':1}});
  }

  goToEiUnverifiedAlumniPage(){
    this.router.navigate(['ei/alumni-list'],{queryParams:{'approved':0}});
  }

  redirectTotalStudentPage(){
    this.router.navigate(['ei/student-verified-list'],{queryParams:{'approved':1,'kyc_approved':1,'title':'Verified'}});
  }

  /*
  Function Name : getDasboardDetails
  
  */
  getDasboardDetails(){
	    try{
      this.SpinnerService.show(); 
     
      this.eiService.getEiDashboardDetails().subscribe(res => {
        
        let response:any={};
        response=res;
       
        if(response.status==true)
        {
          this.SpinnerService.hide(); 
		      this.dashboardCount=response;
        }else{
          this.SpinnerService.hide(); 
          this.alert.error(response.error.message[0], 'Error')
		    
        }
        
       
        },(error) => {
          this.SpinnerService.hide(); 
          
          if(error.error.detail)
          {
            this.alert.error(error.error.detail, 'Error');
            this.dashboardPremission=true;
            return;
          }
          this.alert.error(error, 'Error')
        });
    }catch(err){
      this.SpinnerService.hide(); 
      
      this.alert.error(err, 'Error')
    }	
  }
 
}
