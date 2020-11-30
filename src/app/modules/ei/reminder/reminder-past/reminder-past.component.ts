import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

export interface subAdminManagementElement {
  SNo: number;
  reminder : string;
  time: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {SNo: 1, reminder: '', time: '10 min ago'},
  {SNo: 2, reminder: '', time: '17 min ago'},
  {SNo: 3, reminder: '', time: '23 min ago'},
  {SNo: 4, reminder: '', time: '25 min ago'}
];

@Component({
  selector: 'app-reminder-past',
  templateUrl: './reminder-past.component.html',
  styleUrls: ['./reminder-past.component.css']
})
export class ReminderPastComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'reminder', 'time'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {}

}
