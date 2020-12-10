import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { findIndex } from 'rxjs/operators';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-subadmin-add',
  templateUrl: './subadmin-add.component.html',
  styleUrls: ['./subadmin-add.component.css']
})
export class SubadminAddComponent implements OnInit {
  model: any = {};
  errorDisplay: any = {};
  designationList: any = [];
  moduleList: any = [];
  designations: any = [];
  modifiedModulesList: any = [];
  isTeacher: boolean = false;
  classListArrayAccess: any = [];
  classListArrayModuleAccess: any = [];
  courseList: any = [];
  courseListModuleAccess: any = [];
  standardList: any = [];
  classList: any = [];
  isModuleAccessStudent: any
  standardListModuleAccess: any = [];
  classListModuleAccess: any = [];
  modelCodeIndex: any;
  arrayList: any = [];
  isClass: any;
  isModuleAccessClass: any

  constructor(
    private router: Router,
    private baseService: BaseService,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    private genericFormValidationService: GenericFormValidationService,
    private alert: NotificationService,
    private location: Location
  ) { }





  ngOnInit(): void {
    this.model.designation = ''
    this.model.module_details = [];
    this.getAllDesignationList();
    this.getAllModuleList();
    this.displayCourseList();
    this.model.is_access = true;
    let obj: any = {};
    obj.course = '';
    obj.standard = '';
    obj.class_id = '';
    this.arrayList.push(obj);
  }
  addMore() {
    let obj: any = {};
    obj.course = '';
    obj.standard = '';
    obj.class_id = '';
    this.arrayList.push(obj);
  }
  displayCourseList() {
    try {
      this.SpinnerService.show();

      // this.model.course = '';
      //this.model.standard = '';
      // this.model.teaching_class = '';
      this.eiService.displayCourseList().subscribe(res => {
        this.SpinnerService.hide();
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
  displayStandardList(courseId, i) {
    try {
      this.SpinnerService.show();
      this.standardList[i] = []
      //this.model.standard = '';
      //this.model.course_id='';

      // this.model.teaching_class = '';
      this.eiService.displayStandardList(courseId).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.standardList[i] = response.standarddata;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  displayClassList(stId, i) {
    try {
      this.SpinnerService.show();
      this.classList[i] = [];
      this.eiService.displayClassList(stId).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.classList[i] = response.classdata;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }

  displayCourseListModuleAccess() {
    try {
      this.SpinnerService.show();
      this.courseListModuleAccess=[];
      this.standardListModuleAccess=[];
      this.classListModuleAccess=[];
      // this.model.course = '';
      //this.model.standard = '';
      // this.model.teaching_class = '';
      this.eiService.displayCourseList().subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.courseListModuleAccess = response.results;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  displayStandardListModuleAccess(courseId) {
    try {
      this.SpinnerService.show();
      this.standardList = []
      //this.model.standard = '';
      //this.model.course_id='';

      // this.model.teaching_class = '';
      this.eiService.displayStandardList(courseId).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.standardListModuleAccess[courseId] = response.standarddata;
        
      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
    
    
  }
  displayClassListModuleAccess(stId) {
    try {
      this.SpinnerService.show();
      this.classList = [];
      this.eiService.displayClassList(stId).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.classListModuleAccess[stId] = response.classdata;

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  getClassesOnSelect(id) {
    var index = this.classListArrayAccess.findIndex(codes => codes === id);
    if (index == -1) {
      this.classListArrayAccess.push(id);
    } else {
      this.alert.error("You have already added.", "Error");
      return;
    }
    console.log(this.classListArrayAccess);

    this.model.teacher_class_id = this.classListArrayAccess.join();
  }
  getclassListArrayModuleAccess(id) {
    var index = this.classListArrayModuleAccess.findIndex(codes => codes === id);
    if (index == -1) {
      this.classListArrayModuleAccess.push(id);
    } else {

      this.classListArrayModuleAccess.splice(index, 1);
    }


    this.model.module_details[this.modelCodeIndex].class_id = this.classListArrayModuleAccess.join();
  }


  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
  /**Open Class Model Access */
  openClassModel(module_code) {
    let objModel: any = {};
    const index = this.model.module_details.findIndex(codes => codes.module_code === module_code);
    if (index == -1) {
      this.alert.error('Please select respective module.', 'Error');
      return;
    } else {
      this.modelCodeIndex = index;
      objModel.module_code = module_code;
      this.model.module_details[index] = objModel;
      console.log(this.model.module_details);
      //this.model.module_details.splice(index, 1);
    }
    $("#addClassModel").modal({
      backdrop: 'static',
      keyboard: false
    });
  }
  /*************************Designation Api*********************/
  getAllDesignationList() {
    //getallstate
    try {
      this.SpinnerService.show();
      let subadmin: any = {};
      subadmin.is_display_subadmin = true
      this.baseService.getData('ei/getalldesignations/', subadmin).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.designationList = response.results;


      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }

  submitPermissionWithClass() {

    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);


    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();

      this.baseService.action('ei/add-subadmin-by-ei/', this.model).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.alert.success(response.message,'Success');
          this.router.navigate(['ei/subadmin-management']);
        } else {
          this.SpinnerService.hide();
          this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService, response.error)
          this.alert.error(this.errorDisplay,'Error');
        }
        //this.moduleList=response.results;


      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });


    } catch (e) {

    }
  }
  chooseDesignation(event, isCheckDesignation, id) {
    this.designationList.forEach(element => {
      this.designations[element.id] = false;
    });
    if (event.checked) {
      this.designations[isCheckDesignation] = true;
      this.model.designation = isCheckDesignation;
    } else {
      this.designations[isCheckDesignation] = false;
    }

    if (isCheckDesignation == 'TEACHER') {
      this.isTeacher = true;
    } else {
      this.isTeacher = false;
    }


  }
  getAllModuleList() {
    try {
      this.SpinnerService.show();

      this.baseService.getData('ei/get-master-modules/').subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.moduleList = response.data;
          this.moduleList.forEach(element => {

            if (element.sub_module_set.length > 0) {


              element.sub_module_set.forEach(elements => {
                elements.count = element.sub_module_set.length
                elements.parentmodule = element.module_name
                this.modifiedModulesList.push(elements);
              });
            } else {
              element.count = 0;
              this.modifiedModulesList.push(element);
            }

          });
          console.log(this.modifiedModulesList);


        } else {
          this.SpinnerService.hide();
        }



      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });


    } catch (e) {

    }
  }
  isAllSelected(event, code) {
    let objModel: any = {};
    if (event.checked) {
      const index = this.model.module_details.findIndex(codes => codes.module_code === code);


      if (index == -1) {
        objModel.module_code = code;
        this.model.module_details.push(objModel);
      } else {
        this.model.module_details.splice(index, 1);
      }

    } else {
      const index = this.model.module_details.findIndex(codes => codes.module_code === code);

      if (index != -1) {
        this.model.module_details.splice(index, 1);

      }
    }
    console.log(this.model);

  }

  goBack(): void{
    this.location.back()
  }
}
