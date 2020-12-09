import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
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
    public formBuilder: FormBuilder,
    private alert: NotificationService) { }

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
              this.alert.error(response.error.message[0], 'Error')
            }
	    	},(error) => {
          this.alert.error(error, 'Error')
          this.SpinnerService.hide(); 
          console.log(error);
        });
    }catch(err){
      this.alert.error(err, 'Error')
      this.SpinnerService.hide(); 
      console.log(err);
    }
  }
  goToEiStudentVerifiedListPage(){
    this.router.navigate(['ei/student-verified-list'],{queryParams:{'approved':1,'kyc_approved':1,'title':'Verified'}});
  }

  goToEiStudentPendingVerificationPage(){
    this.router.navigate(['ei/student-verified-list'],{queryParams:{'approved':0,'kyc_approved':0,'title':'Unverified'}});
  }

  goToEiStudentRequestPendingForChangingDetailsPage(){
    //this.router.navigate(['ei/student-list']);
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
