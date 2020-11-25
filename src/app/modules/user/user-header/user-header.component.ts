import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(private router: Router) { }
  authCheck : boolean=false;
  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.authCheck=true;
    }else{
      this.authCheck=false;
    }
  }
  logout(){
	  localStorage.clear();
	  this.router.navigate(['user/login']);
  }
}
