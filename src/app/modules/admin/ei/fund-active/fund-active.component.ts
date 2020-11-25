import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfProjectAdded: string;
  projectID: string;
  category: string;
  title: string;
  // zatchupID: string;
  // Einame: string;
  fundRequired: string;
  totalCollected: string;
  totalDonner: string;
  auditorStatus: string;
  fundingStatus: string;
  action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'dateOfProjectAdded':'25 April 2020', projectID : 'Project 001', 'category': 'Category 1',
  'title': 'Title 1','fundRequired':'1,50,000',
  'totalCollected': '1,00,000',
  'totalDonner': '50','auditorStatus': 'Assigned','fundingStatus': 'Completed','action': 'pending'}
  
  
];


@Component({
  selector: 'app-fund-active',
  templateUrl: './fund-active.component.html',
  styleUrls: ['./fund-active.component.css']
})
export class FundActiveComponent implements OnInit {

  displayedColumns: string[] = ['position','dateOfProjectAdded','projectID', 'category','title','fundRequired','totalCollected','totalDonner','auditorStatus','fundingStatus','action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
