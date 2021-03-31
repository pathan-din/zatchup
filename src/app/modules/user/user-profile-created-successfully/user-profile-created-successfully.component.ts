import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-user-profile-created-successfully',
  templateUrl: './user-profile-created-successfully.component.html',
  styleUrls: ['./user-profile-created-successfully.component.css']
})
export class UserProfileCreatedSuccessfullyComponent implements OnInit {

  constructor(private router: Router, private confirmDialogService: ConfirmDialogService,
    ) { }

  ngOnInit(): void {
  }

 
 goToUserLandingPage(data: any, message: any): any {
  this.confirmDialogService.confirmThis('You will be logout before continue ...', () => {
    this.logout()
  
  }, () => {
  });
}
 logout(){

  localStorage.clear();
  this.router.navigate(['user/login']);
}
}
