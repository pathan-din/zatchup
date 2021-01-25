import { Component, OnInit, ViewChild, ElementRef , HostListener} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { environment } from '../../../../../environments/environment'
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { MatStepper } from '@angular/material/stepper';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-add-more-document',
  templateUrl: './add-more-document.component.html',
  styleUrls: ['./add-more-document.component.css']
})
export class AddMoreDocumentComponent implements OnInit {

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
  serverImageUrl: any
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
    this.serverImageUrl = environment.serverImagePath
    let document: any = {};
    document.name = '';
    document.document = '';
    this.modelDocumentDetails.push(document);
    localStorage.removeItem("documentdata");
    
   
     
     
  }
  
  /* Function Name : isValid
   * Check Form Validation on change and keyUp Event of the input Filed;
   */

  isValid(event) { 
    if (Object.keys(this.errorDisplay).length !== 0) {
      
      this.errorDisplay = this.validationService.checkValidationFormAllControls(event, true, []);
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
  }

 
 

  /**
   * Function Name: removeData
   * Parameter : index of array , dataArray(array)
   *
   */
  removeData(index, dataArray) {
    dataArray.splice(index, 1);
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
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, this.modelDocumentDetails);
    if (this.errorDisplay.valid) {
      return false;
    } 
    let documentdata: any = {};
    documentdata.documentdata = this.modelDocumentDetails;
    if( localStorage.getItem("is_ei_approved")){
        this. submitDocument(documentdata)
    }else{
      localStorage.setItem("documentdata",JSON.stringify(documentdata));
      this.router.navigate(["ei/information-and-bank-details"]);
    }
    
  }
  /**
   * Function Name: submitDocumentFourStep
   * 
   */
  submitDocument(documentdata) {
    // this.error = [];
    // this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, this.modelDocumentDetails);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }
     try {
      this.loader.show();
      
      //documentdata.documentdata = this.modelDocumentDetails;
      
      this.eiService.updateOnboardStepFourData(documentdata).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            localStorage.removeItem("documentdata");

            this.router.navigate(['ei/information-and-bank-details']);
            
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
