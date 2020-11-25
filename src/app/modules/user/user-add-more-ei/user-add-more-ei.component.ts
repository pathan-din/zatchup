import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add-more-ei',
  templateUrl: './user-add-more-ei.component.html',
  styleUrls: ['./user-add-more-ei.component.css']
})
export class UserAddMoreEiComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserEiConfirmationPage() {
    this.router.navigate(['user/ei-confirmation']);
 }

}
