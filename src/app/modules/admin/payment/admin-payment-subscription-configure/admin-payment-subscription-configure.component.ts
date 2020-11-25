import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubscriptionModal } from '../modal/subscription.modal';
import { NgxSpinnerService } from 'ngx-spinner'


export interface subAdminManagementElement {
  planDuration: string;
  currentAmount: string;
  changePlan: string;
}

@Component({
  selector: 'app-admin-payment-subscription-configure',
  templateUrl: './admin-payment-subscription-configure.component.html',
  styleUrls: ['./admin-payment-subscription-configure.component.css']
})
export class AdminPaymentSubscriptionConfigureComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  subscriptionModal = new SubscriptionModal()

  displayedColumns: string[] = ['plan', 'duration', 'currentAmount', 'status', 'action'];

  dataSource: any;
  constructor(
    private router: Router,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getSubscriptions()
  }

  goToAdminEiManageCoursesDetailsPage() {
    this.router.navigate(['admin/ei-management-courseDetails']);
  }

  getSubscriptions() {
    this.loader.show()
    this.baseService.getData('admin/subscription/list_subscription/').subscribe(
      (res: any) => {
        if (res.status == true && res.count != 0) {
          this.dataSource = res.results
        }
        else{
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }
    ),err =>{
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  addSubscription() {
    this.loader.show()
    let data = {
      "id": this.subscriptionModal.modalHeader == 'Update' ? parseInt(this.subscriptionModal.subscriptionId) : undefined,
      "name": this.subscriptionModal.name ? this.subscriptionModal.name : '',
      "current_amount": this.subscriptionModal.currentAmount ? this.subscriptionModal.currentAmount : 0,
      "no_of_days": this.subscriptionModal.numberOfDays ? this.subscriptionModal.numberOfDays : 0,
      "is_active": this.subscriptionModal.status == 'true' ? true : false
    }
    if(this.subscriptionModal.modalHeader == 'Add')
      this.subscriptionModal.subscriptionUrl = 'admin/subscription/add_subscription/';
    else
      this.subscriptionModal.subscriptionUrl = 'admin/subscription/edit_subscription/';
    
    this.baseService.action(this.subscriptionModal.subscriptionUrl, data).subscribe(
      (res: any) =>{
        if(res.status == true){
          this.getSubscriptions();
          this.alert.success(res.message, 'Success');
          this.closebutton.nativeElement.click()
        }else{
          this.alert.error(res.error.message[0], 'Error');
        }
        this.loader.hide()
      }
    ),err =>{
      this.loader.hide();
      this.alert.error(err, 'Error')
    }

  }

  updateSubscription(subscription){
    this.subscriptionModal.modalHeader = 'Update';
    this.subscriptionModal.subscriptionId = subscription.id;
    this.subscriptionModal.name = subscription.name
    this.subscriptionModal.currentAmount = subscription.current_amount;
    this.subscriptionModal.numberOfDays = subscription.no_of_days;
    this.subscriptionModal.status = subscription.is_active
  }

}
