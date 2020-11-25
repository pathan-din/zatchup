import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create-post',
  templateUrl: './user-create-post.component.html',
  styleUrls: ['./user-create-post.component.css']
})
export class UserCreatePostComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
