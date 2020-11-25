import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  category: string;
  title: string;
  dateofListing: string;
  fundingRequired: string;
  totalCollected: string;
  totalContributors: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'category' : 'Category 1', 'title':'Title 1', 'dateofListing': '25 April, 2020',
  'fundingRequired':'1,50,000','totalCollected':'50,000','totalContributors':'100', 'action':''},
  {'position': 2, 'category' : 'Category 2', 'title':'Title 2', 'dateofListing': '20 April, 2020',
  'fundingRequired':'2,50,000','totalCollected':'20,000','totalContributors':'100', 'action':''},
  {'position': 3, 'category' : 'Category 3', 'title':'Title 3', 'dateofListing': '25 April, 2020',
  'fundingRequired':'1,00,000','totalCollected':'78,000','totalContributors':'100', 'action':''},
  {'position': 4, 'category' : 'Category 4', 'title':'Title 4', 'dateofListing': '05 April, 2020',
  'fundingRequired':'2,50,000','totalCollected':'50,000','totalContributors':'100', 'action':''},
  {'position': 5, 'category' : 'Category 5', 'title':'Title 5', 'dateofListing': '01 April, 2020',
  'fundingRequired':'1,50,000','totalCollected':'75,000','totalContributors':'100', 'action':''}
];

@Component({
  selector: 'app-list-complete',
  templateUrl: './list-complete.component.html',
  styleUrls: ['./list-complete.component.css']
})
export class ListCompleteComponent implements OnInit {

  displayedColumns: string[] = ['position', 'category', 'title', 'dateofListing',
  'fundingRequired','totalCollected', 'totalContributors','action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
