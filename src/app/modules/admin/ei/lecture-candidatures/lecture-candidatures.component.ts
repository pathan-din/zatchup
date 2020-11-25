import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  alumniZatchupId: string;
  alumnuName: string;
  age: number;
  gender: string;
  qualification: string;
  profession: string;
  email:string;
  phoneNumber: string;
  status: string;
  honorariumAsked: string;
  viewProfile: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1,'alumniZatchupId':'ZatchUp83541', 'alumnuName': 'Lauren Molive','age': 18,
  'gender':'male','qualification': 'B.Com','profession': 'Students','email':'lauren@gmail.com',
   'phoneNumber': '+91-9876543210', 'status': 'Verified','honorariumAsked': '','viewProfile': ''},
   {'position': 2,'alumniZatchupId':'ZatchUp815863', 'alumnuName': 'Prashant','age': 18,
  'gender':'male','qualification': 'M.Com','profession': 'Students','email':'prashant@gmail.com',
   'phoneNumber': '+91-9876543210', 'status': 'Verified','honorariumAsked': '','viewProfile': ''}
];

@Component({
  selector: 'app-lecture-candidatures',
  templateUrl: './lecture-candidatures.component.html',
  styleUrls: ['./lecture-candidatures.component.css']
})
export class LectureCandidaturesComponent implements OnInit {

  displayedColumns: string[] = ['position','alumniZatchupId','alumnuName','age','gender',
  'qualification','profession','email','phoneNumber', 'status', 'honorariumAsked','viewProfile'];

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
