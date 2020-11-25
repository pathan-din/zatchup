import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';

export interface editRightTeacheristElement {

  'position': number;
  profilePic : string;
  nameOfStudent : string;
  relationship : string;
  classDetails: string;
  class : string;
  rollNo: number;

}

const ELEMENT_DATA: editRightTeacheristElement[] = [
  {
    'position': 1, 
    profilePic : 'assets/images/userWebsite/share-my-profile-icon.png',  
    nameOfStudent: 'Wilma Mumuduya' ,
    relationship: 'Student',  
    classDetails: 'EMPLOYEE8543',
    class : 'A',
  rollNo: 53541,
}
];

@Component({
  selector: 'app-ei-starclass-audience-student-list',
  templateUrl: './ei-starclass-audience-student-list.component.html',
  styleUrls: ['./ei-starclass-audience-student-list.component.css']
})
export class EiStarclassAudienceStudentListComponent implements OnInit {

  displayedColumns: string[] = ['select','position', 'profilePic','nameOfStudent', 
  'relationship','classDetails','class','rollNo'];

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
