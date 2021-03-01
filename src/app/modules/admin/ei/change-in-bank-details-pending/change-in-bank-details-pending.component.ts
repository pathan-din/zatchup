import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import {  Location } from '@angular/common';
import { ChangeInBankDetails } from '../modals/change-details.modal';

@Component({
  selector: 'app-change-in-bank-details-pending',
  templateUrl: './change-in-bank-details-pending.component.html',
  styleUrls: ['./change-in-bank-details-pending.component.css']
})
export class ChangeInBankDetailsPendingComponent implements OnInit {
  changeInBankDetails : ChangeInBankDetails
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { 
    this.changeInBankDetails = new ChangeInBankDetails();
  }

  ngOnInit(): void {
    this.changeInBankDetails.Id = this.route.snapshot.queryParamMap.get('id')
    this.getChangeBankDetails();
    this.changeInBankDetails.pageCount = this.baseService.getCountsOfPage()
  }

  getChangeBankDetails(page?: any){
    this.loader.show()
    this.changeInBankDetails.params = {
      'page_size': this.changeInBankDetails.page_size,
      'page': page,
      'id': this.changeInBankDetails.Id
    }
    this.baseService.getData('admin/ei_bank_change_details_list/', this.changeInBankDetails.params).subscribe(
      (res: any)=>{
        if(res.status == true){
          if(!page)
          page = this.changeInBankDetails.config.currentPage
          this.changeInBankDetails.startIndex = res.page_size * (page -1) + 1;
          this.changeInBankDetails.page_size = res.page_size
          this.changeInBankDetails.config.itemsPerPage = this.changeInBankDetails.page_size
          this.changeInBankDetails.config.currentPage = page
          this.changeInBankDetails.config.totalItems = res.count;
          if (res.count > 0){
            this.changeInBankDetails.dataSource = res.results
          } 
          else{
            this.changeInBankDetails.dataSource = undefined
          }
        }
        else{
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide();
      }
    ), (err: any)=>{
      this.loader.hide()
      this.alert.error(err, 'Error')
    }}

    goBack(){
      this.location.back()
    }

    // goToChangeDetailView(){
    //   this.router.navigate(['admin/change-in-bank-details-view'])
    // }
}
