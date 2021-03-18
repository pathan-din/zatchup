import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  model: any
  errorDisplay: any

  constructor() { }

  ngOnInit(): void {
  }

}
