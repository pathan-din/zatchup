import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 

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
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService) { }

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
    this.router.navigate(['ei/verified-alumni']);
  }

  goToEiUnverifiedAlumniPage(){
    this.router.navigate(['ei/unverified-alumni']);
  }

  redirectTotalStudentPage(){
    this.router.navigate(['ei/student-list']);
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
 
}
