import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface TotalAlumniListElement {

  'SNo': number;
  dateOfBuying : string;
  EiZatchUpId : string;
  nameOfEi : string;
  dateOfBExpiry: string;
  status : string;
  boughtType: string;
  grossAmount : number;
  netAmount : number;
  couponApplied: string;
  transActionId: string;
  viewInvoice: string;
  Action: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    dateOfBuying: '01 June 2020' , 
    EiZatchUpId: 'COURSE 8574', 
    nameOfEi : 'ABC EI', 
    dateOfBExpiry :'01 Dec 2020',
    status: 'Active',
    boughtType: 'Course Renewed By EI',
    grossAmount : 5000, 
    netAmount : 6000, 
    couponApplied: 'Buy1000', 
    transActionId: '',
    viewInvoice: 'View Invoice', 
    Action: ''
}
  
];

@Component({
  selector: 'app-admin-star-class-courses-bought-history',
  templateUrl: './admin-star-class-courses-bought-history.component.html',
  styleUrls: ['./admin-star-class-courses-bought-history.component.css']
})
export class AdminStarClassCoursesBoughtHistoryComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'dateOfBuying', 'EiZatchUpId', 'nameOfEi', 'dateOfBExpiry', 'status', 'boughtType',
  'grossAmount','netAmount','couponApplied','transActionId','viewInvoice','downloadInvoice'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
