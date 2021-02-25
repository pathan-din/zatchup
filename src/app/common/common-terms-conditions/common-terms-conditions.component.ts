import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common'
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-common-terms-conditions',
  templateUrl: './common-terms-conditions.component.html',
  styleUrls: ['./common-terms-conditions.component.css']
})
export class CommonTermsConditionsComponent implements OnInit {
  htmlContent: any = '';
  type: any;
  action: any;
  content:any

  constructor(
    private location: Location,
    private baseService: BaseService,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.action = this.route.snapshot.params.action
    this.type = this.route.snapshot.params.type;
    this.getContent()
  }


  getContent(){
    this.loader.show()
     let data = {
      "user_type": 'user',
      "page_name": 'Terms and Conditions'
       
     }
     this.baseService.getData('admin/view_static_content/', data).subscribe(
       (res: any) => {
         if(res.status == true) {
           if(res.results.length > 0){
            let find = res.results.find(val => {
              return val.user_type == this.type
            })
            this.htmlContent = find ? find.page_content : undefined
           }
         } else {
          this.alert.error(res.error.message, "Error")
       }
       this.loader.hide()
      }
     ), err => {
      this.alert.error(err.message, "Error");
      this.loader.hide()
  }}

  goBack(){
    this.location.back()
  }
}
