import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  lectureTitle: string;
  topicsCoverd: string;
  durationOfLecture: string;
  uploadedBy: string;
  uploadDate: string;
  viewDetails: string;
  deleteLecture:string;
  play: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'lectureTitle':'Information Technology', 'topicsCoverd': 'Cover','viewDetails': '',
  'durationOfLecture': '2 Hours','uploadedBy':'Admin','uploadDate': '05 May 2020','deleteLecture':'delete', 'play': 50}
  
  
];


@Component({
  selector: 'app-admin-ei-management-course-preview',
  templateUrl: './admin-ei-management-course-preview.component.html',
  styleUrls: ['./admin-ei-management-course-preview.component.css']
})
export class AdminEiManagementCoursePreviewComponent implements OnInit {

  displayedColumns: string[] = ['position','lectureTitle', 'topicsCoverd','viewDetails','durationOfLecture','uploadedBy', 'uploadDate','deleteLecture','play'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
