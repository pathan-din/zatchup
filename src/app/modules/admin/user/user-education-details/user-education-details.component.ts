import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-education-details',
  templateUrl: './user-education-details.component.html',
  styleUrls: ['./user-education-details.component.css']
})
export class UserEducationDetailsComponent implements OnInit {
  studentDetails:any=[];
  stid:any='';
  userid: any='';
  constructor(private genericFormValidationService: GenericFormValidationService,
    private alert:NotificationService,
    private router: Router, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService,
     public eiService: EiServiceService,
     public base: BaseService, public formBuilder: FormBuilder,
     private location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userid=params['user_id'];
      
     this.getStudentDetails(params['user_id'])

   });
  }

  getStudentDetails(userId){
    try {
      this.SpinnerService.show();
    //base
  
  
    //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
    this.base.getData('ei/student-profile/'+userId+'/').subscribe(res => {
  
      let response: any = {};
      response = res;
      this.SpinnerService.hide();
      if(response.status == true)
      {
        this.studentDetails = response.data;
        console.log(this.studentDetails);
        
      }else{
        this.SpinnerService.hide();
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
  
  goBack(): void{
    this.location.back()
  }
}
