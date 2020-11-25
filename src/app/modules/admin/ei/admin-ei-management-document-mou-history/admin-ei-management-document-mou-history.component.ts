import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface LastLoginUser {

  'position': number;
  DateOfUploading: string;
  // profilePic: string;
  NameofDocument: string;
  ViewDocument: string;
  DownloadDocument: string;
  Remarks: string;
  UploadedByEI: string;
  UploadedByEmployeeName: string;

}

const ELEMENT_DATA: LastLoginUser[] = [
  {
    'position': 1,
    DateOfUploading: '10 June 2020',
    NameofDocument: 'MOU',
    ViewDocument: 'assets/images/userWebsite/image-icon.png',
    DownloadDocument: 'Download',
    Remarks: '',
    UploadedByEI: '',
    UploadedByEmployeeName: 'Prashant(Employee 5252)',
  }

];

@Component({
  selector: 'app-admin-ei-management-document-mou-history',
  templateUrl: './admin-ei-management-document-mou-history.component.html',
  styleUrls: ['./admin-ei-management-document-mou-history.component.css']
})
export class AdminEiManagementDocumentMouHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'DateOfUploading', 'NameofDocument', 'ViewDocument',
    'DownloadDocument','Remarks', 'UploadedByEI', 'UploadedByEmployeeName'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }


  ngOnInit() {
  }

}
