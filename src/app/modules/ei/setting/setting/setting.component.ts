import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface subAdminManagementElement {
  'SNo': number;
  fieldChange: string;
  oldDetails : string;
  newDetails: string;
  viewAttachments: string;
  status : string;
  remarks: string;
  Action: string;
}

const ELEMENT_DATA: subAdminManagementElement[] = [
  {'SNo': 1, fieldChange: 'Name', oldDetails: 'Name 1', newDetails: 'Name 2', 
  viewAttachments :'', status: 'Accepted', remarks: '',  Action: ''}
];

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'fieldChange', 'oldDetails', 'newDetails', 
  'viewAttachments', 'status', 'remarks', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void {}

}
