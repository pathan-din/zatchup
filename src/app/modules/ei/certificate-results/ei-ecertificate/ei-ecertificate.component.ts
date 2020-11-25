import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-ecertificate',
  templateUrl: './ei-ecertificate.component.html',
  styleUrls: ['./ei-ecertificate.component.css']
})
export class EiEcertificateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEiEcertificateCreateFormatPage(){
    this.router.navigate(['ei/ecertificateCreateFormat']);
  }

  goToEiEcertificateHistoryPage(){
    this.router.navigate(['ei/ecertificateHistory']);
  }

}
