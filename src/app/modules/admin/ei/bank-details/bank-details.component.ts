import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  eiId: any;
  bankDetails: any;
  status: any

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.eiId = this.activeRoute.snapshot.params.id
    if(this.eiId)
      this.getBankDetails()
  }

  getBankDetails() {
    this.loader.show()
    let data = {
      'id': this.eiId,
    }

    this.baseService.getData('admin/ei-payment-details/'+this.eiId).subscribe(
      (res: any) => {
        if (res.status == true){
          this.bankDetails = res.data;
          this.status = Object.entries(this.bankDetails)
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()

        console.log('bankDetails......',this.status)
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  goBack(){
    this.location.back();
  }

}
