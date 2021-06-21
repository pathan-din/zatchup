import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment'
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { MatStepper } from '@angular/material/stepper';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { CustomEvent } from 'src/app/common/image-viewer/image-viewer-config.model';



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
  @ViewChild('myInputVariable') inputFile: ElementRef;

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
  opening_date: any = '';
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
  extentionCheck: any = '';
  params: any;
  serverImageUrl: any;
  openingYear: any;
  images: any = [];
  imageIndexOne = 0;
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.serverImageUrl = environment.serverImagePath
    this.route.queryParams.subscribe(param => {
      this.countIndex = param.reg_steps - 1;
      this.params = param;
      if (this.params.action && this.params.action == 'edit')
        this.getBankDetails()
      console.log('params is as ::', this.params)
    })
    
    this.getAllState()
    this.getStepFirstData();
    this.getCourseDetailsByEiOnboard();
    this.getNumberOfStudentList();
    this.getBankNameList();
    this.model.no_of_students = '';
    this.model.no_of_alumni = '';
    this.bankModel.bank_name = '';
    let document: any = {};
    document.name = '';
    document.document = '';
    document.document_image='';
    this.modelDocumentDetails.push(document);
    this.getDocumentUploadedByEi()
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


  }
 getDocumentUploadedByEi(){
   try {
    
     this.baseService.getData('ei/document-list-of-school/').subscribe(
       (res: any) =>
       {
         if(res.data.length>0){
          this.modelDocumentDetails = [];
          this.modelDocumentDetails = res.data
         }
        
        
       }
       
     )
   } catch (error) {
     
   }
 }
  /**getBankNameList */

  getCourseDetailsByEiOnboard() {
    try {
      this.loader.show();
      this.baseService.getData("ei/course-data-by-ei/").subscribe(res => {
        let responce: any = {};
        responce = res;
        this.loader.hide();
        if (responce.results.length > 0) {
          this.model2Step.coursedata = responce.results;
          this.model2Step.coursedata.forEach(element => {
            element.is_teaching_current = element.end_year=='Present'?true:false
          });
          
          
        }

      })
    } catch (e) {

    }
  }
  getBankNameList() {
    //ei/get-allbankname/
    try {
      this.loader.show();
      this.baseService.getData('ei/get-allbankname/').subscribe(res => {
        let responce: any = {};
        responce = res;
        if (responce.status == false) {
          this.loader.hide();
          this.bankNameList = [];
          return;
        }
        this.loader.hide();
        this.bankNameList = responce.results


      }, (error) => {
        this.loader.hide();
        this.alert.error("Something went wrong", 'Error');
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
    // this.model.school_data = {};
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
      // this.model.school_data = {};
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
          if (this.model.opening_date) {
            var date = this.model.opening_date.split('-');
            this.opening_date = date[0];
            this.model.opening_date = this.baseService.getDateReverseFormat(this.model.opening_date)
            this.openingYear = new Date(this.model.opening_date).getFullYear();
            
            

          } else {
            this.model.opening_date = '';
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

  resetCourseBothYear(courseList, index,text){
    console.log('gfgd',   this.model2Step);
    
    if(text=='end_year'){
     var i = 0
      this.model2Step.coursedata.forEach(element => {
        if(index == i){
          element.is_teaching_current = courseList.is_teaching_current?courseList.is_teaching_current:false
          element.start_year = courseList.start_year?courseList.start_year:0
          element.end_year = courseList.is_teaching_current?0:courseList.end_year
          element.standarddata.forEach(elements => {
            elements.classdata.forEach(elementc => {
              elementc.is_teaching_current = courseList.is_teaching_current?courseList.is_teaching_current:false
              elementc.teaching_start_year= courseList.start_year?courseList.start_year:0
              elementc.teaching_end_year= courseList.is_teaching_current?0:courseList.end_year
              
            });
          });
        }
        i = i + 1
      }  );
      // this.model2Step.coursedata[index] = {
      //   course_name: courseList.course_name,
      //   course_type: courseList.course_type,
      //   description: courseList.description,
      //   is_teaching_current: courseList.is_teaching_current?courseList.is_teaching_current:false,
      //   start_year: courseList.start_year?courseList.start_year:0,
      //   end_year: courseList.is_teaching_current?0:courseList.end_year,
      //   standarddata: [{
      //     standard_name: "",
      //     duration: "",
      //     classdata: [{
      //       class_name: '',
      //       teaching_start_year: courseList.start_year?courseList.start_year:0,
      //       teaching_start_month: 0,
      //       teaching_stopped: false,
      //       teaching_end_year: courseList.is_teaching_current?0:courseList.end_year,
      //       teaching_end_month: 0,
      //       is_teaching_current: courseList.is_teaching_current?courseList.is_teaching_current:false,
      //       alias_class: ""
      //     }]
      //   }],
      // };
    }else{
    //   courseList.course_end_year = '';
    //   this.model2Step.coursedata[index] = {
    //     course_name: courseList.course_name,
    //     course_type: courseList.course_type,
    //     description: courseList.description,
    //     is_teaching_current: courseList.is_teaching_current?courseList.is_teaching_current:false,
    //     start_year: courseList.start_year?courseList.start_year:0,
    //     end_year: courseList.is_teaching_current?0:courseList.end_year,
    //     standarddata: [{
    //       standard_name: "",
    //       duration: "",
    //       classdata: [{
    //         class_name: '',
    //         teaching_start_year: courseList.start_year?courseList.start_year:0,
    //         teaching_start_month: 0,
    //         teaching_stopped: false,
    //         teaching_end_year: courseList.is_teaching_current?0:courseList.end_year,
    //         teaching_end_month: 0,
    //         is_teaching_current: courseList.is_teaching_current?courseList.is_teaching_current:false,
    //         alias_class: ""
    //       }]
    //     }],
    //   };
    var i = 0
    this.model2Step.coursedata.forEach(element => {
      if(index == i){
        element.is_teaching_current = courseList.is_teaching_current?courseList.is_teaching_current:false
        element.start_year = courseList.start_year?courseList.start_year:0
        element.end_year = courseList.is_teaching_current?0:courseList.end_year
        element.standarddata.forEach(elements => {
          elements.classdata.forEach(elementc => {
            elementc.is_teaching_current = courseList.is_teaching_current?courseList.is_teaching_current:false
            elementc.teaching_start_year= courseList.start_year?courseList.start_year:0
            elementc.teaching_end_year= courseList.is_teaching_current?0:courseList.end_year
            
          });
        });
      }
      i = i + 1
    }  );
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
  addCourseList(courseList?: any) {
    this.model2Step.coursedata.push({
      course_name: "",
      course_type: "",
      description: "",
      is_teaching_current: true,
      standarddata: [{
        standard_name: "",
        duration: "",

        classdata: [{
          class_name: '',
          teaching_start_year:'',
          teaching_start_month: 0,
          teaching_stopped: false,
          teaching_end_year: '',
          teaching_end_month: 0,
          is_teaching_current:true,
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
      this.eiService.updateOnboardStepFirstData(this.model, localStorage.getItem('user_id')).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.openingYear = new Date(this.model.opening_date).getFullYear();
            
            
            this.loader.hide();
            this.getCourseDetailsByEiOnboard();
            if (this.params.redirect_url) {
              this.router.navigate(["ei/" + this.params.redirect_url]);
            }
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
  getRegistrationStep() {
    try {
      this.baseService.getData('user/reg-step-count/').subscribe(res => {
        let response: any = {};
        response = res;
        if (response.reg_step == 2) {
          this.countIndex = 0;
        } else {
          this.countIndex = response.reg_step - 3;
        }

        setTimeout(() => {
          if (response.reg_step > 2) {
            this.myStepper.selectedIndex = this.countIndex;
            this.myStepper.next();
          }
        }, 1000);
        // this.myStepper.selectedIndex = this.countIndex;
        // console.log(this.myStepper);

      }, (error => {
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
    if ( 
       this.uploadedCancelCheque.type != "image/png"
      && this.uploadedCancelCheque.type != "image/jpg"
      && this.uploadedCancelCheque.type != "image/jpeg") {
        this.alert.error("File format not supported", 'Error');
        this.inputFile.nativeElement.value = '';
      //this.errorDisplay.cheque = "only support pdf and image";
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

  addAnotherClass(courseList,standardList) {
    console.log(standardList.classdata);

    standardList.classdata.push({
      class_name: '',
      teaching_start_year: courseList.start_year?courseList.start_year:0,
      teaching_start_month: 0,
      teaching_stopped: false,
      teaching_end_year: courseList.is_teaching_current?0:courseList.end_year,
      teaching_end_month: 0,
      is_teaching_current: courseList.is_teaching_current?courseList.is_teaching_current:false,
      alias_class: ""
    })
  }

  /**
   * Function Name: removeData
   * Parameter : index of array , dataArray(array)
   *
   */
  removeData(index, dataArray,document) {
   console.log('dataarray', dataArray);
   
    // dataArray.splice(index, 1);
    if(dataArray.length==1){
      index=index-1;
    }
    
    
    
    if(!dataArray[index].id){
      dataArray.splice(index, 1);
      
    }else{
      let data:any={};
      data.document_id = dataArray[index].id;
      try {
        this.loader.show()
        this.baseService.action("ei/document-delete-by-id/",data).subscribe((res:any)=>{
          if(res.status == true){
            this.loader.hide()
            this.alert.success(res.message,"Success");
          }
          
        },(error=>{
          this.loader.hide();
          this.alert.success(error.error,"Error");
        })
        )  
      } catch (error) {
        this.loader.hide()
        this.alert.success(error.error,"Error");
      }
    }
    
  }

  endYearCheckValidation(classD) {
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
            if (this.params.redirect_url) {
              this.router.navigate(["ei/" + this.params.redirect_url]);
            }
            else if (this.params.reg_steps){
              let uri = 'ei/onboarding-process'
              this.reloadWindow(uri, 3)
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
            if (this.params.redirect_url) {
              this.router.navigate(["ei/" + this.params.redirect_url]);
              return
            }
            if (this.params.reg_steps){
              let uri = 'ei/onboarding-process'
              this.reloadWindow(uri, 4)
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
    } else {
      if (fileData.type == 'application/pdf') {
        document.extention = 'pdf';
      } else {
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
            document.document_image = this.serverImageUrl+res.filename;
            console.log(this.modelDocumentDetails);
            
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
            if (this.params.redirect_url) {
              this.router.navigate(["ei/" + this.params.redirect_url]);
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

  getBankDetails() {
    try {
      this.loader.show();
      this.baseService.getData('ei/ei-bank-detail/').subscribe(
        (res: any) => {
          if (res.status == true) {
            this.bankModel = res.data

          } else {
            var collection = this.eiService.getErrorResponse(this.loader, res.error);
            this.alert.error(collection, 'Error')
          }
          this.loader.hide();
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.erorr, 'Error')
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
  reloadWindow(uri, params){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri], { queryParams: { 'reg_steps': params}}));
  }
  download_file(fileURL) {
    let url = this.serverImageUrl+'/'+fileURL
    window.open(url, '_blank');
  }

  viewImage(src) {
    console.log('sdsddd',src)
    this.images = []
    this.images.push(src);
  }

  handleEvent(event: CustomEvent) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
  }
}


