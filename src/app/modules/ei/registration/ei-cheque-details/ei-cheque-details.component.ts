import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-cheque-details',
  templateUrl: './ei-cheque-details.component.html',
  styleUrls: ['./ei-cheque-details.component.css']
})
export class EiChequeDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEiCourierDetailsPage(){
    this.router.navigate(['ei/courier-details']);
  }

}
