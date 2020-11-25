import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface ReportPRofile {

  'position': number;
  DateOfReport: string;
  // profilePic: string;
  ReportedBy: Array<string>;
  ReportReason: string;
  ReportComments: string;
  ActionCheckbox: string;
  ResolutionComments: string;
  ResolutionAttachment: string;

}

const ELEMENT_DATA: ReportPRofile[] = [
  {
    'position': 1,
    DateOfReport: '10 June 2020',
    ReportedBy: [ "Ankit", "ZATCHUP 5252", "Alumni" ],
    ReportReason: '',
    ReportComments: '',
    ActionCheckbox: '',
    ResolutionComments: '',
    ResolutionAttachment: '',
  }

];
@Component({
  selector: 'app-report-profile-resolved',
  templateUrl: './report-profile-resolved.component.html',
  styleUrls: ['./report-profile-resolved.component.css']
})
export class ReportProfileResolvedComponent implements OnInit {

  displayedColumns: string[] = ['position', 'DateOfReport', 'ReportedBy', 'ReportReason',
  'ReportComments','ActionCheckbox', 'ResolutionComments', 'ResolutionAttachment'];

dataSource = ELEMENT_DATA;
//columnsToDisplay: string[] = this.displayedColumns.slice();
// dataSource: PeriodicElement[] = ELEMENT_DATA;

constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
