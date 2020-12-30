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
    if(localStorage.getItem("role")){
      var role = parseInt(localStorage.getItem("role"));
      if(role==1){
        this.router.navigate(['user/my-school']);
      }else{
        this.router.navigate(['user/my-school']);
       //this.router.navigate(['user/work-detail']);
      }
    }

    
    
 }
 logout(){
  localStorage.clear();
  this.router.navigate(['user/login']);
}
}
