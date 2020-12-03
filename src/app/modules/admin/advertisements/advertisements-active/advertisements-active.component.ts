import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface TotalAlumniListElement {
  'SNo': number;
  customerDate : string;
  activationDate : string;
  advertisementId : string;
  AdvertisementType : string;
  clicksBought : string;
  clicksExpired : string;
  grossFees: string;
  netFees: string;
  couponCodeApplied: string;
  Action: string;
}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {'SNo': 1,  customerDate: '10 June 2020' , activationDate: '15 June 2020', advertisementId: 'ADVERTISEMENT 8535', 
    AdvertisementType: 'Images', clicksBought : '50,000', clicksExpired : '60,000', grossFees: '10,000', 
    netFees: '12,000', couponCodeApplied :'Coupon 5242', Action: ''}
];

@Component({
  selector: 'app-advertisements-active',
  templateUrl: './advertisements-active.component.html',
  styleUrls: ['./advertisements-active.component.css']
})
export class AdvertisementsActiveComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'customerDate','activationDate', 'advertisementId', 'AdvertisementType',
  'clicksBought','clicksExpired','grossFees','netFees', 'couponCodeApplied', 'Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(private router: Router) { }

  ngOnInit(): void {}

}
