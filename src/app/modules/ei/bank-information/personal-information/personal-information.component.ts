import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
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
  constructor( private validationService: GenericFormValidationService,
    private router: Router,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService: BaseService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllState()
    this.getStepFirstData();
    this.getNumberOfStudentList() ;
    localStorage.removeItem("personalInfo");
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

    /* Function Name : isValid
   * Check Form Validation on change and keyUp Event of the input Filed;
   */

  isValid(event) { 
    if (Object.keys(this.errorDisplay).length !== 0) {
      
      this.errorDisplay = this.validationService.checkValidationFormAllControls(event, true, []);
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
  goForward() {
    this.model.send_back_to_edit = 0;
    localStorage.setItem("personalInfo",JSON.stringify(this.model));
    this.router.navigate(["ei/information-and-bank-details"])
    // this.error = [];
    // this.errorDisplay = {};
    // this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }
    // try {
    //   this.loader.show();
      
      
    //   const formData = new FormData();
    //   formData.append('name_of_school', this.model.name_of_school);
    //   formData.append('name_of_principle', this.model.name_of_principle);
    //   formData.append('state', this.model.state);
    //   formData.append('city', this.model.city);
    //   formData.append('address1', this.model.address1);

    //   formData.append('address2', this.model.address2);
    //   formData.append('landmark', this.model.landmark);
    //   formData.append('school_code', this.model.school_code);
    //   formData.append('pincode', this.model.pincode);
    //   formData.append('university', this.model.university);
    //   formData.append('no_of_students', this.model.no_of_students);
    //   formData.append('no_of_alumni', this.model.no_of_alumni);
    //   formData.append('opening_date', this.baseService.getDateFormat(this.model.opening_date));
    //   formData.append('gst_no', this.model.gst_no);
    //   formData.append('overview', this.model.overview);
    //   this.eiService.updateOnboardStepFirstData(formData, localStorage.getItem('user_id')).subscribe(
    //     (res: any) => {
    //       if (res.status == true) {
    //         this.loader.hide();
    //          this.router.navigate(["ei/information-and-bank-details"])
           
    //       } else {
    //         this.loader.hide();
    //       }

    //     }, (error) => {
    //       this.loader.hide();
    //       this.alert.error(error.message, 'Error')

    //     });
    // } catch (err) {
    //   this.loader.hide();
    //   this.alert.error(err, 'Error')
    // }



  }
}
