import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ei-kyc-verification',
  templateUrl: './ei-kyc-verification.component.html',
  styleUrls: ['./ei-kyc-verification.component.css']
})
export class EiKycVerificationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
