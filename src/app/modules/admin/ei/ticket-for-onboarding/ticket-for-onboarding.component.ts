import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  zatchUpID: string;
  ticketName: string;
  address: string;
  state: string;
  city: string;
  board: string;
  emailId: string;
  phoneNumber: string;
  similarEi: string;
  resolve: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'ticketName':'ticket7415', 'zatchUpID' : 'ZATCHUP 5025', 'state': 'Delhi',
  'city': 'Delhi','address': 'H-147, Noida Sector-63, U.p-201010', 'board': 'Delhi University',
  'emailId':'ankit@gmail.com', 'phoneNumber': '+91 9876543210','similarEi': ' ', 'resolve': ' '}
];

@Component({
  selector: 'app-ticket-for-onboarding',
  templateUrl: './ticket-for-onboarding.component.html',
  styleUrls: ['./ticket-for-onboarding.component.css']
})
export class TicketForOnboardingComponent implements OnInit {

  displayedColumns: string[] = ['position','zatchUpID','ticketName', 'address', 'state','city', 
  'board','emailId','phoneNumber', 'similarEi','resolve'];

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
