import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  addingDate: string;
  schoolName: string;
  state: string;
  city: string;
  address: string;
  board: string;
  noOfStudent: string;
  status: string;
  zatchUpID: string;
  viewEI: string;
  action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,addingDate : '20 Jan 2020','schoolName':'Adarsh Public School',  'state': 'Delhi',
  'city': 'Delhi','address': 'H-147, Noida Sector-63, U.p-201010', 'board': 'ABC University','noOfStudent':'5000',
  'status': '','zatchUpID': 'ZAT 2035', 'viewEI': 'COUPON 500',action:"View Invoice"}
  
  
];
@Component({
  selector: 'app-admin-ei-reject-details',
  templateUrl: './admin-ei-reject-details.component.html',
  styleUrls: ['./admin-ei-reject-details.component.css']
})
export class AdminEiRejectDetailsComponent implements OnInit {

  displayedColumns: string[] = ['position','addingDate','schoolName', 'state','city','address',  'board','noOfStudent','status',
  'zatchUpID','viewEI','action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
