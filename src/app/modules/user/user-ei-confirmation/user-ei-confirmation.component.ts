import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
declare var $: any;

@Component({
  selector: 'app-user-ei-confirmation',
  templateUrl: './user-ei-confirmation.component.html',
  styleUrls: ['./user-ei-confirmation.component.css']
})

export class UserEiConfirmationComponent implements OnInit {
  
  model: any = {};
  editmodel: any = {};
  /*Using Validation For Manage Error Concept*/
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  confirmationDetails:any=[];
  /*Qualification Master*/
  studentsConfirmation: any = [];
  school_id:any="";
  standard_id:any;
  classList: any[];
  currentDate:any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public baseService: BaseService,
    public eiService:EiServiceService,
    private genericFormValidationService:GenericFormValidationService,
    public formBuilder: FormBuilder,
    private confirmDialogService: ConfirmDialogService,
    public alert:NotificationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(parrams=>{
      if(parrams['school_id']){
          this.school_id = parrams['school_id'];
      }
    })
    this.getConfirmationDetails();
    this.currentDate  = new Date();
  }
  

  goToUserProfileCreatedPage() {
    $("#OTPModel").modal('hide');
    this.router.navigate(['user/profile-created']);
 }
/**Delete Course  */

deleteCourse(id: any): any {

  this.confirmDialogService.confirmThis('Are you sure to delete ?', () => {
    this.SpinnerService.show()
    let model:any={};
    model.course_id = id;
    this.baseService.action('user/delete-course-standard-detail-by-student/', model).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, "Success")
          this.getConfirmationDetails();
        } else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.SpinnerService.hide();
      }
    ), err => {
      this.alert.error(err.error, 'Error')
      this.SpinnerService.hide();
    }
  }, () => {
  });
}
// deleteCourse(course_id){

//  // 
//  try {
//   let model:any={};
//   model.course_id = course_id;
//   this.SpinnerService.show()
//   this.baseService.action("user/delete-course-standard-detail-by-student/",model).subscribe(res=>{
//     let response :any ={};
//     response = res;
//     if(response.status==true){
//       this.SpinnerService.hide()

//       this.alert.success(response.message,"Success");
//       location.reload();
//     }else{
//       this.SpinnerService.hide();
//       var error = this.eiService.getErrorResponse(this.SpinnerService,response.error);
//       this.alert.error(error,"Error");
     
//     }

//   },(error=>{

//     this.SpinnerService.hide()
//     this.alert.error(error.error,"Error");
//   }))
// } catch (e) {
// this.alert.error(e.error,"Error");
// }

// }
/****************************** */
 deleteStandard(standard_id){
    try {
        let model:any={};
        model.standard_id = standard_id;
        this.SpinnerService.show()
        this.baseService.action("user/delete-standard-detail-by-student/",model).subscribe(res=>{
          let response :any ={};
          response = res;
          if(response.status==true){
            this.SpinnerService.hide()

            this.alert.success(response.message,"Success");
            $("#verifiedModel").modal("hide");
            this.getConfirmationDetails();
          }else{
            this.SpinnerService.hide();
            var error = this.eiService.getErrorResponse(this.SpinnerService,response.error);
            this.alert.error(error,"Error");
           
          }

        },(error=>{

          this.SpinnerService.hide()
          this.alert.error(error.error,"Error");
        }))
    } catch (e) {
      this.alert.error(e.error,"Error");
    }
 }

 closeModel(){
  $("#verifiedModel").modal("hide");
 }
 openModel(standard_id){
   this.standard_id = standard_id;
   $("#verifiedModel").modal({
    backdrop: 'static',
    keyboard: false
  }); 
 }
 openEditModel(standard_id){
  this.editmodel={};
  this.editmodel.standard_id = standard_id;
 
  this.displayClassList(standard_id);
  $("#personalInfoModel").modal({
   backdrop: 'static',
   keyboard: false
 }); 
}
editStandardDetails(){
   
  
  this.errorDisplay = {};
  this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[1].elements, false, []);
  if (this.errorDisplay.valid) {
    return false;
  }
  try {

    this.SpinnerService.show();
    this.editmodel.standard_start_year=this.baseService.getDateFormat(this.editmodel.standard_start_year)
    this.editmodel.standard_end_year=this.baseService.getDateFormat(this.editmodel.standard_end_year)
    this.baseService.action("user/edit-course-standard-detail-by-student/",this.editmodel).subscribe(res=>{
      let response:any = res;
      if(response.status==true){
        this.SpinnerService.hide();
        $("#personalInfoModel").modal("hide");
        this.alert.success("Data edit successfully","Success");
        this.getConfirmationDetails();
      }else{
        this.SpinnerService.hide();
        this.alert.error("No Update","Error");
      }
    },(error=>{
      this.SpinnerService.hide();
    }))
  } catch (error) {
    this.SpinnerService.hide();
  }
 
}
displayClassList(stId) {
  try {
    this.SpinnerService.show();
    this.classList = [];
    let data: any = {};
    data.standard_id = stId;
    this.baseService.getData('user/class-list-by-standardid/', data).subscribe(res => {
      
      this.SpinnerService.hide();
      let response: any = {};
      response = res;
      this.classList = response.results;
     
    }, (error) => {
      this.SpinnerService.hide();
      //console.log(error);

    });
  } catch (err) {
    this.SpinnerService.hide();
    //console.log(err);
  }
}
 addPastEi(){
  $("#OTPModel").modal('hide');
  this.router.navigate(['user/add-ei'],{queryParams:{"title":"past"}});
 }
 addAnotherCourse(){
  $("#OTPModel").modal("hide");
   this.router.navigate(['user/add-ei'],{queryParams:{"title":"current"}});
 }
 getConfirmationDetails(){
  try{
    this.SpinnerService.show(); 
   
    this.baseService.getData('user/get-ei-course-confirmation-list/').subscribe(res => {
      
          let response:any={};
          response=res;
          if(response.status==true){
            this.SpinnerService.hide(); 
            this.confirmationDetails=response.data;
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
