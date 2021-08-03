import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-ei-student-bulk-add',
  templateUrl: './ei-student-bulk-add.component.html',
  styleUrls: ['./ei-student-bulk-add.component.css']
})
export class EiStudentBulkAddComponent implements OnInit {
  model: any = {};
  error: any = [];
  errorDisplay: any = {};
  courseList: any = [];
  standardList: any = [];
  classList: any = [];
  maxlength: any;
  type: any;
  student: any = {};
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router, 
    private SpinnerService: NgxSpinnerService, 
    public eiService: EiServiceService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private location: Location
    ) { }

  ngOnInit(): void {
    // this.model.course_id = '';
    // this.model.standard_id = '';
    // this.model.class_id = '';
   // this.displayCourseList();
  }
  displayCourseList() {
    try {
      this.SpinnerService.show();
      this.model.standard_id = '';
      this.eiService.displayCourseList().subscribe(res => {

        let response: any = {};
        response = res;
     //   if(response.status == true){
        this.courseList = response.results;
      // }else{
      //   this.SpinnerService.hide();
      //   this.alert.error(response.error, 'Error')
      // }
      }, (error) => {
        this.SpinnerService.hide();
        //this.alert.error(error, 'Error')
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //this.alert.error(err, 'Error')
      //console.log(err);
    }
  }
  displayStandardList(courseId) {
    try {
      this.SpinnerService.show();
      this.standardList = []
      //this.model.course_id='';

      this.model.class_id = '';
      this.eiService.displayStandardList(courseId).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        //if(response.status == true){
        this.standardList = response.standarddata;
      // }else{
      //   this.SpinnerService.hide();
      //   this.alert.error(response.error, 'Error')
      // }
      }, (error) => {
        this.SpinnerService.hide();
        //this.alert.error(error, 'Error')
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //this.alert.error(err, 'Error')
      console.log(err);
    }
  }
  displayClassList(stId) {
    try {
      this.SpinnerService.show();
      this.classList = [];
      this.eiService.displayClassList(stId).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
      //  if(response.status == true){
        this.classList = response.classdata;
      // } else{
      //   this.SpinnerService.hide();
      //   this.alert.error(response.error, 'Error')
      // }
      }, (error) => {
        this.SpinnerService.hide();
        //this.alert.error(error, 'Error')
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //this.alert.error(err, 'Error')
      //console.log(err);
    }
  }
  redirectToStudentManagement() {
    this.router.navigate(['ei/student-management']);
  }

  
  //
  addStudent() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/
      // if (this.model.zatchup_id != '') {
      //   delete this.model['first_name']
      //   delete this.model['last_name']
      //   delete this.model['username']

        
      // } else {
      //   delete this.model['zatchup_id']
      // }
      if(this.model.zatchup_id != ''){
        this.student.model = {
        'zatchup_id': this.model.zatchup_id
        }
      }
      else if(this.model.username != ''){
        this.student.model = {
          'username' :  this.model.username
        }
      }
      

      this.eiService.addStudent(this.student.model).subscribe(res => {

        let response: any = {};
        response = res;

        if (response.status === true)// Condition True Success 
        {
          this.SpinnerService.hide();
          this.alert.success(response.message, 'Success')
          this.model = {};
          // this.model.course_id = '';
          // this.model.standard_id = '';
          // this.model.class_id = '';
        } else { // Condition False Validation failure
          this.SpinnerService.hide();
          // var errorCollection = '';
          // for (var key in response.error) {
          //   if (response.error.hasOwnProperty(key)) {
          //     errorCollection = errorCollection + response.error[key][0] + '\n'

          //   }
          // }
          // alert(errorCollection);
          this.alert.error(response.error.message[0], 'Error')

        }

        /*End else*/
        //this.router.navigate(['user/signup']);
      }, (error) => {
        this.SpinnerService.hide();
        this.alert.error(error, 'Error')
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      this.alert.error(err, 'Error')
      //console.log(err);
    }

  }

 
  isValidUser() {
    this.model.zatchup_id = ''
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  isValidZatchup() {
    this.model.username = ''
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  goBack(): void{
    this.location.back()
  }

  isCheckEmailOrPhone(event) {
    this.maxlength = ''
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) {

      this.type = 'email';
      this.maxlength = 50;
      this.model.email = this.model.username;
      this.model.phone = '';
    } else {
      const numbers = /^[0-9]+$/;
      if (numbers.test(event.target.value)) {
        this.type = 'tel'
        this.maxlength = 10;
        this.model.phone = this.model.username;
        this.model.email = '';
      }

    }
  }
}
