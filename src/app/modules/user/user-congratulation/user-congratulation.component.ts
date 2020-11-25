import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { BaseService } from '../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
declare var $: any;

@Component({
  selector: 'app-user-congratulation',
  templateUrl: './user-congratulation.component.html',
  styleUrls: ['./user-congratulation.component.css']
})
export class UserCongratulationComponent implements OnInit {

  model:any={};
  errorDisplay:any={};
  imageUrl:any; 
  schoolId:any;
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public baseService:BaseService
    , private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService) { }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
       this.schoolId = params['school_id'];
             
  
      });
    }
  redirectToContinueEiProfile(){
    
  }
  goToUserAddEiPage() {
    this.router.navigate(['user/ei-profile'],{queryParams:{school_id:this.schoolId}});
 }

}
