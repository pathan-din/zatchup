import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ei-subadmin-module-access-history',
  templateUrl: './ei-subadmin-module-access-history.component.html',
  styleUrls: ['./ei-subadmin-module-access-history.component.css']
})
export class EiSubadminModuleAccessHistoryComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
