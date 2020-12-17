import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { BaseService } from '../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from '../../../services/notification/notification.service';
declare var $: any;
@Component({
  selector: 'app-user-add-ei',
  templateUrl: './user-add-ei.component.html',
  styleUrls: ['./user-add-ei.component.css']
})
export class UserAddEiComponent implements OnInit {
  
  modelZatchup:any={};
  stateList:any=[];
  cityList:any=[];
  schoolList:any=[];
  error:any=[];
  model:any={};
  errorDisplay:any={};
  name_of_school_others:any='';
  name_of_school_first:any='';
  
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public baseService:BaseService,
    private alert: NotificationService,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService) { }

  ngOnInit(): void {
    this.getAllState(); 
    this.model.state='';
    this.model.city='';
  }

  goToUserEiProfilePage() {
    this.router.navigate(['user/ei-profile']);
 }
 /****************Get All State Function*************************/
 getAllState(){
  //getallstate
  try{
    this.SpinnerService.show(); 
   
    this.eiService.getallstate(this.model).subscribe(res => {
      
      let response:any={};
      response=res;
      this.stateList=response.results;
      this.SpinnerService.hide(); 
     
      },(error) => {
        this.SpinnerService.hide(); 
        console.log(error);
        
      });
  }catch(err){
    this.SpinnerService.hide(); 
    console.log(err);
  }
}
/*******************************End ********************************/
/****************Get City By State Function*************************/
getCityByState(state){
  //getallstate
  //this.isValid(event);
  let obj:any={};
  obj = this.stateList.find(o => o.state.toLowerCase() === state.toLowerCase());
  
  
  try{
    this.SpinnerService.show(); 
   
    this.eiService.getCityByStateId(obj.id).subscribe(res => {
      
      let response:any={};
      response=res;
      this.cityList=response.results;
      
      
      this.SpinnerService.hide(); 
     
      },(error) => {
        this.SpinnerService.hide(); 
        console.log(error);
        
      });
  }catch(err){
    this.SpinnerService.hide(); 
    console.log(err);
  }
}

isValid(event)
{
  if(Object.keys(this.errorDisplay).length !== 0){
      this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,true,[]); 
  }
}
goToUserQualificationPage() {
  this.errorDisplay = {};
  this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
  if (this.errorDisplay.valid) {
    return false;
  }
  try {

    this.SpinnerService.show();
    if(this.name_of_school_first=='Others')
    {
      this.model.name_of_school=this.name_of_school_others;
    }else{
      this.model.name_of_school=this.name_of_school_first;
      this.name_of_school_others='';
    }
    /***********************Mobile Number OR Email Verification Via OTP**********************************/

    this.baseService.action('user/add-ei/',this.model).subscribe(res => {
      let response: any = {}
      response = res;
      this.SpinnerService.hide();
      if (response.status == true) {
        if(response.check_school_info_on_zatchup==1)
        {
          localStorage.removeItem("checkincourse");
          this.router.navigate(['user/congratulation'],{queryParams:{school_id:response.data.school_id}});
        }else if(response.check_school_info_on_zatchup==2){
          localStorage.setItem("checkincourse","true");
          this.router.navigate(['user/add-new-course'],{queryParams:{school_id:response.data.school_id}});
        }else if(response.check_school_info_on_zatchup==3){
          localStorage.removeItem("checkincourse");
          this.router.navigate(['user/add-new-course'],{queryParams:{school_id:response.data.school_id}});
        }
         
      } else {
        this.SpinnerService.hide();
        var errorCollection = '';
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)) {
            errorCollection = errorCollection + response.error[key][0] + '\n'

          }
        }
        this.alert.error(errorCollection,'Error');
      }
    }, (error) => {
      this.SpinnerService.hide();

    });
  } catch (err) {
    this.SpinnerService.hide();

  }

}
getSchoolListBycityId(city){
  //getallstate
  //this.isValid(document.forms);
  let obj = this.cityList.find(o => o.city.toLowerCase() === city.toLowerCase());
  console.log(this.cityList);
  
  try{
    this.SpinnerService.show(); 
   
    this.eiService.getSchoolListByCity(obj.id).subscribe(res => {
      
      let response:any={};
      response=res;
      this.schoolList=response.results;
      this.SpinnerService.hide(); 
     
      },(error) => {
        this.SpinnerService.hide(); 
        console.log(error);
        
      });
  }catch(err){
    this.SpinnerService.hide(); 
    console.log(err);
  }
}
getSchoolListBycity(id){
  //getallstate
  //this.isValid(document.forms);
  
  try{
    this.SpinnerService.show(); 
   
    this.eiService.getSchoolListByCity(id).subscribe(res => {
      
      let response:any={};
      response=res;
      this.schoolList=response.results;
      this.SpinnerService.hide(); 
     
      },(error) => {
        this.SpinnerService.hide(); 
        console.log(error);
        
      });
  }catch(err){
    this.SpinnerService.hide(); 
    console.log(err);
  }
}
changeSchool(schoolData){

  if(schoolData!='Others')
  {
    var ev =event;
    let obj = this.schoolList.find(o => o.name_of_school === schoolData);
    this.model.university=obj.university;
    this.model.address1=obj.address1;
    this.modelZatchup.zatchup_id=obj.school_code;
    }else{
    this.model.school_data={};
  }
}
/**Get data using zatchupId */
getDataByZatchupId() {
  
  try {

    this.SpinnerService.show();
    if(!this.modelZatchup.zatchup_id){
      // alert("Enter Zatchup Id.");
      this.alert.warning("Enter Zatchup Id.", 'Warning')
      return false;
    }
    this.baseService.action('user/get-school-detail-zatchupid/',this.modelZatchup).subscribe(res => {
      let response: any = {}
      response = res;
      this.SpinnerService.hide();
      if (response.status == true) {
        let model:any={}
        model=response.data;
        
        this.getCityByState(model.state)
        
        
        this.model.city=  model.city;
        this.getSchoolListBycity(model.city_id)
        this.name_of_school_first=model.name_of_school;
        this.model.state = model.state;
        this.model.address1 = model.address1;
        this.model.university = model.university;
        if(model.school_code){this.modelZatchup.zatchup_id = model.school_code;} 
       
      } else {
        this.SpinnerService.hide();
        var errorCollection = '';
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)) {
            errorCollection = errorCollection + response.error[key][0] + '\n'

          }
        }
        this.alert.error(errorCollection,'Error');
      }
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);

    });
  } catch (err) {
    this.SpinnerService.hide();

  }

}
/**End */
 goToUserEiProfileNotOnboardPage() {
  this.router.navigate(['user/ei-profileNotOnboard']);
}


}
