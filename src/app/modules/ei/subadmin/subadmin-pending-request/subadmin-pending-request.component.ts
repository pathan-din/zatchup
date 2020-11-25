import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface subAdminManagementElement {
  'SNo': number;
  Name : string;
  zatchUpID: string;
  profilePicture: string;
  dateOfBirth : string;
  emailId: string;
  phoneNumber: string;
  employeelID: string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {'SNo': 1, Name: 'Wimla Mumduya', 'zatchUpID': 'ZATCHUP 5025', profilePicture :'', 
  dateOfBirth: '25 Aug 1995', emailId: 'admin@gmail.com', phoneNumber: '+91 9876543210', 
  employeelID: 'EMPLO 5235', Action: ''}
];

@Component({
  selector: 'app-subadmin-pending-request',
  templateUrl: './subadmin-pending-request.component.html',
  styleUrls: ['./subadmin-pending-request.component.css']
})
export class SubadminPendingRequestComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'Name', 'zatchUpID', 'profilePicture', 'dateOfBirth', 'emailId',
  'phoneNumber', 'employeelID', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  generateExcel(){}

}
