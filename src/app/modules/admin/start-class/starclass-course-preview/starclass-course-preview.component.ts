import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
    lectureTitle: string;
    topicsCoverd: string;
    durationOfLecture: string;
    viewDetails: string;
    play: number;
  }
  
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {'position': 1,'lectureTitle':'Information Technology', 'topicsCoverd': 'Cover',
    'viewDetails': '', 'durationOfLecture': '2 Hours', 'play': 50} 
  ];

@Component({
  selector: 'app-starclass-course-preview',
  templateUrl: './starclass-course-preview.component.html',
  styleUrls: ['./starclass-course-preview.component.css']
})

export class StarclassCoursePreviewComponent implements OnInit {


  displayedColumns: string[] = ['position','lectureTitle', 'topicsCoverd','viewDetails',
  'durationOfLecture','play'];   

  dataSource = ELEMENT_DATA;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
