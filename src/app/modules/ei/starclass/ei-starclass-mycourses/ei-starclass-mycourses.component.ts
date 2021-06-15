import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'


@Component({
  selector: 'app-ei-starclass-mycourses',
  templateUrl: './ei-starclass-mycourses.component.html',
  styleUrls: ['./ei-starclass-mycourses.component.css']
})
export class EiStarclassMycoursesComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goToCoursesUploadedByEi(){
    this.router.navigate(['ei/star-class-courses-uploaded-by-ei'])
  }

  goToZatchupStarclass(){
    this.router.navigate(['ei/zatchup-starclass-courses'])
  }
  
  goBack(){
    this.location.back()
  }
}
