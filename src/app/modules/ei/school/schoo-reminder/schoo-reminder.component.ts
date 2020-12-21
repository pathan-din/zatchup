import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-schoo-reminder',
  templateUrl: './schoo-reminder.component.html',
  styleUrls: ['./schoo-reminder.component.css']
})
export class SchooReminderComponent implements OnInit {
  checkReject:boolean=false;
  content:any
  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("rejectStatus","true")
    if(localStorage.getItem("getreject")){
      if(JSON.parse(localStorage.getItem("getreject")).rejected_reason!=false && JSON.parse(localStorage.getItem("getreject")).rejected_reason!=null){
        this.checkReject = true
        this.content=JSON.parse(localStorage.getItem("getreject"));
      }
    }
  }
  goToUserLandingPage(){
    localStorage.setItem("rejectStatus","true")
    if(localStorage.getItem("getreject")){
      if(JSON.parse(localStorage.getItem("getreject")).rejected_reason!=false){
        this.checkReject = true
        this.content=JSON.parse(localStorage.getItem("getreject"));
      }
    }
    this.router.navigate(['ei/information-and-bank-details']);
   
  }
}
