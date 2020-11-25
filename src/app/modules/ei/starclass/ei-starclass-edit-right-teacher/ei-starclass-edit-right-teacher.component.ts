import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';

export interface editRightTeacheristElement {

  'position': number;
  profilePic : string;
  nameOfTeacher : string;
  relationship : string;
  employeeID: string;

}

const ELEMENT_DATA: editRightTeacheristElement[] = [
  {
    'position': 1, 
    profilePic : 'assets/images/userWebsite/share-my-profile-icon.png',  
    nameOfTeacher: 'Wilma Mumuduya' ,
    relationship: 'Teacher',  
    employeeID: 'EMPLOYEE8543',
}
];

@Component({
  selector: 'app-ei-starclass-edit-right-teacher',
  templateUrl: './ei-starclass-edit-right-teacher.component.html',
  styleUrls: ['./ei-starclass-edit-right-teacher.component.css']
})
export class EiStarclassEditRightTeacherComponent implements OnInit {

  displayedColumns: string[] = ['select','position', 'profilePic','nameOfTeacher', 
  'relationship','employeeID'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  selection = new SelectionModel<editRightTeacheristElement>(true, []);
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(element => this.selection.select(element));
}

}
