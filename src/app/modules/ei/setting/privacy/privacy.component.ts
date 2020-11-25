import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface subAdminManagementElement {
  'SNo': number;
  name: string;
  zatchupId : string;
  phone: string;
  emailId: string;
  blockedBy : string;
  status: string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {'SNo': 1, name: 'Lauren Molive', zatchupId: 'ZATCH 8536', phone: '+91 9876543210', 
  emailId :'lauren@gmail.com', blockedBy: 'Admin', status: 'Block',  Action: ''}
];

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'name', 'zatchupId', 'phone', 'emailId', 'blockedBy', 'status', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  task: Task = {
    name: 'Only main Admin and Teachers',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

}
