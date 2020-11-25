import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  studentName: string;
  eiID: string;
  rollNo: number;
  class: string;
  category: string;
  previewReportCard: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'studentName': 'Bob', 'eiID': 'EI7832552','rollNo':4253,
  'class': 'B.A','category': 'students', 'previewReportCard': 'Export Result'}
  
  
];

@Component({
  selector: 'app-ei-ecertificate-history',
  templateUrl: './ei-ecertificate-history.component.html',
  styleUrls: ['./ei-ecertificate-history.component.css']
})
export class EiEcertificateHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position','studentName','eiID','rollNo','class','category','previewReportCard'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
