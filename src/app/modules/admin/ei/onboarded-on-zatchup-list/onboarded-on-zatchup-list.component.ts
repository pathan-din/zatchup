import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OnboardedZatchup } from '../modals/ei-pending-approval.modal';


export interface PeriodicElement {
  position: number;
  schoolName: string;
  zatchUpID: string;
  state: string;
  city: string;
  board: string;
  onboardingDate: string;
  studentZatchup: string;
  totalAlumnizatchup: string;
  commission: string;
  subscriptionStatus: string;
  status: string;
  eiPocName: string;
  action: string;
}

@Component({
  selector: 'app-onboarded-on-zatchup-list',
  templateUrl: './onboarded-on-zatchup-list.component.html',
  styleUrls: ['./onboarded-on-zatchup-list.component.css']
})
export class OnboardedOnZatchupListComponent implements OnInit {
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
  params: any ={};
  onboardedZatchup: OnboardedZatchup;

  displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city',  'board','onboardingDate','studentZatchup',
  'totalAlumnizatchup','commission','subscriptionStatus', 'status','eiPocName', 'action'];   

  dataSource: any;
  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe
    ) {
      this.onboardedZatchup = new OnboardedZatchup();
      this.maxDate= new Date();
     }

  ngOnInit(): void {
    this.getOnboardedZatchup();
    this.getAllState();
  }

  onboardedView(data){
    this.router.navigate(['admin/ei-onboarded-view', data.id])
  }

  getOnboardedZatchup(page?: any){
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if(this.onboardedZatchup.allStates && this.onboardedZatchup.stateId){
      cityFind= this.onboardedZatchup.allCities.find(val=>{
        return val.id == this.onboardedZatchup.cityId
      })
    }
    if(this.onboardedZatchup.allCities){
      stateFind= this.onboardedZatchup.allStates.find(val=>{
        return val.id == this.onboardedZatchup.stateId
      })
    }
    this.onboardedZatchup.listParams= {
      'date_from':this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd'): '',
      'date_to':this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd'): '',
      "city": cityFind ? cityFind.city: '',
      "state": stateFind ? stateFind.state: '',
      "university": this.onboardedZatchup.university,
      "page_size": this.onboardedZatchup.pageSize ? this.onboardedZatchup.pageSize : 5,
      "page": page ? page: 1
    }
    this.baseService.getData('admin/ei-onboarded_zatchup-list/', this.onboardedZatchup.listParams).subscribe(
      (res: any) =>{
        console.log('list params....', res)
        if (res.status == true) {
          if (!page)
          page = this.onboardedZatchup.config.currentPage
          this.onboardedZatchup.startIndex = res.page_size * (page - 1) + 1;
          this.onboardedZatchup.config.itemsPerPage = res.page_size
          this.onboardedZatchup.config.currentPage = page
          this.onboardedZatchup.config.totalItems = res.count;
          if(res.count > 0)
          this.onboardedZatchup.dataSource = res.results
          else
          this.onboardedZatchup.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
        }

        generateExcel() {
          delete this.onboardedZatchup.listParams.page_size;
          delete this.onboardedZatchup.listParams.page;
          this.onboardedZatchup.listParams['export_csv'] = true
          this.baseService.generateExcel('', 'onboarded-zatchup-list', this.onboardedZatchup.listParams);
        }
      
      
        getAllState() {
          this.baseService.getData('user/getallstate/').subscribe(
            (res: any) => {
              console.log('get state res ::', res)
              if (res.count > 0)
                this.onboardedZatchup.allStates = res.results
            }
          )
        }
      
        getCities() {
          this.baseService.getData('user/getcitybystateid/' + this.onboardedZatchup.stateId).subscribe(
            (res: any) => {
              if (res.count > 0)
                this.onboardedZatchup.allCities = res.results
              console.log('get state res ::', res)
            }
          )
        }
      }
    
  

