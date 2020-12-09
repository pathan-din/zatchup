import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface subAdminManagementElement {

  'SNo': number;
  date: string
  ZatchUpID : string;
  Name : string;
  EmailID_phone: string;
  Designation: string;
  EmployeeID : string;
  status: Array<string>;
  Action: string;

}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {
    'SNo': 1, 
    date: '29 feb 2020',
    ZatchUpID: 'ZATCHUP 5025' , 
    Name: '--',  
    EmailID_phone: 'admin@gmailcom', 
    Designation :'Sub Admin',
    EmployeeID: 'EMPLOYE 2534' ,
    status: ["Sent for approval", "Sent for Sign-Up", "Rejected by User"],
    Action: ''
}
// ,{
//   'SNo': 2, 
//   date: '29 feb 2020',
//   ZatchUpID: '--' , 
//   Name: 'Mumduya',  
//   EmailID_phone: 'admin@gmailcom', 
//   Designation :'Sub Admin',
//   EmployeeID: 'EMPLOYE 2534' ,
//   status:'Sent for Sign-Up',
//   Action: ''
// },
// {
//   'SNo': 3, 
//   date: '29 feb 2020',
//   ZatchUpID: '--' , 
//   Name: 'Wilma',  
//   EmailID_phone: 'admin@gmailcom', 
//   Designation :'Sub Admin',
//   EmployeeID: 'EMPLOYE 2534' ,
//   status:'Rejected by User',
//   Action: ''
// }
  
];
@Component({
  selector: 'app-ei-subadmin-view-status',
  templateUrl: './ei-subadmin-view-status.component.html',
  styleUrls: ['./ei-subadmin-view-status.component.css']
})
export class EiSubadminViewStatusComponent implements OnInit {

  displayedColumns: string[] = ['SNo','date', 'ZatchUpID', 'Name','EmailID_phone', 'Designation','EmployeeID',
  'status', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router,
    private location: Location) { }


  ngOnInit(): void {
  }

  goBack(): void{
    this.location.back()
  }
}
