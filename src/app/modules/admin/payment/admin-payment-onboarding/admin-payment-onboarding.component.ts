import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { OnboardingFee } from '../modal/onboarding-fee.modal';
import { DatePipe, Location } from '@angular/common';


export interface PeriodicElement {
  position: number;
  schoolName: string;
  zatchUpID: string;
  state: string;
  city: string;
  board: string;
  onboardingFeesGross: number;
  onboardingFeesNet: number;
  couponCodeApplied: string;
  transactionID: string;
  viewInvoice: string;
}


// const ELEMENT_DATA: PeriodicElement[] = [
//   {'position': 1,'schoolName':'Adarsh Public School', zatchUpID : 'ZATCHUP 8535', 'state': 'Delhi',
//   'city': 'Delhi','board': 'Delhi University', 'onboardingFeesGross': 1000000,'onboardingFeesNet': 1000000,'couponCodeApplied':'COUPON 7545','transactionID':'TRANSACTION 1122','viewInvoice':''}
  
  
// ];

@Component({
  selector: 'app-admin-payment-onboarding',
  templateUrl: './admin-payment-onboarding.component.html',
  styleUrls: ['./admin-payment-onboarding.component.css'],
  providers: [DatePipe]
})
export class AdminPaymentOnboardingComponent implements OnInit {
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
  onboardingFee : OnboardingFee ;

  displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city','board','onboardingFeesGross','onboardingFeesNet','couponCodeApplied','transactionID','viewInvoice'];   

  dataSource : any;
  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location
    ) { 
      this.onboardingFee = new OnboardingFee();
      this.maxDate= new Date();
    }

  ngOnInit(): void {
    this.getOnboardingFee('');
    this.getAllStates();
  }
  getOnboardingFee(page?:any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if(this.onboardingFee.allStates &&  this.onboardingFee.stateId){
      cityFind = this.onboardingFee.allCities.find(val=>{
        return val.id == this.onboardingFee.cityId
      })
    }

    if(this.onboardingFee.allCities){
      stateFind = this.onboardingFee.allStates.find(val=>{
        return val.id == this.onboardingFee.stateId
      })
    }


    this.onboardingFee.listParams = {
      "date_from": this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd'): '',
      "date_to": this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd'): '',
      "city": cityFind ? cityFind.city: '',
      "state": stateFind ? stateFind.state: '',
      "university": this.onboardingFee.university,
      "page_size": this.onboardingFee.pageSize ? this.onboardingFee.pageSize : 5,
      "page": page ? page : 1
  }
  this.baseService.getData('admin/payment/payment_details_list/', this.onboardingFee.listParams).subscribe(
    (res: any) => {
      console.log('list params....', res)
      if (res.status == true) {
        if (!page)
          page = this.onboardingFee.config.currentPage
        this.onboardingFee.startIndex = res.page_size * (page - 1) + 1;
        this.onboardingFee.config.itemsPerPage = res.page_size
        this.onboardingFee.config.currentPage = page
        this.onboardingFee.config.totalItems = res.count;
        if(res.count >0)
        this.onboardingFee.dataSource = res.results
        else
        this.onboardingFee.dataSource = undefined
    }
    else
    this.alert.error(res.error.message[0], 'Error')
    this.loader.hide();
    }
    ),  (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  generateExcel() {
    delete this.onboardingFee.listParams.page_size;
    delete this.onboardingFee.listParams.page;
    this.onboardingFee.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/payment/export_payment_details_list/', 'on-boarding-fee', this.onboardingFee.listParams);
  }


  configureOnboardingFee(){
    this.router.navigate(['admin/payment-onboarding-fee-history']);

  }

  onboardingFeeAmountHistory(){
    this.router.navigate(['admin/payment-onboarding-fee-history']);
  }

  getAllStates(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if(res.count > 0)
        this.onboardingFee.allStates = res.results
        console.log('get state res ::', res)
      }
    ) 
  }
  getAllCities(){
    this.baseService.getData('user/getcitybystateid/' + this.onboardingFee.stateId).subscribe(
      (res: any) => {
        if(res.count > 0)
        this.onboardingFee.allCities = res.results
        console.log('get city res ::', res)
      }
    )
  }

  goBack(): void{
    this.location.back();
  }

}
