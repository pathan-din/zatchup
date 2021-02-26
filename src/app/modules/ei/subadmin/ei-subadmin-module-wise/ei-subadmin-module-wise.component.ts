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


export interface subAdminManagementElement {

  'SNo': number;
  ZatchUpID : string;
  Name : string;
  EmailID: string;
  PhoneNumber: string;
  Designation: string;
  EmployeeID : string;
  ClassesList: string;
  Action: string;

}

const ELEMENT_DATA: subAdminManagementElement[] = [];

@Component({
  selector: 'app-ei-subadmin-module-wise',
  templateUrl: './ei-subadmin-module-wise.component.html',
  styleUrls: ['./ei-subadmin-module-wise.component.css']
})
export class EiSubadminModuleWiseComponent implements OnInit {
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
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  subAdminList: any = [];
   
  collection = { count: 60, data: [] };
  displayedColumns: string[] = ['SNo', 'ZatchUpID', 'EmployeeID',
  'Name', 'EmailID', 'PhoneNumber',
  'Designation', 'Action'];

  dataSource = ELEMENT_DATA;

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
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.getAllModuleList();
    this.sudAdminList('', '','');
  }
  redirectToDetailPage(id) {
    this.router.navigate(['ei/subadmin-details'], { queryParams: { id: id } });
  }
  sudAdminList(page, id,module_id) {
    console.log(module_id);
    
    try {
      this.SpinnerService.show();
      //base
      if (id) {
        this.model.user_id = id;
      }
      if(module_id){
        this.model.module_id = module_id;
      }
      
      //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
      this.baseService.getData('ei/subadmin-lists-by-ei/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();

        this.subAdminList = response.results;
        this.pageSize = response.page_size;
        this.model.page_size = this.pageSize
        this.totalNumberOfPage = response.count;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage
        let arrStudentList: any = [];
        if (!page) { page = 1 }
        var i = (this.pageSize * (page - 1)) + 1;
        this.subAdminList.forEach(objData => {
          let objStudentList: any = {};
          objStudentList.checked = '';
          objStudentList.SNo = i;
          objStudentList.ZatchUpID = objData.zatchup_id;
          objStudentList.EmployeeID = objData.employee_num;
          objStudentList.Name = objData.first_name + ' ' + objData.last_name;
          objStudentList.EmailID = objData.email;
          objStudentList.PhoneNumber = objData.phone;
          objStudentList.Designation = objData.designation;
          objStudentList.user_id = objData.user_id;

          objStudentList.Action = '';
          i = i + 1;
          arrStudentList.push(objStudentList);
        })

        this.dataSource = arrStudentList;
        if (response.status == false) {
          this.alert.error(response.error.message[0], 'Error')
        }
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
  goToEiSubadminDetailsPage(){
    this.router.navigate(['ei/subadmin-details']);
  }

  goToEiSubadminModuleAccessHistoryPage(){
    this.router.navigate(['ei/subadmin-access-history']);
  }

  goBack(): void{
    this.location.back()
  }
  
  getAllModuleList() {
    try {
      
      this.SpinnerService.show();

      this.baseService.getData('ei/get-master-modules/',this.model).subscribe(res => {
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
}
