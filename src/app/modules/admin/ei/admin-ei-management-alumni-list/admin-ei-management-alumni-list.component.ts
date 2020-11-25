import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface TotalAlumniListElement {

  'SNo': number;
  ZatchUpID : string;
  Name : string;
  Gender : string;
  Age : number;
  Profession : string;
  Tenure : string;
  Duration: string;
  LastClassTaken: string;
  VerificationStatusByEI: string;
  EKYCVerificationStatus: string;
  Action: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    ZatchUpID: 'ZATCHUP 5025' , 
    Name: 'Wilma Mumcluya', 
    Gender : 'Male', 
    Age: 19,
    Profession : 'Software Engineer', 
    Tenure : '2017-18', 
    Duration: '3 Year', 
    LastClassTaken: 'B.com 2A',
    VerificationStatusByEI: 'verified', 
    EKYCVerificationStatus :'complete',
    Action: ''
}
  
];
@Component({
  selector: 'app-admin-ei-management-alumni-list',
  templateUrl: './admin-ei-management-alumni-list.component.html',
  styleUrls: ['./admin-ei-management-alumni-list.component.css']
})
export class AdminEiManagementAlumniListComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'ZatchUpID','Name', 'Gender', 'Age',
  'Profession','Tenure','Duration','LastClassTaken','VerificationStatusByEI',
  'EKYCVerificationStatus','Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
