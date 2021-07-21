import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css']
})
export class UserLandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  myProfile() {
    this.router.navigate(['user/my-profile']);
 }

  goToPaymentPage() {
    this.router.navigate(['user/payment-page']);
 }

}
