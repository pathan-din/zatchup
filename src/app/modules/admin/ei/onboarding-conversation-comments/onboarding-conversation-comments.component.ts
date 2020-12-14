import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding-conversation-comments',
  templateUrl: './onboarding-conversation-comments.component.html',
  styleUrls: ['./onboarding-conversation-comments.component.css']
})
export class OnboardingConversationCommentsComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }
}
