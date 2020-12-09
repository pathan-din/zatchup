import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ei-subadmin-access-history',
  templateUrl: './ei-subadmin-access-history.component.html',
  styleUrls: ['./ei-subadmin-access-history.component.css']
})
export class EiSubadminAccessHistoryComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void{
    this.location.back()
  }
}
