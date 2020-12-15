import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-management',
  templateUrl: './support-management.component.html',
  styleUrls: ['./support-management.component.css']
})
export class SupportManagementComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ticketsOnboardingList(){
    this.router.navigate(['admin/tickets-onboarding-list'])
  }

}
