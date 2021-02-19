import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-ei-starclass-your-order',
  templateUrl: './ei-starclass-your-order.component.html',
  styleUrls: ['./ei-starclass-your-order.component.css']
})
export class EiStarclassYourOrderComponent implements OnInit {

  displayedColumns: string[] = ['SNo','courseTitle', 'dateBought','boughtBy','downloadInvoice'];
  dataSource : any
  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {    
  }

  goBack(){
    this.location.back()
  }
}
