import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-my-buddies',
  templateUrl: './user-my-buddies.component.html',
  styleUrls: ['./user-my-buddies.component.css']
})
export class UserMyBuddiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
