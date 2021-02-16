import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-privacy',
  templateUrl: './chat-privacy.component.html',
  styleUrls: ['./chat-privacy.component.css']
})
export class ChatPrivacyComponent implements OnInit {

  constructor(
    private location: Location
  ) { 
  }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
