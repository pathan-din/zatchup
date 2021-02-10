import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-new-chat',
  templateUrl: './start-new-chat.component.html',
  styleUrls: ['./start-new-chat.component.css']
})
export class StartNewChatComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }

  gotoChat(){
    this.router.navigate(['user/chat']);
  }
}
