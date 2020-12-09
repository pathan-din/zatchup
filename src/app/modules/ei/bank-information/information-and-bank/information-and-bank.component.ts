import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-information-and-bank',
  templateUrl: './information-and-bank.component.html',
  styleUrls: ['./information-and-bank.component.css']
})
export class InformationAndBankComponent implements OnInit {
  bankDetails: any

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.getBankDetails()
  }

  getBankDetails() {
    
    this.baseService.getData('ei/ei-bank-detail/').subscribe(
      (res: any) => {
        console.log('info is as ::',res)
        if (res.status == true) {
          this.bankDetails = res.data
        }
      }
    )
  }

}
