import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc-not-approved',
  templateUrl: './kyc-not-approved.component.html',
  styleUrls: ['./kyc-not-approved.component.css']
})
export class KycNotApprovedComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  goToUserLandingPage(){
	  localStorage.clear();
	  this.router.navigate(['ei/login-subadmin']);
  }

}
