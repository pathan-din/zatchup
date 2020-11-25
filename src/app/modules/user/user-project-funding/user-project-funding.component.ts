import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-project-funding',
  templateUrl: './user-project-funding.component.html',
  styleUrls: ['./user-project-funding.component.css']
})
export class UserProjectFundingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToUserFundingDetailsPage(){
    this.router.navigate(['user/funding-details']);
  }
  
  goToUserSearchPage(){
    this.router.navigate(['userWeb/userSearch']);
  }
}
