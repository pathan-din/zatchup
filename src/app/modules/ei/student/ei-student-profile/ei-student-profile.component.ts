import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-student-profile',
  templateUrl: './ei-student-profile.component.html',
  styleUrls: ['./ei-student-profile.component.css']
})
export class EiStudentProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEiStudentHistoryPage(){
    this.router.navigate(['ei/student-history']);
  }

}
