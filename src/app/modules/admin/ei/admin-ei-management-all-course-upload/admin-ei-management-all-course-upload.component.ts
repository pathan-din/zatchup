import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  courseTitle: string;
  levelOfEducation: string;
  field: string;
  standard: string;
  subject: string;
  noOfLecture: string;
  action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'courseTitle':'Information Technology', 'levelOfEducation': 'UnderGrad',
  'field': '', 'standard': '','subject': '', 'noOfLecture' : '',action:""}
  
  
];

@Component({
  selector: 'app-admin-ei-management-all-course-upload',
  templateUrl: './admin-ei-management-all-course-upload.component.html',
  styleUrls: ['./admin-ei-management-all-course-upload.component.css']
})
export class AdminEiManagementAllCourseUploadComponent implements OnInit {

  displayedColumns: string[] = ['position','courseTitle', 'levelOfEducation','field', 'standard','subject', 'noOfLecture','action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
