import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-my-school-tab',
  templateUrl: './user-my-school-tab.component.html',
  styleUrls: ['./user-my-school-tab.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMySchoolTabComponent implements  OnInit, OnDestroy {
  roleCheck:boolean=true;
  constructor(private router: Router, @Inject(DOCUMENT) private _document ) { }
  ngOnInit(): void {
    var role = parseInt(localStorage.getItem("role"))
    if(role==1 ){
      this.roleCheck=true;
    }else{
      this.roleCheck=false;
    }
    this._document.body.classList.add('bodybg-color');
  }

  ngOnDestroy() {
    // remove the class form body tag
    this._document.body.classList.add('bodybg-color');
  }

  goToUserCertificatePage(){
    this.router.navigate(['user/certificate']);
 }

 goToUserZatchupStarClassPage(){
  this.router.navigate(['user/zatchup-star-class']);
}

 goToUserProjectFundingPage(){
  this.router.navigate(['user/project-funding']);
}

goToUserLectureRequestPage(){
  this.router.navigate(['user/lecture-request']);
}

goToUserNotificationsPage(){
  this.router.navigate(['user/notifications']);
}

goToUserRemindersPage(){
  this.router.navigate(['user/reminders']);
}
goToUserProfilePage(){
  this.router.navigate(['user/profile']);
}

goToMyEducationalProfilePage(){
  this.router.navigate(['user/my-educational-profile']);
}

}
