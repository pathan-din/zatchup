import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ei-login-subadmin',
  templateUrl: './ei-login-subadmin.component.html',
  styleUrls: ['./ei-login-subadmin.component.css']
})
export class EiLoginSubadminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEiForgetPasswordPage(){
    this.router.navigate(['ei/forgot-password']);
  }

  goToEiContactUsPage(){
    this.router.navigate(['ei/contact-us']);
  }

  goToEiSubadminRegisterPage(){
    this.router.navigate(['ei/subadmin-registration']);
  }

 
}
