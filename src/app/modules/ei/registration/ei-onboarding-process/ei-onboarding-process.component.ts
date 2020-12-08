import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { MatStepper } from '@angular/material/stepper';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';



@Component({
  selector: 'app-ei-onboarding-process',
  templateUrl: './ei-onboarding-process.component.html',
  styleUrls: ['./ei-onboarding-process.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})

export class EiOnboardingProcessComponent implements OnInit {
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // constructor(private _formBuilder: FormBuilder)

  // Only required when not passing the id in methods
  @ViewChild(MatStepper, { static: false }) myStepper: MatStepper;
  completed: boolean = false;
  state: string;
  stateList:any=[];
  cityList:any=[];
  model: any = {};
  modelDocumentDetails: any = [];
  durationModel: any = {};
  model2Step: any = {};
  documentForm2Elements: any;
  year: any = [];
  month: any = [];
  months: any = [{'name':'JAN'},
                 {'name':'FEB'},
                 {'name':'MAR'},
                 {'name':'APRIL'},
                 {'name':'MAY'},{'name':'JUN'},{'name':'JULY'},{'name':'AUG'},{'name':'SEP'},{'name':'OCT'},{'name':'NOV'},{'name':'DEC'}];
  numberOfStudentList = [];
  numberOfAluminiList = [];
  error: any = [];
  errorDisplay: any = {};
  errorMultiFormDisplay: any = [];
  uploadedCoverContent: any = '';
  uploadedCancelCheque: any = '';
  uploadedProfileContent: any = '';
  bankModel: any = {};
  bankNameList = [
    { name: "Bank of Baroda" },
    { name: "Bank of India" },
    { name: " Bank of Maharashtra" },
    { name: "  Canara Bank" },
    { name: " Central Bank of India" },
    { name: " Indian Bank" },
    { name: "Indian Overseas Bank" },
    { name: "Punjab and Sind Bank" },
    { name: "Punjab National Bank" },
    { name: "State Bank of India" },
    { name: "UCO Bank" },
    { name: "Union Bank of India" },
    { name: "Axis Bank" },
    { name: " Bandhan Bank" },
    { name: "Catholic Syrian Bank" },
    { name: "City Union Bank" },
    { name: "DCB Bank" },
    { name: "Dhanlaxmi Bank" },
    { name: "Federal Bank" },
    { name: "HDFC Bank" },
    { name: "ICICI Bank" },
    { name: "IDBI Bank" },
    { name: "IDFC First Bank" },
    { name: "IndusInd Bank" },
    { name: "Jammu & Kashmir Bank" },
    { name: "Karnataka Bank" },
    { name: "Karur Vysya Bank" },
    { name: "Kotak Mahindra Bank" },
    { name: " Lakshmi Vilas Bank" },
    { name: "Nainital Bank" },
    { name: "RBL Bank" },
    { name: "South Indian Bank" },
    { name: "Tamilnad Mercantile Bank" },
    { name: "Yes Bank" }];
  constructor(private activatedRoute: ActivatedRoute,
    private genericFormValidationService: GenericFormValidationService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService: BaseService) { }



  ngOnInit(): void {

    this.getAllState()
    this.getStepFirstData();
    this.getNumberOfAluminiList();
    this.getNumberOfStudentList();
    this.model.no_of_students = '';
    this.model.no_of_alumni = '';

   // this.durationModel.duration_in_month = "";
    this.bankModel.bank_name = '';

    /****************Document Bind Model***********************/
    let document: any = {};
    document.name = '';
    document.document = '';
    this.modelDocumentDetails.push(document);
    /****************End Document Bind Model***********************/
    /*************************Year and month Loop*****************/
    var i = 1;
    for (i = 1; i <= 60; i++) {
      this.month.push(i);
    }

    for (i = this.eiService.globalYear; i <= this.eiService.globalCurrentYear; i++) {
      this.year.push(i);
    }
    /*************************************************************/

    /* setTimeout(() => {
       this.documentForm2Elements=document.forms[1].elements;  
     }, 300);*/

    this.model2Step.coursedata = [{
      course_name: "",
      course_type: "",
      description: "",

      standarddata: [{
        standard_name: "",
        duration: "",
        classdata: [{
          class_name: '',
          teaching_start_year: "",
          teaching_start_month: "",
          teaching_stopped: false,
          teaching_end_year: 0,
          teaching_end_month: 0,
          is_teaching_current: false,
          alias_class: ""
        }]
      }],
    }];
    var that = this;
    // this.activatedRoute.queryParams.subscribe(params=>{
    // if(params)
    // {
    // if(params.reg_steps==1)
    // {
    // console.log();
    // }
    // }
    // });


  }
  /**
   * 
   * @param event 
   */
  changeDuration(standarddata) {
    standarddata.duration = this.durationModel.duration_in_month;
  }

  getCityByState(state){
    this.model.school_data = {};
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
    /****************Get All State Function*************************/
    getAllState(){
      //getallstate
      try{
        this.model.school_data = {};
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
  /* Function Name : isValid
   * Check Form Validation on change and keyUp Event of the input Filed;
   */

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(event, true, []);
    }
  }

  /* Function Name : getStepFirstData
   * Update and check our school data 
   * request : Object
   * responce : Object
   */

  getStepFirstData() {
    try {
      this.SpinnerService.show();
      this.eiService.getOnboardStepFirstData(localStorage.getItem('user_id')).subscribe(res => {
        this.genericFormValidationService.hideSpeanerWithConsole(this.SpinnerService, 'suceess')
        let response: any = {}
        response = res;
        this.model = response;
        this.model.opening_date= this.baseService.getDateReverseFormat(this.model.opening_date)
        console.log(this.model);
        
        this.getCityByState(this.model.state)
        this.SpinnerService.hide();
      }, (error) => {
        //this.SpinnerService.hide();
        this.genericFormValidationService.hideSpeanerWithConsole(this.SpinnerService, error)

      });
    } catch (err) {
      this.genericFormValidationService.hideSpeanerWithConsole(this.SpinnerService, err)


    }

  }
  /**
   * FUnction Name : getNumberOfStudentList
   * 
   */
  getNumberOfStudentList() {
    try {


      this.SpinnerService.show();
      this.eiService.getNumberOfStudentList().subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.numberOfStudentList = response.results;
        } else {
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
        this.alert.error(error, 'Error')

      });
    } catch (err) {
      this.SpinnerService.hide();
      // console.log("vaeryfy Otp Exception", err);
      this.alert.error(err, 'Error')
    }

  }
  getNumberOfAluminiList() {
    try {


      this.SpinnerService.show();
      this.eiService.getNumberOfStudentList().subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.numberOfAluminiList = response.results;
        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        this.alert.error(error, 'Error')

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("variyfy Otp Exception", err);
      this.alert.error(err, 'Error')
    }

  }
  goToEiDashboardPage() {
    this.router.navigate(['ei/dashboard']);

  }

  /**
   * Add another course in array
   * 
   * 
   */
  addCourseList() {
    this.model2Step.coursedata.push({
      course_name: "",
      course_type: "",
      description: "",
      standarddata: [{
        standard_name: "",
        duration: "",

        classdata: [{
          class_name: '',
          teaching_start_year: "",
          teaching_start_month: "",
          teaching_stopped: false,
          teaching_end_year: 0,
          teaching_end_month: 0,
          is_teaching_current: false,
          alias_class: ""
        }]
      }],
    })


  }
  goForward(stepper: MatStepper) {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append('name_of_school', this.model.name_of_school);
      formData.append('name_of_principle', this.model.name_of_principle);
      formData.append('state', this.model.state);
      formData.append('city', this.model.city);
      formData.append('address1', this.model.address1);

      formData.append('address2', this.model.address2);
      formData.append('landmark', this.model.landmark);
      formData.append('school_code', this.model.school_code);
      formData.append('pincode', this.model.pincode);
      formData.append('university', this.model.university);
      formData.append('no_of_students', this.model.no_of_students);
      formData.append('no_of_alumni', this.model.no_of_alumni);
      formData.append('opening_date', this.baseService.getDateFormat(this.model.opening_date));
      formData.append('gst_no', this.model.gst_no);

      //formData.append('profile_pic', this.uploadedProfileContent);
      //formData.append('cover_pic', this.uploadedCoverContent);

      //formData.append('kyc_type',this.model.kyc_type) ;
      this.eiService.updateOnboardStepFirstData(formData, localStorage.getItem('user_id')).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.myStepper.selected.completed = true;
          this.myStepper.next();


        } else {
          this.SpinnerService.hide();
          console.log("Error:Data not update");
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        this.alert.error(error, 'Error')

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
      this.alert.error(err, 'Error')
    }



  }
  handleProfilePicFileInput(file) {
    console.log(file);

    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploadedProfileContent = fileData;
  }
  handleCoverPicFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploadedCoverContent = fileData;


  }
  handleCancelChequeFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploadedCancelCheque = fileData;
    console.log(this.uploadedCancelCheque);

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
        teaching_start_year: "",
        teaching_start_month: "",
        teaching_stopped: false,
        teaching_end_year: 0,
        teaching_end_month: 0,
        is_teaching_current: false,
        alias_class: ""
      }]
    })

  }

  /**
   * Function Name: addAnotherClass
   */

  addAnotherClass(standardList) {
    standardList.classdata.push({
      class_name: '',
      teaching_start_year: "",
      teaching_start_month: "",
      teaching_stopped: false,
      teaching_end_year: 0,
      teaching_end_month: 0,
      is_teaching_current: false,
      alias_class: ""
    })
  }

  /**
   * Function Name: removeClass
   * Parameter : index of array , dataArray(array)
   *
   */
  removeData(index, dataArray) {
    //console.log(index,dataArray);
    dataArray.splice(index, 1);
  }

  /**
 * Function Name: addCourseDataStep2
 */

  addCourseDataStep2() {

    this.error = [];
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[1].elements, false, this.model2Step.coursedata);
    console.log(this.errorDisplay)
    if (this.errorDisplay.valid) {
      return false;
    } try {
      this.SpinnerService.show();

      this.eiService.updateOnboardStepSecondData(this.model2Step).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.myStepper.selected.completed = true;
          this.myStepper.next();


        } else {
          this.SpinnerService.hide();
          console.log("Error:Data not update");
          this.alert.error(response.error, 'Error')
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        this.alert.error(error, 'Error')

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("verify Otp Exception", err);
      this.alert.error(err, 'Error')
    }
  }
  /**
   * Function name: display_error 
   * Using this function for validation text
   * parameter :  key(number of index ),strKey(name of the unique name and id attribute value)
   */
  display_error(key, strKey) {


    for (var property in this.errorDisplay) {
      if (this.errorDisplay.hasOwnProperty(property)) {


        if (property == strKey + key) {

          return this.errorDisplay[property];
        }
      }
    }

  }


  /**
   * Function Name: submitBankDetailOnboardingProcessStepThree
   * 
   */

  submitBankDetailOnboardingProcessStepThree() {

    this.error = [];
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[2].elements, false, []);
    // this.bankModel.cancel_cheque= this.uploadedCoverContent;

    if (this.errorDisplay.valid) {
      return false;
    } try {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append('bank_name', this.bankModel.bank_name);
      formData.append('bank_account_no', this.bankModel.bank_account_no);
      formData.append('bank_ifsc_code', this.bankModel.bank_ifsc_code);
      formData.append('cancel_cheque', this.uploadedCancelCheque);


      this.eiService.updateOnboardStepThreeData(formData).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.myStepper.selected.completed = true;
          this.myStepper.next();


        } else {
          this.SpinnerService.hide();
          console.log("Error:Data not update");
          this.alert.error(response.error, 'Error')
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        this.alert.error(error, 'Error')

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("verify Otp Exception", err);
      this.alert.error(err, 'Error')
    }
  }
  /**
   * Function Name : addMoreDocument
   * Use : Use function for multiple Documents
   */
  addMoreDocument() {
    let document: any = {};
    document.name = '';
    document.document = '';
    this.modelDocumentDetails.push(document);
  }

  /** 
   * Function Name : fileUploadDocument
  */
  fileUploadDocument(files, document) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    const formData = new FormData();
    formData.append('file_name', fileData);
    try {
      this.SpinnerService.show();



      this.eiService.uploadFile(formData).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          document.document = response.filename;
          return response.filename;
          console.log("Sccess:Update");


        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error, 'Error')
          console.log("Error:Data not update");
          return '';
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
        this.alert.error(error, 'Error')
        return '';

      });
    } catch (err) {
      this.SpinnerService.hide();
      this.alert.error(err, 'Error')
      console.log("verify Otp Exception", err);
    }


  }


  /**
   * Function Name: submitDocumentFourStep
   * 
   */

  submitDocumentFourStep() {
    this.error = [];
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[3].elements, false, this.modelDocumentDetails);
    // this.bankModel.cancel_cheque= this.uploadedCoverContent;

    if (this.errorDisplay.valid) {
      return false;
    } try {
      this.SpinnerService.show();
      let documentdata: any = {};
      documentdata.documentdata = this.modelDocumentDetails;


      this.eiService.updateOnboardStepFourData(documentdata).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.router.navigate(['ei/dashboard']);



        } else {
          this.SpinnerService.hide();
          var collection=this.eiService.getErrorResponse(this.SpinnerService,response.error);
          this.alert.error(collection, 'Error')
          console.log("Error:Data not update");
        }

      }, (error) => {
        this.SpinnerService.hide();
        this.alert.error(error, 'Error')
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      this.alert.error(err, 'Error')
      console.log("verify Otp Exception", err);
    }

  }


}


