import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-subadmin-additional',
  templateUrl: './ei-subadmin-additional.component.html',
  styleUrls: ['./ei-subadmin-additional.component.css']
})
export class EiSubadminAdditionalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToEiSubadminEmployeePage(){
    this.router.navigate(['ei/sub-admin-employee']);
  }
}
