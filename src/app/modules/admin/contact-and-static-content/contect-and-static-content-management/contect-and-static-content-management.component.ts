import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-contect-and-static-content-management',
  templateUrl: './contect-and-static-content-management.component.html',
  styleUrls: ['./contect-and-static-content-management.component.css']
})
export class ContectAndStaticContentManagementComponent implements OnInit {
  zatchup_details: any

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getPocDetails()
  }

  getPocDetails() {
    this.loader.show()
    this.baseService.getData('admin/get_contact_details/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.zatchup_details = res.data.excalation_details
        } else {
          this.alert.error(res.error.message, "Error")
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err.message, "Error")
      this.loader.hide()
    }
  }

  editPOC(){
    this.router.navigate(['admin/edit-poc'])
  }

}
