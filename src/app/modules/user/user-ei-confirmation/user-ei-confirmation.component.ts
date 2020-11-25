import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-ei-confirmation',
  templateUrl: './user-ei-confirmation.component.html',
  styleUrls: ['./user-ei-confirmation.component.css']
})
export class UserEiConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserProfileCreatedPage() {
    this.router.navigate(['user/profile-created']);
 }
}
