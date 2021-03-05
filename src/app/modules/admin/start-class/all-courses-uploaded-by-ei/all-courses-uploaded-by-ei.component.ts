import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfBuying: string;
  courseId: string;
  titleOfCourse: string;
  levelOfEducation: string;
  field: string;
  standard: string;
  subject: string;
  numberOfLectureInTheCourse: string;
  totalNumberOfTimesCourseBought: string;
  totalActivePlans: string;
  totalViewsOnCourse: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'dateOfBuying': '01 June 2020', 'courseId': 'COURSE8567', 'titleOfCourse': 'Income Tax', 
  'levelOfEducation': 'B.Com','field': '', 'standard' : 'B.Com', 'subject': 'Accontant', 'numberOfLectureInTheCourse': '5 Lectures', 
  'totalNumberOfTimesCourseBought': '2 Times', 'totalActivePlans': '', 'totalViewsOnCourse': '50', 'action': ''}
];

@Component({
  selector: 'app-all-courses-uploaded-by-ei',
  templateUrl: './all-courses-uploaded-by-ei.component.html',
  styleUrls: ['./all-courses-uploaded-by-ei.component.css']
})
export class AllCoursesUploadedByEiComponent implements OnInit {

  displayedColumns: string[] = ['position','dateOfBuying', 'courseId','titleOfCourse', 'levelOfEducation',
  'field', 'standard','subject','numberOfLectureInTheCourse','totalNumberOfTimesCourseBought','totalActivePlans',
  'totalViewsOnCourse', 'action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {}

}
