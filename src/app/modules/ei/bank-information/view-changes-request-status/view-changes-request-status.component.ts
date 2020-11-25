import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  fieldChange: string;
  oldDetails: string;
  newDetails: string;
  viewAttachments: string;
  status: string;
  remarks: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'fieldChange' : 'Name', 'oldDetails':'Name 1', 'newDetails': 'Name 2', 
  'viewAttachments':'','status':'Accepted', 'remarks':'', 'action':''}
];

@Component({
  selector: 'app-view-changes-request-status',
  templateUrl: './view-changes-request-status.component.html',
  styleUrls: ['./view-changes-request-status.component.css']
})
export class ViewChangesRequestStatusComponent implements OnInit {

  displayedColumns: string[] = ['position', 'fieldChange', 'oldDetails', 'newDetails',
  'viewAttachments','status', 'remarks','action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

} 
