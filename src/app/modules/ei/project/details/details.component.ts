import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  userrelationShip: string;
  amount: number;
  daysOfFunding: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Lauren Molive', userrelationShip: 'Student', amount: 1.000, daysOfFunding: '20 Feb 2020'},
  {position: 2, name: 'Alumni', userrelationShip: 'Student', amount: 2.000, daysOfFunding: '22 Feb 2020'},
  {position: 3, name: 'Bob', userrelationShip: 'Student', amount: 10.000, daysOfFunding: '25 Feb 2020'},
  {position: 4, name: 'Anna sethia', userrelationShip: 'Student', amount: 15.000, daysOfFunding: '25 Feb 2020'},
  {position: 5, name: 'Paige Turner', userrelationShip: 'Student', amount: 18.000, daysOfFunding: '25 Feb 2020'},
  {position: 6, name: 'Lauren Molive', userrelationShip: 'Student', amount: 1.000, daysOfFunding: '20 Feb 2020'},
  {position: 7, name: 'Alumni', userrelationShip: 'Student', amount: 2.000, daysOfFunding: '22 Feb 2020'},
  {position: 8, name: 'Bob', userrelationShip: 'Student', amount: 10.000, daysOfFunding: '25 Feb 2020'},
  {position: 9, name: 'Anna sethia', userrelationShip: 'Student', amount: 15.000, daysOfFunding: '25 Feb 2020'},
  {position: 10, name: 'Paige Turner', userrelationShip: 'Student', amount: 18.000, daysOfFunding: '25 Feb 2020'},
  {position: 11, name: 'Lauren Molive', userrelationShip: 'Student', amount: 1.000, daysOfFunding: '20 Feb 2020'},
  {position: 12, name: 'Alumni', userrelationShip: 'Student', amount: 2.000, daysOfFunding: '22 Feb 2020'},
  {position: 13, name: 'Bob', userrelationShip: 'Student', amount: 10.000, daysOfFunding: '25 Feb 2020'},
  {position: 14, name: 'Anna sethia', userrelationShip: 'Student', amount: 15.000, daysOfFunding: '25 Feb 2020'},
  {position: 15, name: 'Paige Turner', userrelationShip: 'Student', amount: 18.000, daysOfFunding: '25 Feb 2020'},
  {position: 16, name: 'Lauren Molive', userrelationShip: 'Student', amount: 1.000, daysOfFunding: '20 Feb 2020'},
  {position: 17, name: 'Alumni', userrelationShip: 'Student', amount: 2.000, daysOfFunding: '22 Feb 2020'},
  {position: 18, name: 'Bob', userrelationShip: 'Student', amount: 10.000, daysOfFunding: '25 Feb 2020'},
  {position: 19, name: 'Anna sethia', userrelationShip: 'Student', amount: 15.000, daysOfFunding: '25 Feb 2020'},
  {position: 20, name: 'Paige Turner', userrelationShip: 'Student', amount: 18.000, daysOfFunding: '25 Feb 2020'},
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'userrelationShip', 'amount', 'daysOfFunding'];
  dataSource = ELEMENT_DATA;

}
