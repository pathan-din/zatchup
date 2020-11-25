import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
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
  numberOfStudentList = [];
  numberOfAluminiList = [];
  
  errorDisplay: any = {};
  errorMultiFormDisplay: any = [];
  uploadedCoverContent: any = '';
  uploadedCancelCheque: any = '';
  uploadedProfileContent: any = '';
  
  constructor(private activatedRoute: ActivatedRoute, private genericFormValidationService: GenericFormValidationService
    , private router: Router,private base:BaseService, private SpinnerService: NgxSpinnerService, public eiService: EiServiceService,
	public formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.model2Step.coursedata = [{
      course_name: "",
      course_type:"",
      description: "",
      
      standarddata: [{
        standard_name: "",
        duration: "",
        classdata: [{
          class_name: '',
          teaching_start_year: "",
          teaching_start_month: "",
          teaching_stopped: false,
          teaching_end_year: "",
          teaching_end_month: "",
          is_teaching_current: false,
          alias_class: ""
        }]
      }],
    }];
 	/*************************Year and month Loop*****************/
	var i=1;
	for(i=1;i<=12;i++)
	{
		this.month.push(i);
	}
	 
	for(i=this.eiService.globalYear;i<=this.eiService.globalCurrentYear;i++)
	{
		this.year.push(i);
	}
	/*************************************************************/

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
          teaching_start_month: "",
          teaching_stopped: false,
          teaching_end_year: "",
          teaching_end_month: "",
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
      duration:"",
       
      classdata: [{
        class_name: '',
        teaching_start_year: "",
        teaching_start_month: "",
        teaching_stopped: false,
        teaching_end_year: "",
        teaching_end_month: "",
        is_teaching_current: false,
        alias_class: ""
      }]
    })

  }

  /**
   * Function Name: addAnotherClass
   */

  addAnotherClass(standardList){
    standardList.classdata.push({
      class_name: '',
      teaching_start_year: "",
      teaching_start_month: "",
      teaching_stopped: false,
      teaching_end_year: "",
      teaching_end_month: "",
      is_teaching_current: false,
      alias_class: ""
    })
  }

  /**
   * Function Name: removeClass
   * Parameter : index of array , dataArray(array)
   *
   */
  removeData(index,dataArray){
    //console.log(index,dataArray);
    dataArray.splice(index, 1);
  }
    /**
   * Function Name: addCourseDataStep2
   */

  addCourseDataStep2(){
   
     
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,false,this.model2Step.coursedata);
    console.log(this.errorDisplay)
    if(this.errorDisplay.valid)
    {
      return false;
    } try {
      this.SpinnerService.show();
      
      this.base.action('ei/add-new-course/',this.model2Step).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
            this.SpinnerService.hide();
            alert(response.message);
        } else {
          this.SpinnerService.hide();
          console.log("Error:Data not update");
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
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
  
}
