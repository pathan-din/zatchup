import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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

const ELEMENT_DATA: subAdminManagementElement[] = [
  {
    'SNo': 1, 
    ZatchUpID: 'ZATCHUP 5025' , 
    Name: 'Wilma Mumcluya',  
    EmailID: 'admin@gmailcom',
    PhoneNumber: '+919876543210', 
    Designation :'Sub Admin',
    EmployeeID: 'EMPLOYE 2534' ,
    ClassesList: '',
    Action: ''
}
  
];

@Component({
  selector: 'app-ei-subadmin-module-wise',
  templateUrl: './ei-subadmin-module-wise.component.html',
  styleUrls: ['./ei-subadmin-module-wise.component.css']
})
export class EiSubadminModuleWiseComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'ZatchUpID','Name',
  'EmailID','PhoneNumber','Designation',
  'EmployeeID','ClassesList','Action'];

  dataSource = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEiSubadminDetailsPage(){
    this.router.navigate(['ei/subadmin-details']);
  }

  goToEiSubadminModuleAccessHistoryPage(){
    this.router.navigate(['ei/subadmin-module-access-history']);
  }

}
