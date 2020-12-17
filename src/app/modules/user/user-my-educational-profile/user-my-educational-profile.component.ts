import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-my-educational-profile',
  templateUrl: './user-my-educational-profile.component.html',
  styleUrls: ['./user-my-educational-profile.component.css']
})
export class UserMyEducationalProfileComponent implements OnInit {
  epData: any;
  
  constructor(
    private router: Router,
    private alert: NotificationService,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private loader: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.getEducationalProfile()
  }

  getEducationalProfile(){
  this.loader.show()
  let url = 'user/student-education-profile/'
  this.baseService.getData(url).subscribe(
    (res: any)=>{
      if(res.status == true)
      this.epData = res.data
      else
      this.alert.error(res.error.message[0], 'Error')
      this.loader.hide()
    }
  ), err=>{
    this.loader.hide();
    this.alert.error(err, 'Error')
  }
  }
}
