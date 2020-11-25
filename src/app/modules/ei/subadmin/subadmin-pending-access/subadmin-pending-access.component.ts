import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface subAdminManagementElement {
  'SNo': number;
  zatchUpID: string;
  Name : string;
  employeelID: string;
  Designation: string;
  Module : string;
  subModule: string;
  class: string;
  remarks: string;
  viewSubAdmin: string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {'SNo': 1, 'zatchUpID': 'ZATCHUP 5025', Name: 'Wimla Mumduya', employeelID: 'EMPLO 5235', 
  Designation :'Sub Admin', Module: 'Alumni Management', subModule: 'View, Delete', class: 'B.Com, M.Com',
  remarks: '', viewSubAdmin: '', Action: ''}
];

@Component({
  selector: 'app-subadmin-pending-access',
  templateUrl: './subadmin-pending-access.component.html',
  styleUrls: ['./subadmin-pending-access.component.css']
})
export class SubadminPendingAccessComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'zatchUpID', 'Name', 'employeelID', 'Designation', 'Module', 'class',
  'remarks', 'viewSubAdmin', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  generateExcel(){}

}
