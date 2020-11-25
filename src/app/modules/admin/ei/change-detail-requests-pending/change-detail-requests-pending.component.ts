import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  eiZatchupId: string;
  nameOfTheschool: string;
  dateAndTime: string;
  state: string;
  city: string;
  boardUniversity: string;
  fieldOfChange: string;
  oldData: string;
  newData: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'eiZatchupId' : 'ZATCHUP 8535', 
  'nameOfTheschool':'Adarsh Public School', 'dateAndTime': '20 June, 2020 & 12:00 P.M ', 
  'state': 'Delhi', 'city': 'Delhi', 'boardUniversity': 'ABC University', 
  'fieldOfChange': 'Admin Phone Number', 'oldData' : '+91 8585746325', 
  'newData': '+91 9876543210', 'action': ''}
];

@Component({
  selector: 'app-change-detail-requests-pending',
  templateUrl: './change-detail-requests-pending.component.html',
  styleUrls: ['./change-detail-requests-pending.component.css']
})
export class ChangeDetailRequestsPendingComponent implements OnInit {

  displayedColumns: string[] = ['position', 'eiZatchupId', 'nameOfTheschool', 'dateAndTime',
  'state','city', 'boardUniversity', 'fieldOfChange', 'oldData', 'newData', 'action'];   

dataSource = ELEMENT_DATA;
constructor(private router: Router) { }

ngOnInit(): void {
}

}
