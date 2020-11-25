import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface TotalAlumniListElement {

  'SNo': number;
  dateOfBuying : string;
  courseID : string;
  titleOfCourse : string;
  levelofEducation : string;
  Field : string;
  Standard : string;
  Subject: string;
  buyingEiZatchUpId: string;
  buyingEiName: string;
  dateOfBExpiry: string;
  Action: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    dateOfBuying: '01 June 2020' , 
    courseID: 'COURSE 2567', 
    titleOfCourse : 'Income Tax', 
    levelofEducation: 'B.Com',
    Field : '', 
    Standard : 'B.Com', 
    Subject: 'Accountant', 
    buyingEiZatchUpId: 'ZATCHUP 8574',
    buyingEiName: '', 
    dateOfBExpiry :'01 Dec 2020',
    Action: ''
}
  
];

@Component({
  selector: 'app-admin-star-class-courses-bought',
  templateUrl: './admin-star-class-courses-bought.component.html',
  styleUrls: ['./admin-star-class-courses-bought.component.css']
})
export class AdminStarClassCoursesBoughtComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'dateOfBuying','courseID', 'titleOfCourse', 'levelofEducation',
  'Field','Standard','Subject','buyingEiZatchUpId','buyingEiName',
  'dateOfBExpiry', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
