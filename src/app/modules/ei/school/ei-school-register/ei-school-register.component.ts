import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showHidecPassword: string='password';
  local: any = {};
  name_of_school:any;
  stateID: any;
  stateobj: any = {};
  list: any;
  stateObj: any;
  
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService,
    private alert:NotificationService,
    private route: ActivatedRoute
    ) { }


  ngOnInit(): void {
    this.getAllState();
    if(this.route.snapshot.queryParamMap.get('edit')){
     this.editData()
     this.country='India';
    }
    else {
      this.getAllDesignationList();
      this.model.school_data = {};
      /*Selected Blank Value of Select box*/
      this.country='India';
      this.model.school_data.landmark='';
      this.model.school_data.state = '';
      this.model.school_data.city = '';
      
      this.model.designation='';
      this.model.is_term_cond=false;
    }
    
    
    
    
   // localStorage.removeItem("token");
   /*****************************************/ 
  }

  editData(){
    this.model = JSON.parse(localStorage.getItem('model'))  
    this.model.school_data =  JSON.parse(localStorage.getItem('model')).school_data
    this.getAllDesignationList();
    this.stateobj = JSON.parse(localStorage.getItem('stateObj'))
    this.model.school_data.state = this.stateobj.state
    this.getCityByStateId(this.stateobj.id)
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
    this.model.school_data={};
    this.model.school_data.state = '';
    this.model.school_data.city = ''
  }
  
  goToEiContactUsPage(){
    this.router.navigate(['ei/contact-us']);
  }
  redirectToLogin(){
	 this.router.navigate(['ei/login']); 
  }

  /****************Get All State Function*************************/
  getAllState(){
    try{
      this.SpinnerService.show(); 
      this.eiService.getallstate(this.model).subscribe(res => {
       let response:any={};
       response=res;
       this.model.school_data.state = '';
        this.stateList=response.results;
        
        if(this.route.snapshot.queryParamMap.get('edit')){
          console.log(this.stateobj);
          if(this.stateobj){
            this.model.school_data.state = this.stateobj.state
          } 
          else  {
            this.model.school_data.state = '';
          }
        }
        
        this.SpinnerService.hide(); 
       
        },(error) => {
          this.SpinnerService.hide(); });
    }catch(err){
      this.SpinnerService.hide();  }
  }

  getCityByStateId(id){
    try{
      this.SpinnerService.show(); 
     
      this.eiService.getCityByStateId(id).subscribe(res => {
        
        let response:any={};
        response=res;
        
        this.cityList=response.results;
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
   this.isValid('');
    let obj = this.stateList.find(o => o.state === state);
    this.stateObj = obj
    try{
      this.SpinnerService.show(); 
      this.eiService.getCityByStateId(obj.id).subscribe(res => {
      let response:any={};
        response=res;
        this.cityList=response.results;
        this.SpinnerService.hide(); 
        },(error) => {
          this.SpinnerService.hide(); 
         });
    }catch(err){
      this.SpinnerService.hide(); 
    }
  }

  isValid(event){
	  if(Object.keys(this.errorDisplay).length !== 0){
        this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,true,[]); 
	  } }

  getSchoolListBycityId(city){
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
          });
       } }catch(err){
       this.SpinnerService.hide();
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
         });
    }catch(err){
      this.SpinnerService.hide(); 
    } 
  }
  /*************************End ********************************/
  /*************************Change School and bind some data pre filled by school**********/
  changeSchool(schoolData){
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
    this.error=[];
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,[]);
    if(this.errorDisplay.valid)
    {
      return false;
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
          let response:any={};
          response=res;
          this.SpinnerService.hide(); 
          if(response.status===true)
          {
            localStorage.setItem('num', btoa(this.model.phone));
            localStorage.setItem('email', btoa(this.model.email));
            localStorage.setItem('password', btoa(this.model.password));
            localStorage.setItem('school_name', this.model.school_data.name_of_school);
            localStorage.setItem('model', JSON.stringify(this.model));
            localStorage.setItem('stateObj', JSON.stringify(this.stateObj))
            this.router.navigate(['ei/mobile-verification']);
          }else{
           this.SpinnerService.hide(); 
            var errorCollection='';
            errorCollection= this.eiService.getErrorResponse(this.SpinnerService,response.error);
            this.alert.error(errorCollection,'Error');
          } },(error) => {
            this.SpinnerService.hide(); 
            });
      }
      catch(e){   }
     
   
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
