import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
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
  constructor(private genericFormValidationService: GenericFormValidationService, private router: Router, private SpinnerService: NgxSpinnerService, public eiService: EiServiceService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.model.course_id = '';
    this.model.standard_id = '';
    this.model.class_id = '';
    this.displayCourseList();
  }
  displayCourseList() {
    try {
      this.SpinnerService.show();
      this.model.standard_id = '';
      this.eiService.displayCourseList().subscribe(res => {

        let response: any = {};
        response = res;
        this.courseList = response.results;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
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
        this.standardList = response.standarddata;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
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
        this.classList = response.classdata;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
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
      this.eiService.addStudent(this.model).subscribe(res => {

        let response: any = {};
        response = res;

        if (response.status === true)// Condition True Success 
        {
          this.SpinnerService.hide();
          alert(response.message)
          this.model = {};
          this.model.course_id = '';
          this.model.standard_id = '';
          this.model.class_id = '';
        } else { // Condition False Validation failure
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          alert(errorCollection);

        }

        /*End else*/
        //this.router.navigate(['user/signup']);
      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }

  }
  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
}
