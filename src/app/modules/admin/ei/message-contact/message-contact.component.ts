import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-message-contact',
  templateUrl: './message-contact.component.html',
  styleUrls: ['./message-contact.component.css']
})
export class MessageContactComponent implements OnInit {
  eiData: any= {};
  ei_id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private spinnerService: NgxSpinnerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMessageCount()
    this.ei_id = this.route.snapshot.params.ei_id
  }

  goToMessages(ticket_status: any){
    this.router.navigate(['admin/contact-us-messages-list'], {queryParams:{'ei_id': this.ei_id, 'ticket_status': ticket_status}})
  }
  
  getMessageCount(){
    this.spinnerService.show();
    this.baseService.getData('admin/onboarded_contactus_dashboard_summary' ).subscribe(
      (res: any) =>{
        if(res.status == true)
        this.eiData = res.data
        else{
        this.spinnerService.hide()
        this.alert.error(res.error.message, 'Error')
      }}
    ), err => {
      this.spinnerService.hide()
      this.alert.error(err, 'Error')
    }
  }
  goBack(){
    this.location.back()
  }
}
