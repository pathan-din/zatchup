import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-user-post',
  templateUrl: './admin-user-post.component.html',
  styleUrls: ['./admin-user-post.component.css']
})
export class AdminUserPostComponent implements OnInit {

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
}
