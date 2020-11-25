import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface ReportPRofile {

  'position': number;
  DateOfReport: string;
  projectID: string;
  ReportedBy: Array<string>;
  ReportReason: string;
  ReportComments: string;
  ViewProject:string;
  ActionCheckbox: string;
  ResolutionComments: string;
  ResolutionAttachment: string;

}

const ELEMENT_DATA: ReportPRofile[] = [
  {
    'position': 1,
    DateOfReport: '10 June 2020',
    projectID:'PROJECT 5252',
    ReportedBy: [ "Ankit", "ZATCHUP 5252", "Alumni" ],
    ReportReason: '',
    ReportComments: '',
    ViewProject:'View',
    ActionCheckbox: '',
    ResolutionComments: '',
    ResolutionAttachment: '',
  }

];

@Component({
  selector: 'app-report-project-resolved',
  templateUrl: './report-project-resolved.component.html',
  styleUrls: ['./report-project-resolved.component.css']
})
export class ReportProjectResolvedComponent implements OnInit {

  displayedColumns: string[] = ['position', 'DateOfReport','projectID', 'ReportedBy', 'ReportReason',
  'ReportComments','ViewProject','ActionCheckbox', 'ResolutionComments', 'ResolutionAttachment'];

dataSource = ELEMENT_DATA;
//columnsToDisplay: string[] = this.displayedColumns.slice();
// dataSource: PeriodicElement[] = ELEMENT_DATA;

constructor(private router: Router) { }


  ngOnInit(): void {
  }

}
