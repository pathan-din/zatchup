import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-starclass-bought-view',
  templateUrl: './starclass-bought-view.component.html',
  styleUrls: ['./starclass-bought-view.component.css']
})
export class StarclassBoughtViewComponent implements OnInit {

  displayedColumns: string[] = ['position','lectureTitle', 'topicsCoverd','viewDetails',
  'durationOfLecture','play'];   

  dataSource = ELEMENT_DATA;
  constructor(
    private router: Router,
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  goToLectureView(){
    this.router.navigate(['admin/starclass-bought-lecture-view'])
  }

  goBack(){
    this.location.back()
  }
}
