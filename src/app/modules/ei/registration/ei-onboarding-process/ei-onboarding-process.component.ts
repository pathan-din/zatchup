import { Component, OnInit, ViewChild, ElementRef , HostListener} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
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
  @ViewChild(MatStepper, { static: false }) myStepper: MatStepper;
  @ViewChild('inputFile') myInputVariable: ElementRef;

  completed: boolean = false;
  state: string;
  stateList: any = [];
  cityList: any = [];
  model: any = {};
  modelDocumentDetails: any = [];
  durationModel: any = {};
  model2Step: any = {};
  documentForm2Elements: any;
  year: any = [];
  month: any = [];
  months: any = [{ 'name': 'JAN' },
  { 'name': 'FEB' },
  { 'name': 'MAR' },
  { 'name': 'APRIL' },
  { 'name': 'MAY' },
  { 'name': 'JUN' }, 
  { 'name': 'JULY' }, 
  { 'name': 'AUG' }, 
  { 'name': 'SEP' }, 
  { 'name': 'OCT' }, 
  { 'name': 'NOV' }, 
  { 'name': 'DEC' }];
  numberOfStudentList = [];
  numberOfAluminiList = [];
  error: any = [];
  errorDisplay: any = {};
  errorMultiFormDisplay: any = [];
  uploadedCoverContent: any = '';
  uploadedCancelCheque: any = '';
  uploadedProfileContent: any = '';
  bankModel: any = {};
  bankNameList = [];
  countIndex: any;
  extentionCheck:any='';
  params:any;
//   @HostListener("window:keydown", ["$event"]) unloadHandler(event: Event) {
//     console.log("Processing beforeunload...", this.countIndex);
//     this.getRegistrationStep();
   
//     console.log( this.myStepper.selectedIndex);
    
// }
  constructor(
    private validationService: GenericFormValidationService,
    private router: Router,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService: BaseService,
    private route:ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(param=>{
      this.countIndex= param.reg_steps-1;
      this.params=param;
    })
   
    this.getAllState()
    this.getStepFirstData();
    this.getCourseDetailsByEiOnboard();
    //this.getNumberOfAluminiList();
    this.getNumberOfStudentList();
    this.getBankNameList();
    //this.getRegistrationStep()
    this.model.no_of_students = '';
    this.model.no_of_alumni = '';
    this.bankModel.bank_name = '';
    let document: any = {};
    document.name = '';
    document.document = '';
    this.modelDocumentDetails.push(document);
    var i = 1;
    for (i = 1; i <= 60; i++) {
      this.month.push(i);
    }

    for (i = this.eiService.globalYear; i <= this.eiService.globalCurrentYear; i++) {
      this.year.push(i);
    }
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
          teaching_start_month: 0,
          teaching_stopped: false,
          teaching_end_year: 0,
          teaching_end_month: 0,
          is_teaching_current: false,
          alias_class: ""
        }]
      }],
    }];
     
     
  }
  ngAfterViewInit(){
   // this.getRegistrationStep()
  }
  /**getBankNameList */

  getCourseDetailsByEiOnboard(){
    try {
    this.loader.show();
    this.baseService.getData("ei/course-data-by-ei/").subscribe(res=>{
      let responce:any = {};
      responce = res;
      this.loader.hide();
      if(responce.results.length>0){
        this.model2Step.coursedata = responce.results;
      }
      
    })
    } catch (e) {
    
    }
  }
  getBankNameList(){
    //ei/get-allbankname/
    try {
     this.loader.show();
     this.baseService.getData('ei/get-allbankname/').subscribe(res=>{
      let responce :any={};
      responce = res;
      if(responce.status==false){
        this.loader.hide();
        this.bankNameList =[];
        return;
      }
      this.loader.hide();
      this.bankNameList = responce.results
      
      
     },(error)=>{
      this.loader.hide();
      this.alert.error("Something went wrong",'Error');
     })
    } catch (e) {
    
    }
  }


  /**
   * 
   * @param event 
   */
  changeDuration(standarddata) {
    standarddata.duration = this.durationModel.duration_in_month;
  }

  getCityByState(state) {
    this.model.school_data = {};
    this.isValid(event);
    let obj = this.stateList.find(o => o.state === state);


    try {
      this.loader.show();
      this.eiService.getCityByStateId(obj.id).subscribe(
        (res: any) => {
          this.cityList = res.results;
          this.loader.hide();
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error');
        });
    } catch (err) {
      this.loader.hide();
    }
  }
  /****************Get All State Function*************************/
  getAllState() {
    //getallstate
    try {
      this.model.school_data = {};
      this.loader.show();

      this.eiService.getallstate(this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.stateList = response.results;
        this.loader.hide();

      }, (error) => {
        this.loader.hide();


      });
    } catch (err) {
      this.loader.hide();

    }
  }
  /* Function Name : isValid
   * Check Form Validation on change and keyUp Event of the input Filed;
   */

  isValid(event) { 
    if (Object.keys(this.errorDisplay).length !== 0) {
      
      this.errorDisplay = this.validationService.checkValidationFormAllControls(event, true, []);
    }
  }

  /* Function Name : getStepFirstData
   * Update and check our school data 
   * request : Object
   * responce : Object
   */

 getStepFirstData() {
    try {
      this.loader.show();
      this.eiService.getOnboardStepFirstData(localStorage.getItem('user_id')).subscribe(
        (res: any) => {
          this.validationService.hideSpeanerWithConsole(this.loader, 'suceess')
          setTimeout(() => {
            this.getCityByState(this.model.state)
              
          }, 100);
          
          
          this.model = res;
          if(this.model.opening_date){
            this.model.opening_date = this.baseService.getDateReverseFormat(this.model.opening_date)
          }else{
            this.model.opening_date='';
          }
          
          //this.countIndex = this.model.reg_steps ? this.model.reg_steps : 0;
         
          this.loader.hide();
        }, (error) => {
          this.validationService.hideSpeanerWithConsole(this.loader, error)

        });
    } catch (err) {
      this.validationService.hideSpeanerWithConsole(this.loader, err)


    }

  }
  /**
   * FUnction Name : getNumberOfStudentList
   * 
   */
  getNumberOfStudentList() {
    try {


      this.loader.show();
      this.eiService.getNumberOfStudentList().subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.loader.hide();
          this.numberOfStudentList = response.results;
        } else {
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.loader.hide();
        this.alert.error(error.message, 'Error')

      });
    } catch (err) {
      this.loader.hide();
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
          teaching_start_year: 0,
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
  goForward() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
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
      formData.append('overview', this.model.overview);
      this.eiService.updateOnboardStepFirstData(formData, localStorage.getItem('user_id')).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.getCourseDetailsByEiOnboard();
            this.myStepper.selected.completed = true;
            this.myStepper.next();
          } else {
            this.loader.hide();
          }

        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')

        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }



  }
  handleProfilePicFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploadedProfileContent = fileData;
  }
  handleCoverPicFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploadedCoverContent = fileData;


  }

   /**Find the step of the register process for all Users */
   getRegistrationStep(){
    try {
      this.baseService.getData('user/reg-step-count/').subscribe(res=>{
        let response:any={};
        response=res;
        if(response.reg_step==2){
          this.countIndex = 0;
        }else{
          this.countIndex = response.reg_step-3;
        }
        
        setTimeout(() => {
          if(response.reg_step>2){
          this.myStepper.selectedIndex = this.countIndex;
          this.myStepper.next();
          }
        },1000);
        // this.myStepper.selectedIndex = this.countIndex;
        // console.log(this.myStepper);
        
      },(error=>{
          //this.alert.warning("Data not Fetched","Warning");
      }))
    } catch (e) {
      //this.alert.error("Something went wrong, Please contact administrator.","Error");
    }
  }
  handleCancelChequeFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploadedCancelCheque = fileData;
    this.errorDisplay.cheque = "";
    if(this.uploadedCancelCheque.type!= "application/pdf"
     && this.uploadedCancelCheque.type!= "image/png"
      && this.uploadedCancelCheque.type!= "image/jpg"
     && this.uploadedCancelCheque.type!= "image/jpeg"){
       this.errorDisplay.cheque = "only support pdf and image";
     }
    //type: "application/pdf"
    //type: "image/png"
    
    
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
        teaching_start_year: 0,
        teaching_start_month: 0,
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
    console.log(standardList.classdata);
    
    standardList.classdata.push({
      class_name: '',
      teaching_start_year: 0,
      teaching_start_month: 0,
      teaching_stopped: false,
      teaching_end_year: 0,
      teaching_end_month: 0,
      is_teaching_current: false,
      alias_class: ""
    })
  }

  /**
   * Function Name: removeData
   * Parameter : index of array , dataArray(array)
   *
   */
  removeData(index, dataArray) {
    dataArray.splice(index, 1);
  }

  endYearCheckValidation(classD){
    classD.teaching_end_year = 0;
  }

  /**
 * Function Name: addCourseDataStep2
 */

  addCourseDataStep2() {

    this.error = [];
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, false, this.model2Step.coursedata);
    if (this.errorDisplay.valid) {
      return false;
    } try {
      this.loader.show();

      this.eiService.updateOnboardStepSecondData(this.model2Step).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            if( this.params.redirect_url){
              this.router.navigate(["ei/"+this.params.redirect_url]);
            }
            this.myStepper.selected.completed = true;
            this.myStepper.next();
          } else {
            this.loader.hide();
            this.alert.error(res.error.message[0], 'Error')
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')

        });
    } catch (err) {
      this.loader.hide();
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
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[2].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    } try {
      this.loader.show();
      const formData = new FormData();
      formData.append('bank_name', this.bankModel.bank_name);
      formData.append('bank_account_no', this.bankModel.bank_account_no);
      formData.append('bank_ifsc_code', this.bankModel.bank_ifsc_code);
      formData.append('cancel_cheque', this.uploadedCancelCheque);


      this.eiService.updateOnboardStepThreeData(formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.myStepper.selected.completed = true;
            this.myStepper.next();


          } else {
            this.loader.hide();
            this.alert.error(res.error.message[0], 'Error')
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')
        });
    } catch (err) {
      this.loader.hide();
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
    document.extention = '';
    this.modelDocumentDetails.push(document);
  }

  /** 
   * Function Name : fileUploadDocument
  */
  fileUploadDocument(files, document) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png' && fileData.type !== 'application/pdf') {
      this.loader.hide();
      this.alert.error("File format not supported", 'Error');
      this.myInputVariable.nativeElement.value = '';
      return
    }else{
      if(fileData.type == 'application/pdf'){
        document.extention = 'pdf';
      }else{
        document.extention = '';
      }
      
      
    }
    const formData = new FormData();
    formData.append('file_name', fileData);
    try {
      this.loader.show();
      this.eiService.uploadFile(formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            document.document = res.filename;
            return res.filename;
          } else {
            this.loader.hide();
            var collection = this.eiService.getErrorResponse(this.loader, res.error);
            this.alert.error(collection, 'Error')
            return '';
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')
          return '';
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
  /**
   * Function Name: submitDocumentFourStep
   * 
   */
  submitDocumentFourStep() {
    this.error = [];
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[3].elements, false, this.modelDocumentDetails);
    if (this.errorDisplay.valid) {
      return false;
    } try {
      this.loader.show();
      let documentdata: any = {};
      documentdata.documentdata = this.modelDocumentDetails;
      this.eiService.updateOnboardStepFourData(documentdata).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            if( this.params.redirect_url){
              this.router.navigate(["ei/"+this.params.redirect_url]);
            }
            this.router.navigate(['ei/ei-profile-preview']);
          } else {
            this.loader.hide();
            var collection = this.eiService.getErrorResponse(this.loader, res.error);
            this.alert.error(collection, 'Error')
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.erorr, 'Error')
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
}


