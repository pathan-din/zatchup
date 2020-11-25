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
  numberOfLectures: string;
  totalNumerOfTimesCourseBought: string;
  TotalActivePlans: string;
  totalViewsOncourse: number;
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
    numberOfLectures: '5 Lectures',
    totalNumerOfTimesCourseBought: '2 Times', 
    TotalActivePlans :'',
    totalViewsOncourse: 50,
    Action: ''
}
  
];

@Component({
  selector: 'app-admin-star-class-course-uploaded-by-ei',
  templateUrl: './admin-star-class-course-uploaded-by-ei.component.html',
  styleUrls: ['./admin-star-class-course-uploaded-by-ei.component.css']
})
export class AdminStarClassCourseUploadedByEiComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'dateOfBuying','courseID', 'titleOfCourse', 'levelofEducation',
  'Field','Standard','Subject','numberOfLectures','totalNumerOfTimesCourseBought',
  'TotalActivePlans', 'totalViewsOncourse', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
