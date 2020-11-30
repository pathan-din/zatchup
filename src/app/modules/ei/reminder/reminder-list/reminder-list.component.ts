import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

export interface subAdminManagementElement {
  select: string;
  'SNo': number;
  nameOfStudents : string;
  class: string;
  rollNumber: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {select: '', 'SNo': 1, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 2, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 3, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 4, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 5, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 6, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 7, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 8, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 9, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'},
  {select: '', 'SNo': 10, nameOfStudents: 'Wilma Mumduya', class: '', rollNumber :'53541'}
];

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})

export class ReminderListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'SNo', 'nameOfStudents', 'class', 'rollNumber'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {}
}
