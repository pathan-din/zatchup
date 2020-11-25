import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface LastLoginUser {

  'position': number;
  ZatchUpID : string;
  profilePic:string;
  Name : string;
  noOfEducationPro : string;
  noOfVerifiedUserPro : string;
  currentEI : string;
  lastEI : string;
  status: string;
  LastLoginDate: string;
  Action: string;

}

const ELEMENT_DATA: LastLoginUser[] = [
  {
    'position': 1, 
    ZatchUpID: 'ZATCHUP 5025' , 
    profilePic : 'assets/images/userWebsite/share-my-profile-icon.png', 
    Name: 'Wilma Mumcluya', 
    noOfEducationPro: '',
    noOfVerifiedUserPro : '', 
    currentEI : 'ABC EI', 
    lastEI: 'XYZ EI', 
    status: 'Active',
    LastLoginDate: '5 Days Ago', 
    Action: ''
}
  
];

@Component({
  selector: 'app-admin-user-last-login',
  templateUrl: './admin-user-last-login.component.html',
  styleUrls: ['./admin-user-last-login.component.css']
})
export class AdminUserLastLoginComponent implements OnInit {

  displayedColumns: string[] = ['position', 'ZatchUpID','profilePic','Name', 'noOfEducationPro', 
  'noOfVerifiedUserPro',
  'currentEI','lastEI','status','LastLoginDate','Action'];
  
  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }


  ngOnInit(): void {
  }

}
