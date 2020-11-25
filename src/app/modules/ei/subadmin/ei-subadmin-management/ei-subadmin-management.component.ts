import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';


export interface subAdminManagementElement {

  'SNo': number;
  ZatchUpID : string;
  EmployeeID : string;
  Name : string;
  EmailID: string;
  PhoneNumber: string;
  Designation: string;
  Action: string;

}

const ELEMENT_DATA: subAdminManagementElement[] = [];

@Component({
  selector: 'app-ei-subadmin-management',
  templateUrl: './ei-subadmin-management.component.html',
  styleUrls: ['./ei-subadmin-management.component.css']
})

export class EiSubadminManagementComponent implements OnInit {
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  subAdminList:any=[];
  model:any=[];
  collection = { count: 60, data: [] };
  displayedColumns: string[] = ['SNo', 'ZatchUpID','EmployeeID', 
  'Name','EmailID','PhoneNumber',
  'Designation','Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor( private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService, 
    public eiService: EiServiceService, 
    public base: BaseService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.sudAdminList('','');
  }
  sudAdminList(page,id){
    try {
      this.SpinnerService.show();
    //base
      if(id){
        this.model.user_id = id;
      }

    //this.eiService.getGetVerifiedStudent(page,strFilter).subscribe(res => {
    this.base.getData('ei/subadmin-lists-by-ei/',this.model).subscribe(res => {

      let response: any = {};
      response = res;
      this.SpinnerService.hide();

      this.subAdminList = response.results;
      this.pageSize = response.page_size;
      this.model.page_size=this.pageSize
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
      if (response.status == false)
      {
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
  
  goToEiSubadminModuleWisePage(){
    this.router.navigate(['ei/subadmin-module-wise']);
  }
  redirectToDetailPage(id){
    this.router.navigate(['ei/subadmin-details'],{queryParams:{id:id}});
  }
  goToEiSubadminAccessHistoryPage(){
    this.router.navigate(['ei/subadmin-accessHistory']);
  }

  goToEiSubadminAccessPage(){
    this.router.navigate(['ei/subadmin-add']);
  }

  goToEiSubadminViewStatusPage(){
    this.router.navigate(['ei/subadmin-view-status']);
  }
}
