import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ei-starclass-course-add',
  templateUrl: './ei-starclass-course-add.component.html',
  styleUrls: ['./ei-starclass-course-add.component.css']
})
export class EiStarclassCourseAddComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
