import { Location } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OnboardingModal } from '../modal/subscription.modal';

@Component({
  selector: 'app-onboarding-fee-configure',
  templateUrl: './onboarding-fee-configure.component.html',
  styleUrls: ['./onboarding-fee-configure.component.css']
})
export class OnboardingFeeConfigureComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  onboardingModal = new OnboardingModal()
  displayedColumns: string[] = ['currentAmount', 'action'];
  dataSource: any;

  constructor(
    private router: Router,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { 
    this.onboardingModal = new OnboardingModal();
  }

  ngOnInit(): void {
    this.getSubscriptions()
  }

  goToAdminEiManageCoursesDetailsPage() {
    this.router.navigate(['admin/ei-management-courseDetails']);
  }

  getSubscriptions() {
    this.loader.show()
    this.baseService.getData('admin/payment/onboarding_fee_list/').subscribe(
      (res: any) => {
        if (res.status == true) {
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

  addOnboardingFee() {
    this.loader.show()
    let data = {
      "amount": this.onboardingModal.currentAmount ? this.onboardingModal.currentAmount : 0,
    }
    
    this.baseService.action('admin/payment/configure_onboarding_fee/', data).subscribe(
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
    this.onboardingModal.modalHeader = 'Update';
    this.onboardingModal.subscriptionId = subscription.id;
    this.onboardingModal.name = subscription.name
    this.onboardingModal.currentAmount = subscription.current_amount;
    this.onboardingModal.numberOfDays = subscription.no_of_days;
    this.onboardingModal.status = subscription.is_active
  }

  goBack() {
    this.location.back()
  }

}
