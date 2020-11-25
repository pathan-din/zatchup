import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfProjectAdded: string;
  projectID: string;
  category: string;
  title: string;
  zatchupID: string;
  Einame: string;
  fundRequired: string;
  totalCollected: string;
  totalContributor: string;
  auditorStatus: string;
  fundingStatus: string;
  action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'dateOfProjectAdded':'25 April 2020', projectID : 'Project 001', 'category': 'Category 1',
  'title': 'Title 1','zatchupID': 'ZATCHUP 005','Einame': 'ABC EI','fundRequired':'1,50,000',
  'totalCollected': '1,00,000',
  'totalContributor': '50','auditorStatus': 'Assigned','fundingStatus': 'Completed','action': 'pending'}
  
  
];

@Component({
  selector: 'app-fund-closed',
  templateUrl: './fund-closed.component.html',
  styleUrls: ['./fund-closed.component.css']
})
export class FundClosedComponent implements OnInit {

  displayedColumns: string[] = ['position','dateOfProjectAdded','projectID', 'category','title','zatchupID', 
  'Einame','fundRequired','totalCollected','totalContributor','auditorStatus','fundingStatus','action'];   

 dataSource = ELEMENT_DATA;
 constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
