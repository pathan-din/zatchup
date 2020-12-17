import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface TotalAlumniListElement {
  'SNo': number;
  dateOfViewing : string;
  IDofUser : string;
  nameOfUser : string;
  age : string;
  locationOfViewing : string;
  profession : string;
}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {'SNo': 1,  dateOfViewing: '10 June 2020' , IDofUser: 'ZATCHUP 5874', nameOfUser: 'Ankit Patel', 
    age: '24', locationOfViewing : 'Delhi', profession : 'Education'}
];

@Component({
  selector: 'app-advertisements-active-audience',
  templateUrl: './advertisements-active-audience.component.html',
  styleUrls: ['./advertisements-active-audience.component.css']
})
export class AdvertisementsActiveAudienceComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'dateOfViewing','IDofUser', 'nameOfUser', 'age',
  'locationOfViewing','profession'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {}

}
