import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  zatchupId: string;
  name: string;
  addmissionIdNumber: string;
  gender: string;
  age: string;
  classAlias: string;
  rollNumber: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1, 
    zatchupId: 'ZATCHUP 5025', 
    name: 'Wilma Mumduya', 
    addmissionIdNumber: 'ZAT 53541',
    gender: 'Male',    
    age: '19',
    classAlias : 'B.Com',
    rollNumber: '458632458',
    action: ''
  }

];
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'zatchupId', 'name', 'addmissionIdNumber','gender', 
  'age', 'classAlias', 'rollNumber', 'action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
