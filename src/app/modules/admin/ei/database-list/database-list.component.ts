import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EIDbList } from '../modals/education-institute.modal';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css'],
  providers: [DatePipe]
})
export class DatabaseListComponent implements OnInit {
  filterFromDate : any;
  filterToDate : any;
  maxDate : any;
  params : any = {};
  eidbList: EIDbList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private datePipe : DatePipe,
    ) {
    this.eidbList = new EIDbList();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getEIDbList('');
     this.getAllState();
  }

  eiDbHistory() {
    this.router.navigate(['admin/ei-database-history'])
  }

  eiDbView(id) {
    this.router.navigate(['admin/ei-database-view', id])
  }

  getEIDbList(page? : any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if(this.eidbList.allStates && this.eidbList.stateId){
      stateFind = this.eidbList.allStates.find(val=>{
        return val.id == this.eidbList.stateId
      })
    }
    
    if(this.eidbList.allCities){
      cityFind = this.eidbList.allCities.find(val=>{
        return val.id == this.eidbList.cityId
      }) 
    }
    
    this.eidbList.modal ={
      'date_from': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd'): '',
      'date_to': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd'): '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university":this.eidbList.university,
      "is_onboarded":this.eidbList.onboardingStatus,
      'page': page,
      'page_size':  this.eidbList.page_size,
      // 'is_ei_in_zatchup': this.eidbList.onboardingStatus == 2 ? 'false' : undefined
    }
  
    this.baseService.getData('admin/ei/get-all-ei-list/', this.eidbList.modal).subscribe(
      (res: any) => {
        if (res.status == true) {
          // this.eidbList.dataSource = res.results
          if (!page)
            page = this.eidbList.config.currentPage
          this.eidbList.startIndex = res.page_size * (page - 1) + 1;
          this.eidbList.page_size = res.page_size
          this.eidbList.config.itemsPerPage = this.eidbList.page_size
          this.eidbList.config.currentPage = page
          this.eidbList.config.totalItems = res.count;
          if(res.count > 0)
          this.eidbList.dataSource = res.results
          else
          this.eidbList.dataSource = undefined    
        }
        else 
          this.alert.error(res.error.message[0], 'Error')
          this.loader.hide();
        
        
      }
    ), (err: any) => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }
  generateExcel(){
    delete this.eidbList.modal.page_size;
    delete this.eidbList.modal.page;
    this.eidbList.modal['export_csv']= true
    this.baseService.generateExcel('admin/ei/export-all-ei-list/', 'ei-database-list', this.eidbList.modal);
  }

  getAllState(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count >0)
        this.eidbList.allStates = res.results
      }
    )
  }
  getCities(){
    this.baseService.getData('user/getcitybystateid/' + this.eidbList.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
        this.eidbList.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }

  goBack(){
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }
}
