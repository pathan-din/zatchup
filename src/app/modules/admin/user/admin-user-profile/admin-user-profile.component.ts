import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }



  goToUserEducationDetail(){
    this.router.navigate(['admin/user-education-profile']);
  }
}
