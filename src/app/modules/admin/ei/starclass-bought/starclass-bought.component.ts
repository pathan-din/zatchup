import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface TotalAlumniListElement {
  'SNo': number;
  courseTitle : string;
  dateOfBuying: string;
  dateOfCourseExpiry: string;
  totalViewAllowed: string;
  numberOfLectures : string;
  numberOfViews: string;
  viewInvoice: string;
}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    courseTitle : 'Information Technology', 
    dateOfBuying: '05 May 2020', 
    dateOfCourseExpiry: '15 Dec 2020',
    totalViewAllowed :'500',
    numberOfLectures: '15',
    numberOfViews: '50',
    viewInvoice: 'View Invoice'
  }
  
];

@Component({
  selector: 'app-starclass-bought',
  templateUrl: './starclass-bought.component.html',
  styleUrls: ['./starclass-bought.component.css']
})
export class StarclassBoughtComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'courseTitle', 'dateOfBuying','dateOfCourseExpiry',
  'totalViewAllowed', 'numberOfLectures', 'numberOfViews', 'viewInvoice'];

 dataSource = ELEMENT_DATA;
 //columnsToDisplay: string[] = this.displayedColumns.slice();
 // dataSource: PeriodicElement[] = ELEMENT_DATA;
 
 constructor(private router: Router) { }

 ngOnInit(): void {
 }

}
