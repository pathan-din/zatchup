import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface LastLoginUser {

  'position': number;
  Name : string;
  profilePic:string;
  ZatchUpID : string;
userType : string;
  currentEI : string;
  pastEI : string;

}

const ELEMENT_DATA: LastLoginUser[] = [
  {
    'position': 1, 
    Name: 'Wilma Mumcluya', 
    profilePic : 'assets/images/userWebsite/share-my-profile-icon.png', 
    ZatchUpID: 'ZATCHUP 5025' , 
    userType:'Student',
    currentEI : 'Adarsh Public School', 
    pastEI: '--', 
}
  
];

@Component({
  selector: 'app-admin-user-search',
  templateUrl: './admin-user-search.component.html',
  styleUrls: ['./admin-user-search.component.css']
})
export class AdminUserSearchComponent implements OnInit {

  displayedColumns: string[] = ['position','Name','profilePic','ZatchUpID','userType', 
  'currentEI','pastEI'];
  
  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
