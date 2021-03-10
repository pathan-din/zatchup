import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starclass-management',
  templateUrl: './starclass-management.component.html',
  styleUrls: ['./starclass-management.component.css']
})
export class StarclassManagementComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToStarClassPlan(){
    this.router.navigate(['admin/current-plans'])
  }

  goToPaymentRevenue(){
    this.router.navigate(['admin/payment-starclass-revenue'])
  }

  goToStarclassBought(){
    this.router.navigate(['admin/starclass-bought'])
  }

  goToCreateCourse(){
    this.router.navigate(['admin/starclass-course-add'])
  }

  goToCourseList(){
    this.router.navigate(['admin/course-added-list'])
  }
}
