import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-courier-details',
  templateUrl: './ei-courier-details.component.html',
  styleUrls: ['./ei-courier-details.component.css']
})
export class EiCourierDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEiOnboardProcessPage(){
    this.router.navigate(['ei/onboarding-process']);
  }

}
