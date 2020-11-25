import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
declare var $: any;

@Component({
  selector: 'app-ei-student-management',
  templateUrl: './ei-student-management.component.html',
  styleUrls: ['./ei-student-management.component.css']
})

export class EiStudentManagementComponent implements OnInit {
  courseWiseStudentCount:any={};
  courseWiseStudentCountCourse:any=[];
  
  constructor(
    private router: Router, 
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
	  //this.courseWiseStudentCount.coursedata=[];
	  //this.courseWiseStudentCount.countdata=[];
	  this.getGetStudentDashboardReport();
  }
  getGetStudentDashboardReport(){
	    try{
      this.SpinnerService.show(); 
     
      this.eiService.getGetStudentDashboardReport().subscribe(res => {
        this.SpinnerService.hide(); 
        let response:any={};
        response=res;
            if(response.status === true){
              this.courseWiseStudentCount=response.countdata;
              this.courseWiseStudentCountCourse=response.coursedata;
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
  goToEiStudentVerifiedListPage(){
    this.router.navigate(['ei/student-verified-list']);
  }

  goToEiStudentPendingVerificationPage(){
    this.router.navigate(['ei/student-pending-verification']);
  }

  goToEiStudentRequestPendingForChangingDetailsPage(){
    this.router.navigate(['ei/student-list']);
  }

  goToEiStudentApprovalsPage(){
  this.router.navigate(['ei/student-approvals']);
  }

  goToEiStudentBulkAddPage(){
    $("#AddStudentModel").modal("hide");
    this.router.navigate(['ei/student-bulk-add']);
  }

  goToEiStudentChangeBulkClassPage(){
    $("#AddStudentModel").modal("hide");
    this.router.navigate(['ei/student-change-bulk-class']);
  }

  goToEiStudentSummaryPage(){
    this.router.navigate(['ei/student-summary']);
  }
}
