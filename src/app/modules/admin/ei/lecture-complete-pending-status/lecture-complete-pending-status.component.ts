import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  dateOfListing: string;
  title: string;
  targetAudience: number;
  subject: string;
  totalCandidatesRequired: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'dateOfListing':'01 June 2020', 'title': 'Title 1','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 2,'dateOfListing':'01 June 2020', 'title': 'Title 2','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 3,'dateOfListing':'01 June 2020', 'title': 'Title 3','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 4,'dateOfListing':'01 June 2020', 'title': 'Title 4','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 5,'dateOfListing':'01 June 2020', 'title': 'Title 5','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 6,'dateOfListing':'01 June 2020', 'title': 'Title 6','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 7,'dateOfListing':'01 June 2020', 'title': 'Title 7','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 8,'dateOfListing':'01 June 2020', 'title': 'Title 8','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 9,'dateOfListing':'01 June 2020', 'title': 'Title 9','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''},
  {'position': 10,'dateOfListing':'01 June 2020', 'title': 'Title 10','targetAudience': 10,
  'subject':'Mathematice','totalCandidatesRequired': 500,'action': ''}
];

@Component({
  selector: 'app-lecture-complete-pending-status',
  templateUrl: './lecture-complete-pending-status.component.html',
  styleUrls: ['./lecture-complete-pending-status.component.css']
})
export class LectureCompletePendingStatusComponent implements OnInit {

  displayedColumns: string[] = ['position','dateOfListing','title','targetAudience','subject',
  'totalCandidatesRequired','action'];

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
