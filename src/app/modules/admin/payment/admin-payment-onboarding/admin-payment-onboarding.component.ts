import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { OnboardingFee } from '../modal/revenue.modal';
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
  maxDate: any;
  onboardingFee : OnboardingFee;

  displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city','board','onboardingFeesGross','onboardingFeesNet','couponCodeApplied','transactionID','viewInvoice'];   

  dataSource : any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.onboardingFee.filterParams = this.route.snapshot.queryParamMap.get("filterParams")
    if(this.onboardingFee.filterParams)
    {
      this.onboardingFee.filterFromDate = JSON.parse(this.onboardingFee.filterParams).from_date;
      this.onboardingFee.filterToDate = JSON.parse(this.onboardingFee.filterParams).to_date;
    }
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
      "start_date": this.onboardingFee.filterFromDate !== undefined ? this.datePipe.transform(this.onboardingFee.filterFromDate, 'yyyy-MM-dd'): '',
      "end_date": this.onboardingFee.filterToDate !== undefined ? this.datePipe.transform(this.onboardingFee.filterToDate, 'yyyy-MM-dd'): '',
      "city": cityFind ? cityFind.city: '',
      "state": stateFind ? stateFind.state: '',
      // "university": this.onboardingFee.university,
      "page_size": this.onboardingFee.pageSize,
      "page": page
  }
  this.baseService.getData('admin/payment/payment_details_list/', this.onboardingFee.listParams).subscribe(
    (res: any) => {
      if (res.status == true) {
        if (!page)
          page = this.onboardingFee.config.currentPage
        this.onboardingFee.startIndex = res.page_size * (page - 1) + 1;
        this.onboardingFee.config.itemsPerPage = res.page_size
        this.onboardingFee.pageSize = res.page_size;
        this.onboardingFee.config.currentPage = page
        this.onboardingFee.config.totalItems = res.count;
        if(res.count >0){
          this.onboardingFee.dataSource = res.results
          this.onboardingFee.pageCount = this.baseService.getCountsOfPage();
        }
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
    this.baseService.generateExcel('admin/payment/export_payment_details_list/', 'onboarding-fee-revenue', this.onboardingFee.listParams);
  }


  configureOnboardingFee(){
    this.router.navigate(['admin/configure-onboarding-fee']);

  }

  onboardingFeeAmountHistory(){
    this.router.navigate(['admin/payment-onboarding-fee-history']);
  }

  getAllStates(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if(res.count > 0)
        this.onboardingFee.allStates = res.results
      }
    ) 
  }
  getAllCities(){
    this.baseService.getData('user/getcitybystateid/' + this.onboardingFee.stateId).subscribe(
      (res: any) => {
        if(res.count > 0)
        this.onboardingFee.allCities = res.results
      }
    )
  }

  goBack(): void{
    this.location.back();
  }

  generatePDF(transactionId: any){
    let data = {
      "payment_id": transactionId
    }
    this.baseService.generatePdf('admin/download_payment_invoice/', 'onboarding_invoice_'+transactionId, data)
  }

}
