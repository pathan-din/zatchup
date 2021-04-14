import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-ei-manage-courses-add',
  templateUrl: './ei-manage-courses-add.component.html',
  styleUrls: ['./ei-manage-courses-add.component.css']
})
export class EiManageCoursesAddComponent implements OnInit {

  
  completed: boolean = false;
  state: string;
  model: any = {};
  modelDocumentDetails: any = [];
  durationModel:any={};
  model2Step: any = {};
  documentForm2Elements:any;
  year:any=[];
  month:any=[];  
  months: any = [{'name':'JAN'},
  {'name':'FEB'},
  {'name':'MAR'},
  {'name':'APRIL'},
  {'name':'MAY'},
  {'name':'JUN'},
  {'name':'JULY'},
  {'name':'AUG'},
  {'name':'SEP'},
  {'name':'OCT'},
  {'name':'NOV'},
  {'name':'DEC'}];
  numberOfStudentList = [];
  numberOfAluminiList = [];
  
  errorDisplay: any = {};
  errorMultiFormDisplay: any = [];
  uploadedCoverContent: any = '';
  uploadedCancelCheque: any = '';
  uploadedProfileContent: any = '';
  params:any={};
  openingYear:any;
  constructor(private activatedRoute: ActivatedRoute, private genericFormValidationService: GenericFormValidationService
    , private router: Router,private base:BaseService, private SpinnerService: NgxSpinnerService, public eiService: EiServiceService,
  public formBuilder: FormBuilder,
  private location: Location,
  private alert: NotificationService) { }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.params =  params;
      if(this.params.course_id){
        this.getCourseDetails(this.params.course_id)
      }
      
    })
    if(localStorage.getItem("userprofile")){
      var userProfileData = JSON.parse(localStorage.getItem("userprofile"));
      this.openingYear = new Date(userProfileData.opening_date).getFullYear();
    }
    this.model2Step.is_login=1;
    this.model2Step.coursedata = [{
      course_name: "",
      course_type: "",
      description: "",
      is_teaching_current: true,
      start_year: "",
      end_year: "",
      standarddata: [{
        standard_name: "",
        duration: "",
        classdata: [{
          class_name: '',
          teaching_start_year: "",
          teaching_start_month: 0,
          teaching_stopped: false,
          teaching_end_year: 0,
          teaching_end_month: 0,
          is_teaching_current: true,
          alias_class: ""
        }]
      }],
    }];
 	/*************************Year and month Loop*****************/
	var i=1;
	for(i=1;i<=60;i++)
	{
		this.month.push(i);
	}
	 
	for(i=this.eiService.globalYear;i<=this.eiService.globalCurrentYear;i++)
	{
		this.year.push(i);
	}
	/*************************************************************/

  }
  getCourseDetails(id){
    try {
      this.SpinnerService.show();
    this.base.getData("ei/course-data-by-course-id/"+id+"/").subscribe((res:any)=>{
      if(res.status==true){
        this.SpinnerService.hide();
        if(id){
          this.model2Step.coursedata=[];
          this.model2Step.coursedata.push(res.data);
          this.model2Step.coursedata.forEach(element => {            
            element.is_teaching_current = element.end_year=='Present'?true:false
          });
        }
      }else{
        this.SpinnerService.hide();
      }
    
      
    })
    } catch (e) {
      this.SpinnerService.hide();
    }
    }
  
 /* Function Name : isValid
   * Check Form Validation on change and keyUp Event of the input Filed;
   */

  isValid(event) {
    if(Object.keys(this.errorDisplay).length !== 0){
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(event, true,[]);
	}
  }
  

  /**
   * Add another course in array
   * 
   * 
   */
  addCourseList() {
    this.model2Step.coursedata.push({
      course_name: "",
      course_type:"",
      description: "",
      standarddata: [{
        standard_name: "",
        duration: "",
       
        classdata: [{
          class_name: '',
          teaching_start_year: "",
          teaching_start_month: 0,
          teaching_stopped: false,
          teaching_end_year: 0,
          teaching_end_month: 0,
          is_teaching_current: false,
          alias_class: ""
        }]
      }],
    })
    

  }
   /**
   * Function Name: addAnotherStandard
   */

  addAnotherStandard(courseList) {
    courseList.standarddata.push({
      standard_name: "",
      duration: "",
      classdata: [{
        class_name: '',
        teaching_start_year: courseList.start_year?courseList.start_year:0,
        teaching_start_month: 0,
        teaching_stopped: false,
        teaching_end_year: courseList.is_teaching_current?0:courseList.end_year,
        teaching_end_month: 0,
        is_teaching_current: courseList.is_teaching_current?courseList.is_teaching_current:false,
        alias_class: ""
      }]
    })
  }

  /**
   * Function Name: addAnotherClass
   */

  addAnotherClass(standardList){
    if(!standardList.classdata){
      standardList.classdata=[];
    }
    console.log('is teaching current....', this.model2Step)
    standardList.classdata.push({
      class_name: '',
      teaching_start_year: 0,
      teaching_start_month: 0,
      teaching_stopped: false,
      teaching_end_year: 0,
      teaching_end_month: 0,
      is_teaching_current: true,
      alias_class: ""
    })
  }

  /**
   * Function Name: removeClass
   * Parameter : index of array , dataArray(array)
   *
   */
  removeData(index,dataArray,text){
    //dataArray.splice(index, 1);
    
    if(dataArray[index].id){
      if(text=='standard'){
        dataArray[index].is_deleted=true;
       

        this.deleteData("ei/get-standard-by-id/"+dataArray[index].id+"/",dataArray[index]);

      }else if(text=='section'){
        dataArray[index].is_deleted=true;
        this.deleteData("ei/get-class-by-id/"+dataArray[index].id+"/",dataArray[index]);
      }
      
    }else{
      dataArray.splice(index, 1);
    }
    
  }
  deleteData(url,data){
    try {
    this.base.action(url,data).subscribe((res:any)=>{
      if(res.status==true){
        //this.alert.success(res.message,"Error");
        this.getCourseDetails(this.params.course_id)
      
      }else{
        var displayError = this.eiService.getErrorResponse(this.SpinnerService,res.error);
        this.alert.error(displayError,"Error");
      }
    },(error=>{
      this.alert.error(error.error,"Error");
    }))
    } catch (e) {
      this.alert.error(e.error,"Error");
    }
  }
  addDeletedData(index,dataArray){
    dataArray.is_deleted=false;
    
  }
    /**
   * Function Name: addCourseDataStep2
   */

  addCourseDataStep2(){
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,this.model2Step.coursedata);
    if(this.errorDisplay.valid)
    {
      return false;
    } try {
      this.SpinnerService.show();
      console.log('')
      if(this.params.action){
        var editUrl = "ei/course-data-by-course-id/"+this.params.course_id+"/";
        this.base.actionForPutMethod(editUrl,this.model2Step).subscribe(res => {
          let response: any = {}
          response = res;
          if (response.status == true) {
              this.SpinnerService.hide();
              // var error = this.eiService.getErrorResponse(this.SpinnerService, response.message)
              this.alert.success("Course edit successfully", 'Success')
              this.router.navigate(["ei/manage-courses"]);
          } else {
            this.SpinnerService.hide();
            var error = this.eiService.getErrorResponse(this.SpinnerService, response.error)
            this.alert.error(error, 'Error')
          }
  
        }, (error) => {
          this.SpinnerService.hide();
          this.alert.error(error, 'Error')
  
        });
      }else{
        var editUrl = "ei/add-new-course/";
        this.base.action(editUrl,this.model2Step).subscribe(res => {
          let response: any = {}
          response = res;
          if (response.status == true) {
              this.SpinnerService.hide();
              // var error = this.eiService.getErrorResponse(this.SpinnerService, response.message)
              this.alert.success("Course added successfully", 'Success')
              this.router.navigate(["ei/manage-courses"]);
              
             
          } else {
            this.SpinnerService.hide();
            var error = this.eiService.getErrorResponse(this.SpinnerService, response.error)
            this.alert.error(error, 'Error')
           
          }
  
        }, (error) => {
          this.SpinnerService.hide();
          this.alert.error(error, 'Error')
  
        });
      }
   
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
      this.alert.error(err, 'Error')
    }
  }
    /**
   * 
   * @param event 
   */
  changeDuration(standarddata){
    standarddata.duration= this.durationModel.duration_in_year+'.'+this.durationModel.duration_in_month;
  }
  /**
   * Function name: display_error 
   * Using this function for validation text
   * parameter :  key(number of index ),strKey(name of the unique name and id attribute value)
   */
  display_error(key,strKey)
  {
    
    
    for (var property in this.errorDisplay) {
      if (this.errorDisplay.hasOwnProperty(property)) {
        
        
         if(property==strKey+key)
         {
         
          return this.errorDisplay[property];
         }
      }
    }
    
  }
  resetCourseBothYear(courseList){
    courseList.course_end_year = '';
  }
  endYearCheckValidation(classD) {
    classD.teaching_end_year = 0;
  }
  goBack(): void{
    this.location.back()
  }

  updateSection(data: any, isCurrentTeaching: any){
    data.is_teaching_current = isCurrentTeaching
  }
  
}
