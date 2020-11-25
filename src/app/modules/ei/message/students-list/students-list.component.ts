import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  selectCheckbox: string;
  position: number;
  profilePick: string;
  nameOfStudents: string;
  relationship: string;
  classDetails: Array<string>;
  classAlias: string;
  rollNumber: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'selectCheckbox':'','position': 1,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Student', 'classDetails': ['B.Com', 'First Year', 'A'], 'classAlias':'A',
   'rollNumber': 53541},
   {'selectCheckbox':'','position': 2,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Student', 'classDetails': ['BA', 'Second Year', 'A'], 'classAlias':'A',
   'rollNumber': 78555},
   {'selectCheckbox':'','position': 3,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Student', 'classDetails': ['MCA', 'Third Year', 'A'], 'classAlias':'A',
   'rollNumber': 13972},
   {'selectCheckbox':'','position': 4,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Student', 'classDetails': ['BCA', 'First Year', 'A'], 'classAlias':'A',
   'rollNumber': 53541},
   {'selectCheckbox':'','position': 5,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
  'relationship': 'Student', 'classDetails': ['B.Com', 'First Year', 'A'], 'classAlias':'A',
   'rollNumber': 17582},
];

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  displayedColumns: string[] = ['selectCheckbox', 'position', 'profilePick', 'nameOfStudents', 
  'relationship', 'classDetails','classAlias', 'rollNumber'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
