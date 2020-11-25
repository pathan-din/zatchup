import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  newcommission: string;
  zatchUpID: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'newcommission':'10%', zatchUpID : 'ZATCHUP 85364'},
  {'position': 2,'newcommission':' ', zatchUpID : ' '}
];



@Component({
  selector: 'app-management-commission-add',
  templateUrl: './management-commission-add.component.html',
  styleUrls: ['./management-commission-add.component.css']
})
export class ManagementCommissionAddComponent implements OnInit {

  displayedColumns: string[] = ['position','zatchUpID','newcommission'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
