import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-profile-preview',
  templateUrl: './ei-profile-preview.component.html',
  styleUrls: ['./ei-profile-preview.component.css']
})
export class EiProfilePreviewComponent implements OnInit {

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService) { }

  ngOnInit(): void {
  }
 getEiProfileData(){
   try {
   this.baseService.getData('').subscribe(res=>{

   },(error)=>{
    this.alert.error("Something went wrong.","Error");
   })
   } catch (e) {
   
   }
 }
}
