import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface LastLoginUser {

  'position': number;
  CertificateTitle: string;
  // profilePic: string;
  PublishDate: string;
  PublishedBy: string;
  DownloadDocument: string;

}

const ELEMENT_DATA: LastLoginUser[] = [
  {
    'position': 1,
    CertificateTitle: 'Certificate Title',
    PublishDate: '05 March 2020',
    PublishedBy: 'Dean',
    DownloadDocument: 'Download',
  }

];

@Component({
  selector: 'app-admin-user-certificates',
  templateUrl: './admin-user-certificates.component.html',
  styleUrls: ['./admin-user-certificates.component.css']
})
export class AdminUserCertificatesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'CertificateTitle', 'PublishDate', 'PublishedBy',
  'DownloadDocument'];

dataSource = ELEMENT_DATA;
//columnsToDisplay: string[] = this.displayedColumns.slice();
// dataSource: PeriodicElement[] = ELEMENT_DATA;

constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
