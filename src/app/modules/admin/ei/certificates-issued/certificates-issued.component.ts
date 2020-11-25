import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfIssue: string;
  CertificateUniqueCode: string;
  category: string;
  eiZatchupidOfReceiver: string;
  selectCourse: string;
  selectStandard: string;
  selectClass: string;
  viewCertificate: string;
  downloadCertificate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'dateOfIssue': '05 June, 2020', 'CertificateUniqueCode' : 'CERTIFICATE 5352', 
  'category':'Academics', 'eiZatchupidOfReceiver': 'ZATCHUP 6874', 'selectCourse': 'B.Com', 
  'selectStandard': '1st Year', 'selectClass': 'A', 
  'viewCertificate': ' ', 'downloadCertificate' : 'Download'},

];

@Component({
  selector: 'app-certificates-issued',
  templateUrl: './certificates-issued.component.html',
  styleUrls: ['./certificates-issued.component.css']
})
export class CertificatesIssuedComponent implements OnInit {

  displayedColumns: string[] = ['position', 'dateOfIssue', 'CertificateUniqueCode', 'category', 
   'eiZatchupidOfReceiver','selectCourse', 'selectStandard', 'selectClass', 'viewCertificate', 
   'downloadCertificate'];   

 dataSource = ELEMENT_DATA;
 constructor(private router: Router) { }

 ngOnInit(): void {
 }

}
