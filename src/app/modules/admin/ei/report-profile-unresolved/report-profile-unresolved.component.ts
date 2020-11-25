import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface ReportPRofile {

  'position': number;
  DateOfReport: string;
  ReportedBy: Array<string>;
  ReportReason: string;
  ReportComments: string;
  ActionOne: string;
  ActionTwo: string;
  MarkResolved: string;

}

const ELEMENT_DATA: ReportPRofile[] = [
  {
    'position': 1,
    DateOfReport: '10 June 2020',
    ReportedBy: [ "Ankit", "ZATCHUP 5252", "Alumni" ],
    ReportReason: '',
    ReportComments: '',
    ActionOne: '',
    ActionTwo: '',
    MarkResolved: '',
  },
  {
    'position': 2,
    DateOfReport: '10 June 2020',
    ReportedBy: [ "Ankit", "ZATCHUP 5252", "Alumni" ],
    ReportReason: '',
    ReportComments: '',
    ActionOne: '',
    ActionTwo: '',
    MarkResolved: '',
  }

];

@Component({
  selector: 'app-report-profile-unresolved',
  templateUrl: './report-profile-unresolved.component.html',
  styleUrls: ['./report-profile-unresolved.component.css']
})
export class ReportProfileUnresolvedComponent implements OnInit {

  displayedColumns: string[] = ['position', 'DateOfReport', 'ReportedBy', 'ReportReason',
  'ReportComments','ActionOne', 'ActionTwo', 'MarkResolved'];

dataSource = ELEMENT_DATA;
//columnsToDisplay: string[] = this.displayedColumns.slice();
// dataSource: PeriodicElement[] = ELEMENT_DATA;

constructor(private router: Router) { }


  ngOnInit(): void {
  }

}
