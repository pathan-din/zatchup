import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add-course',
  templateUrl: './user-add-course.component.html',
  styleUrls: ['./user-add-course.component.css']
})
export class UserAddCourseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserAddMoreEiPage() {
    this.router.navigate(['user/add-more-ei']);
 }

 goToUserAddMoreStandardPage() {
  this.router.navigate(['user/add-more-standard']);
}

}
