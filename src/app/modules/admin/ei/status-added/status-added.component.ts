import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfAdding: string;
  eiZatchupId: string;
  nameOfTheschool: string;
  state: string;
  city: string;
  address: string;
  boardUniversity: string;
  approximateNumber: string;
  addedToDatabase: string;
  status: string;
  dateOfOnboarding: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'dateOfAdding': '01 Jan, 2020', 'eiZatchupId' : 'ZATCHUP 8535', 
  'nameOfTheschool':'Adarsh Public School', 'state': 'Delhi', 'city': 'Delhi', 
  'address': 'H-147, Noida Sector-63, U,P-201301', 'boardUniversity': 'ABC University', 
  'approximateNumber': '50', 'addedToDatabase' : 'Bulk', 'status': 'Onboarded', 
  'dateOfOnboarding': '20 March, 2015', 'action': ''},
  {'position': 2, 'dateOfAdding': '06 Jan, 2020', 'eiZatchupId' : 'ZATCHUP 8535', 
  'nameOfTheschool':'Adarsh Public School', 'state': 'Delhi', 'city': 'Delhi', 
  'address': 'H-147, Noida Sector-63, U,P-201301', 'boardUniversity': 'ABC University', 
  'approximateNumber': '50', 'addedToDatabase' : 'Bulk', 'status': 'Onboarded', 
  'dateOfOnboarding': '20 March, 2015', 'action': ''},
  {'position': 3, 'dateOfAdding': '14 Jan, 2020', 'eiZatchupId' : 'ZATCHUP 8535', 
  'nameOfTheschool':'Adarsh Public School', 'state': 'Delhi', 'city': 'Delhi', 
  'address': 'H-147, Noida Sector-63, U,P-201301', 'boardUniversity': 'ABC University', 
  'approximateNumber': '50', 'addedToDatabase' : 'Bulk', 'status': 'Onboarded', 
  'dateOfOnboarding': '20 March, 2015', 'action': ''}
];

@Component({
  selector: 'app-status-added',
  templateUrl: './status-added.component.html',
  styleUrls: ['./status-added.component.css']
})

export class StatusAddedComponent implements OnInit {

  displayedColumns: string[] = ['position', 'dateOfAdding', 'eiZatchupId', 'nameOfTheschool', 
   'state','city', 'address', 'boardUniversity', 'approximateNumber', 'addedToDatabase',
   'status', 'dateOfOnboarding', 'action'];   

 dataSource = ELEMENT_DATA;
 constructor(private router: Router) { }

 ngOnInit(): void {
 }

}
