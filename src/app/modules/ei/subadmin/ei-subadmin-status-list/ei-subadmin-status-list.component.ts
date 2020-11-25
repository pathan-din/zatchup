import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface subAdminManagementElement {
  'SNo': number;
  Name : string;
  emailID: string;
  phoneNumber : string;
  Designation: string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {'SNo': 1, Name: 'Wimla Mumduya', emailID: 'admin@gmail.com' , phoneNumber: '+91 9876543210',
  Designation :'Sub Admin',Action: ''}
  
];
@Component({
  selector: 'app-ei-subadmin-status-list',
  templateUrl: './ei-subadmin-status-list.component.html',
  styleUrls: ['./ei-subadmin-status-list.component.css']
})
export class EiSubadminStatusListComponent implements OnInit {

  displayedColumns: string[] = ['SNo','Name', 'emailID', 'phoneNumber', 'Designation', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  generateExcel(){}

}
