import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-subadmin-employee',
  templateUrl: './ei-subadmin-employee.component.html',
  styleUrls: ['./ei-subadmin-employee.component.css']
})
export class EiSubadminEmployeeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToEiSubadminEmployeeContactPage(){
    this.router.navigate(['ei/sub-admin-employeeContact']);
  }
}
