import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-subadmincongratulation',
  templateUrl: './subadmincongratulation.component.html',
  styleUrls: ['./subadmincongratulation.component.css']
})
export class SubadmincongratulationComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  goToUserLandingPage(){
	  localStorage.clear();
	  this.router.navigate(['ei/login-subadmin']);
  }
}
