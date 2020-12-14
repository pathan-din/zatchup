import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-ei-subadmin-access',
  templateUrl: './ei-subadmin-access.component.html',
  styleUrls: ['./ei-subadmin-access.component.css']
})
export class EiSubadminAccessComponent implements OnInit {

  subAdminListDetails: any = {}
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
  isModuleAccessClass: any;
  classAccessFromDb: any = [];
  userId: any;
  module: any = {};
  constructor(
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public baseService: BaseService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,
    public eiService: EiServiceService,
    private genericFormValidationService: GenericFormValidationService, 
    private location: Location) { }

  ngOnInit(): void {
    this.model.module_details = [];
    this.module.module_details = [];
    this.route.queryParams.subscribe(params => {
      var id = params['id'];
      if(!id)
      {
        this.router.navigate(['ei/subadmin-management'])
        return
      }
      this.userId = id;
      this.sudAdminListAccessDetails(id)
    });

  }
  sudAdminListAccessDetails(id) {
    try {
      this.SpinnerService.show();

      this.classAccessFromDb = [];
      this.modifiedModulesList = [];
      this.model.module_details = [];


      //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
      this.baseService.getData('ei/edit-ei-subadmin-by-ei/' + id).subscribe(res => {

        let response: any = {};
        
        
      

        response = res;
        this.moduleList = response.data.module_detail;
        
        this.moduleList.forEach(element => {
          let objModel: any = {};
          if (element.sub_module_set.length > 0) {

            element.sub_module_set.forEach(subElement => {
              let objModel: any = {};
              subElement.count = element.sub_module_set.length
              subElement.parentmodule = element.module_name
              this.modifiedModulesList.push(subElement);
              this.model.module_details.push(subElement)
              if(subElement.is_access){
                objModel.module_code = subElement.module_code;
                this.module.module_details.push(objModel);
              }
              
            });

          } else {
            this.modifiedModulesList.push(element);
            this.model.module_details.push(element)
            if(element.is_access){
              objModel.module_code = element.module_code;
              this.module.module_details.push(objModel);
            }
            
          }

        });

      }, (error) => {
        this.SpinnerService.hide();
        // console.log(error);
        // this.alert.error(response.message[0], 'Error')
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
      // this.alert.error(err, 'Error')
    }
  }
  checkStatus(id, checkname) {

    if (checkname == 'standard') {
      var index = this.classAccessFromDb.findIndex(codes => codes.standard_id === id);
      // this.displayClassListModuleAccess(id);
    } else if (checkname == 'class') {
      var index = this.classAccessFromDb.findIndex(codes => codes.class_id === id);
      // this.getclassListArrayModuleAccess(id);
    } else if (checkname == 'course') {
      var index = this.classAccessFromDb.findIndex(codes => codes.course_id === id);
    }

    if (index == -1) {
      return false;
    } else {
      return true;
    }
  }


  submitPermissionWithClass() {


    try {
      this.SpinnerService.show();
      var id = this.userId;
      this.baseService.actionForPutMethod('ei/edit-ei-subadmin-by-ei/' + id + '/', this.module).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.alert.success('Success', response.message);
        } else {
          this.SpinnerService.hide();
          this.alert.error('Error', response.message);
        }
        //this.moduleList=response.results;


      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });


    } catch (e) {

    }
  }


  displayCourseListModuleAccess() {
    try {
      this.SpinnerService.show();

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
      // this.standardList = []
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
    console.log(this.modelCodeIndex);

    this.module.module_details[this.modelCodeIndex].class_id = this.classListArrayModuleAccess.join();
  }
  changeAddClass(isAccess){
    //console.log(isAccess);
    
    if(isAccess){
      this.displayCourseListModuleAccess() ;
    }else{
      this.module.module_details.forEach(element => {
        delete element.class_id;
      });
    }
  }
  /**Open Class Model Access */
  openClassModel(module_code) {

    console.log(this.module);
    
    const index = this.module.module_details.findIndex(codes => codes.module_code === module_code);
    if (index == -1) {
      this.alert.error('Please select respective module.', 'Error');
      return;
    }
    this.classListArrayModuleAccess = [];
    try {
      this.SpinnerService.show();
      this.classList = [];
      let moduleData: any = {};
      moduleData.subadmin_id = this.userId;
      moduleData.module_code = module_code;
      this.baseService.action('ei/get-class-by-modulecode/', moduleData).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        this.classAccessFromDb = response.data;
        let moduleDataFromDb: any = {};
        moduleDataFromDb.module_code = module_code;
        if (this.classAccessFromDb.length > 0) {
          this.classAccessFromDb.forEach(element => {
            this.isModuleAccessClass = true;
            this.classListModuleAccess = [];
            this.standardListModuleAccess = [];
            this.courseListModuleAccess = [];
            this.displayCourseListModuleAccess();
            this.displayStandardListModuleAccess(element.course_id);
            this.displayClassListModuleAccess(element.standard_id);
            this.classList.push(element.class_id);
            this.classListArrayModuleAccess.push(element.class_id);
          });
          moduleDataFromDb.class_id = this.classList.join();
        } else {
          this.isModuleAccessClass = false;
        }
        this.module.module_details.push(moduleDataFromDb);
        this.modelCodeIndex = this.module.module_details.findIndex(codes => codes.module_code === module_code);

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }

    $("#addClassModel").modal({
      backdrop: 'static',
      keyboard: false
    });
  }
  isAllSelected(event, code) {
    let objModel: any = {};
    if (event.checked) {
      const index = this.module.module_details.findIndex(codes => codes.module_code === code);


      if (index == -1) {
        objModel.module_code = code;
        this.module.module_details.push(objModel);


      } else {
        this.module.module_details.splice(index, 1);
      }

    } else {
      const index = this.module.module_details.findIndex(codes => codes.module_code === code);

      if (index != -1) {
        this.module.module_details.splice(index, 1);

      }
    }


  }
  goBack(): void{
    this.location.back()
  }
}
