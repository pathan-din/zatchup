import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface subAdminManagementElement {
  'SNo': number;
  moduleName: string;
  subModule : string;
  classesCourse: string;
  status : string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {'SNo': 1, moduleName: 'Module 1', subModule: 'Sub Module 1', classesCourse: 'Classes 1', 
  status: 'Pending', Action: 'Cancel Request'},
  {'SNo': 2, moduleName: 'Module 2', subModule: 'Sub Module 2', classesCourse: 'Classes 2', 
  status: 'Approve', Action: 'Cancel Request'}
];

@Component({
  selector: 'app-authorisations-history',
  templateUrl: './authorisations-history.component.html',
  styleUrls: ['./authorisations-history.component.css']
})
export class AuthorisationsHistoryComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'moduleName', 'subModule', 'classesCourse', 'status', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {}

}
