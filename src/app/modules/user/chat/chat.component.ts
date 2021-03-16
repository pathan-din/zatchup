import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.getChatRooms();
    // this.getUsers()
    // console.log('bbbbbb',this.firebaseService.getChatRooms())
  }

  gotoChatPrivacy(){
    this.router.navigate(['user/chat-privacy']);
  }

  goBack(){
    this.location.back()
  }

  getChatRooms(){
    this.firebaseService.getChatRooms('').subscribe(
      (res: any) => {
        console.log('chat room res is as ::',res)
      }
    )
  }

  getUsers(){
    this.firebaseService.getUsers().subscribe(
      (res: any) => {
        console.log('users is as ::',res)
      }
    )
  }

}
