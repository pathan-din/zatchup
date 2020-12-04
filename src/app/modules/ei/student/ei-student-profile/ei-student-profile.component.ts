import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-student-profile',
  templateUrl: './ei-student-profile.component.html',
  styleUrls: ['./ei-student-profile.component.css']
})
export class EiStudentProfileComponent implements OnInit {
  studentDetails:any=[];
  constructor(private genericFormValidationService: GenericFormValidationService,
    private alert:NotificationService,
    private router: Router, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService,
     public eiService: EiServiceService,
     public base: BaseService, public formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       
       
      this.getStudentDetails(params['stId'])

    });

  }

  goToEiStudentHistoryPage(){
    this.router.navigate(['ei/student-history']);
  }
  getStudentDetails(studentId){
    try {
      this.SpinnerService.show();
    //base
  
  
    //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
    this.base.getData('ei/student-profile/'+studentId+'/').subscribe(res => {
  
      let response: any = {};
      response = res;
      this.SpinnerService.hide();
      if(response.status == true)
      {
        this.studentDetails = response.results;
      }
      
      
    }, (error) => {
      this.SpinnerService.hide();
      // console.log(error);
      // this.alert.error(response.message[0], 'Error')
    });
  } catch (err) {
    this.SpinnerService.hide();
    console.log(err);
    // this.alert.error(err, 'Error')
  }
  }
}
