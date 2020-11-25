import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 
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
  designationList:any=[];
  country:any
  name_of_school_others:any='';
  name_of_school_first:any='';
  cpassword:any;
  city1:any;
  state1:any;
  errorOtpModelDisplay:any;
  otp1:any;
  otp2:any;
  otp3:any;
  otp4:any;
  //errorOtpModelDisplay:any;
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService
    ) { }


  ngOnInit(): void {
    this.getAllState(); 
    this.getAllDesignationList();
    this.model.school_data = {};
    /*Selected Blank Value of Select box*/
    this.country='India';
    this.model.school_data.landmark='';
    this.state1='';
    this.city1='';
    this.model.school_data.name_of_school='';
    this.model.designation='';
    this.model.is_term_cond=false;
   // localStorage.removeItem("token");
   /*****************************************/ 
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
      this.SpinnerService.show(); 
     
      this.eiService.getallstate(this.model).subscribe(res => {
        
        let response:any={};
        response=res;
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
    //getallstate
    this.isValid(event);
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
     //getallstate
     this.isValid(document.forms);
     let obj = this.cityList.find(o => o.city === city);
     console.log(obj);
     
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

    if(schoolData!='Others')
    {
      var ev =event;
      let obj = this.schoolList.find(o => o.name_of_school === schoolData);
      this.model.school_data.name_of_school=obj.name_of_school;
      this.model.school_data.state=obj.state;
      this.model.school_data.city=obj.city;
      this.model.school_data.address1=obj.address1;
      this.model.school_data.address2= obj.address2 ? obj.address2 : '';
      this.model.school_data.landmark="";
      this.model.school_data.pincode=obj.pincode;
      this.model.school_data.university=obj.university;
      this.model.school_data.no_of_students=obj.no_of_students;
      
      
      setTimeout(() => {
        this.isValid(document.forms[0].elements);
      }, 300);
      
     
    }else{
      this.model.school_data={};
    }
  }
  /****************************************************************************************/
  goToEiMobileVerificationPage(){
    this.error=[];
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,[]);
    if(this.errorDisplay.valid)
    {
      return false;
    }
    
    if(this.name_of_school_first=='Others')
    {
      this.model.school_data.name_of_school=this.name_of_school_others;
    }else{
      this.model.school_data.name_of_school=this.name_of_school_first;
      this.name_of_school_others='';
    }
    
 
    
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
          console.log(res);
          let response:any={};
          response=res;
          this.SpinnerService.hide(); 
          if(response.status===true)
          {

            localStorage.setItem('num', btoa(this.model.phone));
            this.router.navigate(['ei/mobile-verification']);
          }else{
           
            this.SpinnerService.hide(); 
            var errorCollection='';
            errorCollection= this.eiService.getErrorResponse(this.SpinnerService,response.error);
            alert(errorCollection);
            
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
  
}
