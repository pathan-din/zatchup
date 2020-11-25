import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-created-successfully',
  templateUrl: './user-profile-created-successfully.component.html',
  styleUrls: ['./user-profile-created-successfully.component.css']
})
export class UserProfileCreatedSuccessfullyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserLandingPage() {
    this.router.navigate(['user/landing-page']);
 }
}
