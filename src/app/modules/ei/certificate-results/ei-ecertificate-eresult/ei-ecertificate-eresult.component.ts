import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-ecertificate-eresult',
  templateUrl: './ei-ecertificate-eresult.component.html',
  styleUrls: ['./ei-ecertificate-eresult.component.css']
})
export class EiEcertificateEresultComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEiEcertificatePage(){
    this.router.navigate(['ei/ecertificate']);
  }

}
