import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-school',
  templateUrl: './my-school.component.html',
  styleUrls: ['./my-school.component.css']
})
export class MySchoolComponent  implements  OnInit{
  roleCheck:boolean=true;
  verified: any;

  constructor(private router: Router) { }
  ngOnInit(): void {
    var role = parseInt(localStorage.getItem("role"))
    this.verified = localStorage.getItem('approved');
    if(role==1 ){
      this.roleCheck=true;
    }else{
      this.roleCheck=false;
    }
    
  }
gotToProfilePage(){
  this.router.navigate(["user/my-educational-profile"]);
}

gotoChatWithTeachers(){
  this.router.navigate(['user/new-chat'], { queryParams: { "returnUrl": "user/my-school"}});
}

}
