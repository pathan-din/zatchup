import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ei-starclass-cart',
  templateUrl: './ei-starclass-cart.component.html',
  styleUrls: ['./ei-starclass-cart.component.css']
})
export class EiStarclassCartComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(){
   this.location.back() 
  }
}
