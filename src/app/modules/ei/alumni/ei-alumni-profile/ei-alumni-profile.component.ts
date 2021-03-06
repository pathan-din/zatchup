import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ei-alumni-profile',
  templateUrl: './ei-alumni-profile.component.html',
  styleUrls: ['./ei-alumni-profile.component.css']
})
export class EiAlumniProfileComponent implements OnInit {

  constructor(private router: Router,
    private location: Location) { }

  ngOnInit(): void {
  }

  goToAlumniHistoryPage(){
    this.router.navigate(['ei/alumni-history']);
  }

  goBack(): void{
    this.location.back();
  }

}
