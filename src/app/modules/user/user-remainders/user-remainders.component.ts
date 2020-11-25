import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-remainders',
  templateUrl: './user-remainders.component.html',
  styleUrls: ['./user-remainders.component.css']
})
export class UserRemaindersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
