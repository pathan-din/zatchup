import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  lectureTitle: string;
  topicsCoverd: string;
  durationOfLecture: string;
  uploadDate: string;
  viewDetails: string;
  play: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'lectureTitle':'Information Technology', 'topicsCoverd': 'Cover',
  'durationOfLecture': '2 Hours', 'uploadDate': 'Admin','viewDetails': '', 'play': 50}
  
  
];
@Component({
  selector: 'app-starclass-courses-details-view',
  templateUrl: './starclass-courses-details-view.component.html',
  styleUrls: ['./starclass-courses-details-view.component.css']
})
export class StarclassCoursesDetailsViewComponent implements OnInit {

  displayedColumns: string[] = ['position','lectureTitle', 'topicsCoverd','durationOfLecture', 'uploadDate', 'viewDetails', 'play'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
