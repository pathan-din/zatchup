import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  postOption:string="matrix";
  postOptionActiveImage:string='dead';
  postOptionActiveMatrix:string='active';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  postTabFunction(event){
    this.postOption= event;
    if(event==='matrix'){
      this.postOptionActiveMatrix='active';
      this.postOptionActiveImage='dead';
    }
    if(event==='image'){
      this.postOptionActiveMatrix='dead';
      this.postOptionActiveImage='active';
    }
    }

    goToUserSchoolProfilePage(){
      this.router.navigate(['user/school-profile']);
    }

    goToUserMyprofilePage(){
      this.router.navigate(['user/my-profile']);
    }

}
