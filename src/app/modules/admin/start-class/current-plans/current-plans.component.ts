import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface TotalAlumniListElement {
  pplan: string;
  planOne : string;
  planTwo : string;
  planThree : string;
}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {pplan: 'Price for the plan', 
    planOne: '10,000' , 
    planTwo: '15,000', 
    planThree : '20,000'},

    {pplan: 'Views Per Lecture', 
    planOne: '5' , 
    planTwo: '10', 
    planThree : '20'},

    {pplan: 'Validity', 
    planOne: '365 days' , 
    planTwo: '365 days', 
    planThree : '365 days'}
];

@Component({
  selector: 'app-current-plans',
  templateUrl: './current-plans.component.html',
  styleUrls: ['./current-plans.component.css']
})
export class CurrentPlansComponent implements OnInit {
  displayedColumns: string[] = ['pplan', 'planOne','planTwo', 'planThree'];
  dataSource = ELEMENT_DATA;
  
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router) { }
  ngOnInit(): void {}
}
