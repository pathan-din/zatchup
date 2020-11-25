import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  advertisementTitle: string;
  advertisementType: string;
  caption: string;
  numberOfClicks: string;
  ageGroup: string;
  locations: string;
  selectedProfession: string;
  amount: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'advertisementTitle' : 'Title 1', 'advertisementType':'Images', 'caption': 'Caption',
  'numberOfClicks':'500','ageGroup':'20-22 Year','locations':'Delhi', 'selectedProfession': 'Profession',
   'amount': '1,000', 'action':''}
];

@Component({
  selector: 'app-past-advertisements',
  templateUrl: './past-advertisements.component.html',
  styleUrls: ['./past-advertisements.component.css']
})
export class PastAdvertisementsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'advertisementTitle', 'advertisementType', 'caption',
  'numberOfClicks','ageGroup', 'locations', 'selectedProfession','amount', 'action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
