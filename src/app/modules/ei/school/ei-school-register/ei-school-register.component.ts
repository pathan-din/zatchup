import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-ei-school-register',
  templateUrl: './ei-school-register.component.html',
  styleUrls: ['./ei-school-register.component.css']
})
export class EiSchoolRegisterComponent implements OnInit {
  model:any={};
  
  error:any=[];
  errorDisplay:any={};
  stateList:any=[];
  cityList:any=[];
  schoolList:any=[];
  isValue:boolean=false;
  designationList:any=[];
  country:any
  name_of_school_others:any='';
  name_of_school_first:any='';
  name_of_school_first1: any='';
  cpassword:any;
  city1:any;
  state1:any;
  errorOtpModelDisplay:any;
  otp1:any;
  otp2:any;
  otp3:any;
  otp4:any;
  filteredOptions: Observable<string[]>;
  //errorOtpModelDisplay:any;
  data: any;
  keyword:any = 'name_of_school';
  suggestions: string[] = [];
  showHidePassword: string='password';
  showHidecPassword: string='password';;
  name_of_school:any;
  
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService,
    private alert:NotificationService

    ) { }


  ngOnInit(): void {
    this.getAllState(); 
    
    this.getAllDesignationList();
    this.model.school_data = {};
    /*Selected Blank Value of Select box*/
    this.country='India';
    this.model.school_data.landmark='';
    this.model.school_data.city = '';
    
    this.model.designation='';
    this.model.is_term_cond=false;
    
   // localStorage.removeItem("token");
   /*****************************************/ 
  }
  suggest(event) {
     
    if(typeof(event)=='string'){
      this.data = this.schoolList.filter(c => String(c.name_of_school.toLowerCase()).startsWith(event.toLowerCase()));
      if(this.data.length==0){
        this.model.school_data.name_of_school=event; 
      }
    }
   
  }
  suggestData(event) {
    
    // this.data=[];
   this.changeSchool(event.name_of_school);
   this.model.school_data.name_of_school=event.name_of_school; 
   }
  clearSuggestData(){
    
    this.model.school_data.name_of_school='';
    //this.model.school_data={};
  }
  
  goToEiContactUsPage(){
    this.router.navigate(['ei/contact-us']);
  }
  redirectToLogin(){
	 this.router.navigate(['ei/login']); 
  }
  /****************Get All State Function*************************/
  getAllState(){
    //getallstate
    try{
     // this.model.school_data = {};

      this.SpinnerService.show(); 
     
      this.eiService.getallstate(this.model).subscribe(res => {
        
        let response:any={};
        response=res;
        this.model.school_data.state = '';
        this.stateList=response.results;
        this.SpinnerService.hide(); 
       
        },(error) => {
          this.SpinnerService.hide(); 
          
          
        });
    }catch(err){
      this.SpinnerService.hide(); 
      
    }
  }
  /*******************************End ********************************/
  /****************Get City By State Function*************************/
  getCityByState(state){
   // this.model.school_data = {};
    //getallstate
    this.isValid('');
    let obj = this.stateList.find(o => o.state === state);
   
    
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

  getSchoolListBycityId(city){
    //this.model.school_data = {};
     //getallstate
     
     this.isValid(document.forms);
     let obj = this.cityList.find(o => o.city === city);
    
     try{
       if(obj.id){
        this.SpinnerService.show(); 
        //ei/get-notonboarded-ei-by-city
        this.eiService.getSchoolsListByCity(obj.id).subscribe(res => {
          
          let response:any={};
          response=res;
          this.schoolList=response.results;
          
          this.SpinnerService.hide(); 
         
          },(error) => {
            this.SpinnerService.hide(); 
            console.log(error);
            
          });
       }
     
     }catch(err){
       this.SpinnerService.hide(); 
       console.log(err);
     }
  }
  /*************************Designation Api*********************/
  getAllDesignationList(){
    //getallstate
     try{
      this.SpinnerService.show(); 
     
      this.eiService.getAllDesignationList().subscribe(res => {
        this.SpinnerService.hide();
        let response:any={};
        response=res;
        this.designationList=response.results;
         
       
        },(error) => {
          this.SpinnerService.hide(); 
          console.log(error);
          
        });
    }catch(err){
      this.SpinnerService.hide(); 
      console.log(err);
    } 
  }
  /*************************End ********************************/
  /*************************Change School and bind some data pre filled by school**********/
  changeSchool(schoolData){
    //this.model.school_data = {};
       
    let obj = this.schoolList.find(o => o.name_of_school === schoolData);
    this.model.school_data.name_of_school=obj.name_of_school;
     
    
    this.model.school_data.state=obj.state;
    this.model.school_data.city=obj.city;
    this.model.school_data.address1=obj.address1;
    this.model.school_data.address2= obj.address2!='null' && obj.address2!=undefined && obj.address2!=''? obj.address2 : '';
    this.model.school_data.landmark="";
    this.model.school_data.pincode=obj.pincode;
    this.model.school_data.university=obj.university;
    this.model.school_data.no_of_students=obj.no_of_students;
    this.model.school_data.school_code=obj.school_code;
    
    setTimeout(() => {
      this.isValid(document.forms[0].elements);
    }, 300);
  }
  /****************************************************************************************/
  goToEiMobileVerificationPage(){
    
    console.log(this.model);
    
    this.error=[];
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,[]);
    if(this.errorDisplay.valid)
    {
      return false;
    }
    
   // this.model.school_data.state = this.state1;
    //this.model.school_data.city = this.city1;
    // if(this.name_of_school_first=='Others')
    // {
    //   this.model.school_data.name_of_school=this.name_of_school_others;
    //   this.model.school_data.state = this.state1;
    //   this.model.school_data.city = this.city1;
    // }else{
    //   this.model.school_data.name_of_school=this.name_of_school_first;
    //   this.name_of_school_others='';
    // }
    
 
    
      try{
        /**Api For the Register School */

        this.SpinnerService.show(); 
        /***************Merge dob after all selected dropdown *****************/
        //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
        /**********************************************************************/
        if(this.model.phone==null)
        {
          this.model.phone='';
        }
        this.eiService.register(this.model).subscribe(res => {
          
          let response:any={};
          response=res;
          this.SpinnerService.hide(); 
          if(response.status===true)
          {

            localStorage.setItem('num', btoa(this.model.phone));
            localStorage.setItem('email', btoa(this.model.email));
            this.router.navigate(['ei/mobile-verification']);
          }else{
           
            this.SpinnerService.hide(); 
            var errorCollection='';
            errorCollection= this.eiService.getErrorResponse(this.SpinnerService,response.error);
            this.alert.error(errorCollection,'Error');
            
          }
           
           
          },(error) => {
            this.SpinnerService.hide(); 
            console.log(error);
            
          });
      }
      catch(e){
        console.log("Something Went Wrong!")
      }
     
   
    // this.router.navigate(['ei/mobile-verification']);
  }
  showHidePasswordFunction(type) {
    if (type == 'p') {
      if (this.showHidePassword == 'password') {
        this.showHidePassword = 'text';
      } else {
        this.showHidePassword = 'password';
      }
    } else {
      if (this.showHidecPassword == 'password') {
        this.showHidecPassword = 'text';
      } else {
        this.showHidecPassword = 'password';
      }
    } }

    goToTermsAndConditions(type: any, action: any, pageName: any) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['ei/terms-conditions', type, action], { queryParams: { pageName: pageName } })
      );
     window.open('#'+url, '_blank');
    }
}
