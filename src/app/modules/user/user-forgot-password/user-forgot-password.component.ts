import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTouserResetPasswordPage(){
    $("#OTPModel").modal('hide');
    this.router.navigate(['user/reset-password']);
  }

}
