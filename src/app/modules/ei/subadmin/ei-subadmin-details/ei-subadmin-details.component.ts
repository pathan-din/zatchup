import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ei-subadmin-details',
  templateUrl: './ei-subadmin-details.component.html',
  styleUrls: ['./ei-subadmin-details.component.css']
})
export class EiSubadminDetailsComponent implements OnInit {
 subAdminListDetails:any={}
 profileId:any; 
 model:any={};
  constructor(private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService, 
    public eiService: EiServiceService, 
    public base: BaseService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var id = params['id'];
      if(!id)
      {
        this.router.navigate(['ei/subadmin-management'])
        return;
      }
      this.profileId = id;
      this.sudAdminList(id) ;  
    });
    
  }

  goToSubAdminHistory(id){
    this.router.navigate(['ei/subadmin-history'], {queryParams: {'subadmin_id' : id}})
  }
 
  /**Delete Subadmin from list */
  deleteFunctionForSubAdminAccess(id){
    try {
      this.SpinnerService.show();
     
    this.model.module_details=[];
    this.model.subadmin_id = id;
    //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
    this.base.action('ei/remove-all-subadminaccess/',this.model).subscribe(res => {
      
      let response: any = {};
      response = res;
      if(response.status==true){
        this.SpinnerService.hide();
        //this.subAdminListDetails = response.data;
        this.alert.success(response.message,'Sucess')
        this.router.navigate(['ei/subadmin-management'])
      }else{
        this.alert.error("Please try again.",'Sucess')
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
  /**End Delete Function */
 
  sudAdminList(id){
    try {
      this.SpinnerService.show();
     

    //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
    this.base.getData('ei/edit-subadmin-by-ei/'+id).subscribe(res => {
      
      let response: any = {};
      response = res;
      if(response.status==true){
        this.SpinnerService.hide();
        this.subAdminListDetails = response.data;
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
  goToSubadminAccessHistoryPage(){
    this.router.navigate(['ei/subadmin-access-history']);
  }
  redirectToEditAccess(id){
    this.router.navigate(['ei/subadmin-access'],{queryParams:{id:id}});
  }
  goBack(): void{
    this.location.back()
  }

  deleteSubAdmin(){
    try {
      this.SpinnerService.show()
      this.model = {
        'subadmin_id': this.route.snapshot.queryParamMap.get('id')
      }

      this.base.action('ei/delete-subadmin-account/', this.model).subscribe(
        (res : any) => {
          if(res.status == true){
            this.alert.success(res.message, 'Success')
            this.router.navigate(['ei/subadmin-completed-request'])
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.SpinnerService.hide()
        }, (error) =>{
          this.alert.error('Please try again', 'Error')
          this.SpinnerService.hide()
        }
      )
    } catch (error) {
      this.SpinnerService.hide()
    }
  }

}
