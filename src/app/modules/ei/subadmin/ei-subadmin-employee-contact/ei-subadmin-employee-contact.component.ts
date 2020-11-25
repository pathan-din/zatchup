import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-subadmin-employee-contact',
  templateUrl: './ei-subadmin-employee-contact.component.html',
  styleUrls: ['./ei-subadmin-employee-contact.component.css']
})
export class EiSubadminEmployeeContactComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
