import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-onboarded-view',
  templateUrl: './onboarded-view.component.html',
  styleUrls: ['./onboarded-view.component.css']
})
export class OnboardedViewComponent implements OnInit {
  eiData: any = {};
  eiId: any
  ei_id: any;
  dashCounts: any

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.eiId = this.activeRouter.snapshot.params.id
    if (this.eiId){
      // this.getCounts()
      this.getProfileData()
    }
  }

  eiHistory() {
    this.router.navigate(['admin/education-institute-history', this.eiData.id])
  }

  subPlanHistory() {
    this.router.navigate(['admin/subscription-plan-history', this.eiData.ei_id])
  }

  docAndMOUHistory() {
    this.router.navigate(['admin/ei-document-mou-history', this.eiData.ei_id])
  }

  contactUsMessage() {
    this.router.navigate(['admin/contact-us-messages', this.eiData.ei_id])
  }
  goToPocDetails() {
    this.router.navigate(['admin/poc-details', this.eiData.ei_id])
  }

  pendingChangeReqDetails(){
    this.router.navigate(['admin/change-detail-requests-pending'], {queryParams: {'ei_id': this.eiData.ei_id}})
  }
  getProfileData() {
    this.loader.show()
    let url = 'admin/ei-pending-profile/' + this.eiId
    this.baseService.getData(url).subscribe(
      (res: any) => {
        if (res.status == true){
          this.eiData = res.data
          this.getCounts(this.eiData.ei_id)
        }
          
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  goToUserEducationDetail() { }

  goBack(): void {
    this.location.back();
  }

  getCounts(id: any) {
    this.loader.show()
    let url = 'admin/ei_onboarded_zatchup_summary/' + id
    this.baseService.getData(url).subscribe(
      (res: any) => {
        if (res.status == true)
          this.dashCounts = res.data
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }
}
