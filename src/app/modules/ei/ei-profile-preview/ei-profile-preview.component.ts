import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';

@Component({
  selector: 'app-ei-profile-preview',
  templateUrl: './ei-profile-preview.component.html',
  styleUrls: ['./ei-profile-preview.component.css']
})
export class EiProfilePreviewComponent implements OnInit {
  displayError:any="";
  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private eiService:EiServiceService) { }

  ngOnInit(): void {
  }
 getEiProfileData(){
   try {
     this.loader.show();
   this.baseService.getData('').subscribe(res=>{
      let response:any={};
      response=res;
      if(response.status==true){
        this.loader.show();
      }else{
        this.loader.show();
        this.displayError = this.eiService.getErrorResponse(this.loader,response.error);
        this.alert.error(this.displayError,"Error");
      }
   },(error)=>{
    this.loader.show();
    this.alert.error("Something went wrong.","Error");
   })
   } catch (e) {
   
   }
 }
}
