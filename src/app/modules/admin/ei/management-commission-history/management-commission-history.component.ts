import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  zatchUpID: string;
  onboardingDate: string;
  schoolName: string;
  state: string;
  city: string;
  board: string;
  studentZatchup: string;
  totalAlumnizatchup: string;
  commission: string;
  eiPocName: string;
  eiPocID: string;
  action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'onboardingDate':'20 March,2020', 'zatchUpID' : 'ZATCHUP 5475', 'schoolName':'Adarsh Public School', 'state': 'Delhi',
  'city': 'Delhi', 'board': 'ABC University', 'studentZatchup': '1,000','totalAlumnizatchup': '1,500', 'commission': '10%', 'eiPocName': 'Ankit', 'eiPocID': '5475', action:' '}
  
];

@Component({
  selector: 'app-management-commission-history',
  templateUrl: './management-commission-history.component.html',
  styleUrls: ['./management-commission-history.component.css']
})
export class ManagementCommissionHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'onboardingDate', 'zatchUpID', 'schoolName', 'state','city',  'board', 'studentZatchup',
  'totalAlumnizatchup','commission', 'eiPocName', 'eiPocID', 'action'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
