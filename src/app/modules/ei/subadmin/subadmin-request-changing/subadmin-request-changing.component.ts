import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface subAdminManagementElement {
  'SNo': number;
  Name : string;  
  profilePicture: string;
  dateOfBirth : string;
  gender: string;
  employeelID: string;
  fieldOfChange: string;
  newDetails: string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {'SNo': 1, Name: 'Wimla Mumduya', profilePicture :'', dateOfBirth: '25 Aug 1995', gender: 'Male', 
  employeelID: 'EMPLO 5235', fieldOfChange: ' ', newDetails: ' ', Action: ''}
];

@Component({
  selector: 'app-subadmin-request-changing',
  templateUrl: './subadmin-request-changing.component.html',
  styleUrls: ['./subadmin-request-changing.component.css']
})
export class SubadminRequestChangingComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'Name', 'profilePicture', 'dateOfBirth', 'gender', 'employeelID',
  'fieldOfChange', 'newDetails', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  generateExcel(){}

}

