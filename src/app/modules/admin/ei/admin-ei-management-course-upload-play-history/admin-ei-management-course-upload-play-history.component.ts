import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  lectureTitle: string;
  playedBy: string;
  playTiming: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'lectureTitle':'Information Technology', 'playedBy': 'Admin','playTiming':'1:45PM - 2:30PM'}
];

@Component({
  selector: 'app-admin-ei-management-course-upload-play-history',
  templateUrl: './admin-ei-management-course-upload-play-history.component.html',
  styleUrls: ['./admin-ei-management-course-upload-play-history.component.css']
})
export class AdminEiManagementCourseUploadPlayHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position','lectureTitle', 'playedBy','playTiming'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
