import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-certificate',
  templateUrl: './user-certificate.component.html',
  styleUrls: ['./user-certificate.component.css']
})
export class UserCertificateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserAddEiPage() {
    this.router.navigate(['user/add-ei']);
 }

}
