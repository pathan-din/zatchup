import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  fromDate: string;
  toDate: string;
  employeeId: string;
  name: string;
  mobileNumber: string;
  emailAddress: string;
  addedByEmployeeId: string;
  addedByemployeeName: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'fromDate':'01 Jan 2020', 'toDate': '01 Dec 2020', 'employeeId': 'Employee 5052',
  'name': 'Ankit', 'mobileNumber':'91+ 9876543210','emailAddress': 'ankit@gmail.com',
  'addedByEmployeeId': 'Employee 5252', 'addedByemployeeName' : 'Prashant'}
];

@Component({
  selector: 'app-current-poc',
  templateUrl: './current-poc.component.html',
  styleUrls: ['./current-poc.component.css']
})

export class CurrentPocComponent implements OnInit {

  displayedColumns: string[] = ['position','fromDate','toDate','employeeId','name','mobileNumber',
  'emailAddress','addedByEmployeeId', 'addedByemployeeName'];

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
