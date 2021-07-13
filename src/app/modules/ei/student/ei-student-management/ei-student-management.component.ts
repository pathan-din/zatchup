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
  permission: any =[];
  
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
    console.log(JSON.parse(localStorage.getItem('getreject')));
    
    if(JSON.parse(localStorage.getItem('getreject')).role == 'EISUBADMIN'){
      if(this.isValidModule('MODULE010')==false){
        this.alert.error(" You Don't have permission to chat with students. Please contact school for more information.","Error")
       this.router.navigate(['ei/my-profile'])
        return 
      }
    }
   
  }

  isValidModule(module_code) {
    let moduleList: any = {};
    this.permission = JSON.parse(sessionStorage.getItem('permission'))
    if (this.permission !== undefined && this.permission !== null && this.permission !== '') {
      moduleList = this.permission;
      
      var data = moduleList.find(el => {
        return el.module_code == module_code
      })
      console.log(data, 'djsdj');
      
      if (data) {
        return data.is_access;
      } else {
        return false;
      }
    } else {
      return true;
    }
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
  goToRejectedStudent(){
    this.router.navigate(['ei/student-verified-list'],{queryParams:{'approved':2,'title':'Rejected'}});
  }
  goToEiStudentRequestPendingForCourseDetailsPage(){
    
    this.router.navigate(['ei/request-for-course-list']);
  }
  goToEiStudentPendingVerificationPage(){
    this.router.navigate(['ei/student-verified-list'],{queryParams:{'approved':0,'kyc_approved':0,'title':'Unverified'}});
  }
  
  goToRejectedBySystemPage(){
    this.router.navigate(['ei/student-verified-list'],{queryParams:{'is_rejected':1,'rejectedby':1,'title':'Rejected By System'}});
  }

  goToRejectedByUserPage(){
    
    this.router.navigate(['ei/student-verified-list'],{queryParams:{'is_rejected':1,'rejectedby':2,'title':'Rejected By'}});
  }

  goToEiStudentRequestPendingForChangingDetailsPage(){
    this.router.navigate(['ei/request-for-change-list']);
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
  goToEiSentForSignUpComponent(){
    this.router.navigate(['ei/sent-for-sign-up'], {queryParams: {status: 'SENTFORSIGNUP'}});
  }

  goToEiSentForApproval(){
    this.router.navigate(['ei/sent-for-sign-up'], {queryParams: {status: 'SENTFORAPPROVAL'}})
  }
  goToSentForApprovalComponent(){
    this.router.navigate(['ei/sent-for-approval']);
  }

  goToViewStatusReject(){
    this.router.navigate(['ei/sent-for-sign-up'], {queryParams: {status: 'REJECTBYUSER'}})
  }
}
