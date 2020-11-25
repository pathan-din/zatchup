import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface subAdminManagementElement {

  'position': number;
  courseName : string;
  levelOfEducation : string;
  field : string;
  noOfStandards: string;
  subject: string;
  noOfCourse: string;
  Action: string;

}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {
    'position': 1, 
    courseName: 'Information technology' , 
    levelOfEducation: 'Undergrad' ,
    field: '',  
    noOfStandards: '',
    subject: '', 
    noOfCourse : '' ,
    Action: ''
}
];

@Component({
  selector: 'app-ei-starclass-courses-uploaded-by-ei',
  templateUrl: './ei-starclass-courses-uploaded-by-ei.component.html',
  styleUrls: ['./ei-starclass-courses-uploaded-by-ei.component.css']
})
export class EiStarclassCoursesUploadedByEiComponent implements OnInit {

  displayedColumns: string[] = ['position', 'courseName','levelOfEducation', 
  'field','noOfStandards','subject',
  'noOfCourse','Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
