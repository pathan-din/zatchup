import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  chekbox: string;
  position: number;
  zatchUpID: string;
  schoolName: string;
  state: string;
  city: string;
  board: string;
  studentZatchup: string;
  totalAlumnizatchup: string;
  commission: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'chekbox': '','position': 1, 'zatchUpID' : 'ZATCHUP 5475', 'schoolName':'Adarsh Public School', 
  'state': 'Delhi', 'city': 'Delhi', 'board': 'ABC University', 'studentZatchup': '1,000',
  'totalAlumnizatchup': '1,500', 'commission': '10%'}
];

@Component({
  selector: 'app-management-commission-list',
  templateUrl: './management-commission-list.component.html',
  styleUrls: ['./management-commission-list.component.css']
})
export class ManagementCommissionListComponent implements OnInit {

  displayedColumns: string[] = ['chekbox', 'position', 'zatchUpID', 'schoolName', 'state','city',  'board',
  'studentZatchup', 'totalAlumnizatchup','commission'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
