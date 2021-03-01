import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'


@Component({
  selector: 'app-subadmin-terms-and-conditions',
  templateUrl: './subadmin-terms-and-conditions.component.html',
  styleUrls: ['./subadmin-terms-and-conditions.component.css']
})
export class SubadminTermsAndConditionsComponent implements OnInit {
  htmlContent: any = '';
  type: any;
  action: any;
  content:any
  constructor(
    private baseService: BaseService,
    private location: Location,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.action = this.route.snapshot.params.action
    this.type = this.route.snapshot.params.type;
    this.getContent()
  }

  getContent(){
    this.loader.show()
     let data = {
      // "user_type": '',
      // "page_name": 'Terms and Conditions'
       
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
