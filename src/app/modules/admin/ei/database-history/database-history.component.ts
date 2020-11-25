import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateAndTime: string;
  eiZatchupId: string;
  status: string;
  addedRemoved: string;
  employeeName: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'dateAndTime': '01 Jan, 2020 & 12:00 P.M', 'eiZatchupId' : 'ZATCHUP 8535', 'status':'Added',
  'addedRemoved': 'Admin', 'employeeName': 'Ankit (Employee 2255)'}
];
@Component({
  selector: 'app-database-history',
  templateUrl: './database-history.component.html',
  styleUrls: ['./database-history.component.css']
})
export class DatabaseHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'dateAndTime', 'eiZatchupId', 'status',
  'addedRemoved','employeeName'];   

 dataSource = ELEMENT_DATA;
 constructor(private router: Router) { }

 ngOnInit(): void {
 }

}
