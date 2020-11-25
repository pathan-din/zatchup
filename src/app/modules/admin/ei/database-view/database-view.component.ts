import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  conversationComments(){
    this.router.navigate(['admin/ei-onboarding-conversation-comments'])
  }

  eiRequestHistory(){
    this.router.navigate(['admin/ei-onboarding-request-history'])
  }

}
