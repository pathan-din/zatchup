import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

export interface subAdminManagementElement {
  selectCheck: string;
  'position': number;
  nameOfStudent : string;
  class : string;
  rollNumber : number;
  courseTitle: string;
  lectureTitle: string;
  byStudent: string;
  Action: string;

}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {
    selectCheck: '',
    'position': 1, 
    nameOfStudent: 'Prashant' , 
    class: 'B.A' ,
    rollNumber: 856572,  
    courseTitle: 'Science',
    lectureTitle: 'Lecture', 
    byStudent : '' ,
    Action: ''
}
];

@Component({
  selector: 'app-starclass-requests-pending',
  templateUrl: './starclass-requests-pending.component.html',
  styleUrls: ['./starclass-requests-pending.component.css']
})
export class StarclassRequestsPendingComponent implements OnInit {

  displayedColumns: string[] = ['selectCheck', 'position', 'nameOfStudent','class', 
  'rollNumber','courseTitle','lectureTitle', 'byStudent','Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(
    private router: Router,
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }

  goToCreateCourse(){
    this.router.navigate(['ei/star-class-course-add'])
  }

}
