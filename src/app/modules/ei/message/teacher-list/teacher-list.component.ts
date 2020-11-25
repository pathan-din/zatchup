import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  selectCheckbox: string;
  position: number;
  profilePick: string;
  nameOfStudents: string;
  relationship: string;
  rollNumber: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
   {'selectCheckbox':'','position': 1,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 8543'},
   {'selectCheckbox':'','position': 2,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 8545'},
   {'selectCheckbox':'','position': 3,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 3578'},
   {'selectCheckbox':'','position': 4,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 3755'},
   {'selectCheckbox':'','position': 5,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 3568'},
];

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  displayedColumns: string[] = ['selectCheckbox', 'position', 'profilePick', 'nameOfStudents', 
  'relationship', 'rollNumber'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
