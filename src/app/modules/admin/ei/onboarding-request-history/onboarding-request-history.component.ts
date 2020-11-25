import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfRequest: string;
  fieldofChange: string;
  existingField: string;
  newField: string;
  proofUploaded: string;
  status: string;
  emailConfirmation: string;
  rejectRemarks: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'dateOfRequest':'01 June 2020', 'fieldofChange' : 'Name', 'existingField': 'Ankit Singh',
  'newField': 'Ankit Patel','proofUploaded': ' ', 'status': 'Approve','emailConfirmation':' ',
  'rejectRemarks': ' '}
  
];

@Component({
  selector: 'app-onboarding-request-history',
  templateUrl: './onboarding-request-history.component.html',
  styleUrls: ['./onboarding-request-history.component.css']
})
export class OnboardingRequestHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'dateOfRequest', 'fieldofChange', 'existingField','newField','proofUploaded',  'status','emailConfirmation','rejectRemarks'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
