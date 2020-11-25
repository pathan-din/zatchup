import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-my-profile',
  templateUrl: './user-my-profile.component.html',
  styleUrls: ['./user-my-profile.component.css']
})
export class UserMyProfileComponent implements OnInit {
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

    goToUserNotificationsPage(){
      this.router.navigate(['user/notifications']);
    }
    goToUserCreatePostPage(){
      this.router.navigate(['user/create-post']);
    }
}
