import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-starclass',
  templateUrl: './ei-starclass.component.html',
  styleUrls: ['./ei-starclass.component.css']
})
export class EiStarclassComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToCoursePreview(){
    this.router.navigate(['ei/star-class-courses-preview'])
  }

  goToMyCourse(){
    this.router.navigate(['ei/ei-starclass-mycourses'])
  }

  goToYourOrder(){
    this.router.navigate(['ei/ei-starclass-your-order'])
  }

  goToMyCart(){
    this.router.navigate(['ei/star-class-cart'])
  }
  goToPendingRequest(){
    this.router.navigate(['ei/starclass-requests-pending'])
  }
}
