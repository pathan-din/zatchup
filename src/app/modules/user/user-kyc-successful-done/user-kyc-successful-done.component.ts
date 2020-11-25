import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-kyc-successful-done',
  templateUrl: './user-kyc-successful-done.component.html',
  styleUrls: ['./user-kyc-successful-done.component.css']
})
export class UserKycSuccessfulDoneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserSchoolConfirmationPage() {
    this.router.navigate(['user/school-confirmation']);
 }

}
