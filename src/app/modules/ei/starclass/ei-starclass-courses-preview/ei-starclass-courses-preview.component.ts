import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

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
  selector: 'app-ei-starclass-courses-preview',
  templateUrl: './ei-starclass-courses-preview.component.html',
  styleUrls: ['./ei-starclass-courses-preview.component.css']
})
export class EiStarclassCoursesPreviewComponent implements OnInit {

  displayedColumns: string[] = ['position','lectureTitle', 'topicsCoverd','viewDetails','durationOfLecture','uploadedBy', 'uploadDate','deleteLecture','play'];   

  dataSource = ELEMENT_DATA;
  constructor(
    private router: Router,
    private location: Location
    ) { }


  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
