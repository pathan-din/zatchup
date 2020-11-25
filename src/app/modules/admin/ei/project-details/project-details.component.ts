import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface ReportPRofile {

  'position': number;
  name: string;
  userRelationShip: string;
  amount: string;
  dayOfFundng: string;

}

const ELEMENT_DATA: ReportPRofile[] = [
  {
    'position': 1,
    name: 'Lauran Molive',
    userRelationShip: 'Student',
    amount: '1,000',
    dayOfFundng: '25 Feb 2020',
  }

];

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'userRelationShip', 'amount','dayOfFundng'];

dataSource = ELEMENT_DATA;

constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
