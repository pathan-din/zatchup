import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  nameOfTheschool: string;
  state: string;
  city: string;
  boardUniversity: string;
  address: string;
  zatchupId: string;
  addedBy: string;
  messages: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'nameOfTheschool':'Adarsh Public School', 
  'state': 'Delhi', 'city': 'Delhi', 'boardUniversity': 'ABC University', 
  'address': 'H-147, Noida sec-63, U.P-201301', 'zatchupId' : 'ZATCHUP 3265', 
  'addedBy': 'Students', 'messages': ' ', 'action': ''}
];

@Component({
  selector: 'app-added-by-user-not-zatchup',
  templateUrl: './added-by-user-not-zatchup.component.html',
  styleUrls: ['./added-by-user-not-zatchup.component.css']
})
export class AddedByUserNotZatchupComponent implements OnInit {

  displayedColumns: string[] = ['position', 'nameOfTheschool', 
  'state','city', 'boardUniversity', 'address', 'zatchupId', 'addedBy', 'messages', 'action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
